// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import React, { FC, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { UserManager, User } from 'oidc-client';
import {
  Location,
  AuthProviderProps,
  AuthContextProps,
} from './auth-context-interface';
import { updateIsAuthenticated, updateToken, updateUser } from '@econolite/auth-state';

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

/**
 * @private
 * @hidden
 * @param location
 */
export const hasCodeInUrl = (location: Location): boolean => {
  const searchParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.replace('#', '?'));

  return Boolean(
    searchParams.get('code') ||
      searchParams.get('id_token') ||
      searchParams.get('session_state') ||
      hashParams.get('code') ||
      hashParams.get('id_token') ||
      hashParams.get('session_state'),
  );
};

/**
 * @private
 * @hidden
 * @param props
 */
export const initUserManager = (props: AuthProviderProps): UserManager => {
  if (props.userManager) return props.userManager;
  const {
    authority,
    clientId,
    clientSecret,
    redirectUri,
    silentRedirectUri,
    postLogoutRedirectUri,
    responseType,
    scope,
    automaticSilentRenew,
    loadUserInfo,
    popupWindowFeatures,
    popupRedirectUri,
    popupWindowTarget,
  } = props;
  const result = new UserManager({
    authority,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    silent_redirect_uri: silentRedirectUri || redirectUri,
    post_logout_redirect_uri: postLogoutRedirectUri || redirectUri,
    response_type: responseType || 'code',
    scope: scope || 'openid',
    loadUserInfo: loadUserInfo !== undefined ? loadUserInfo : true,
    popupWindowFeatures: popupWindowFeatures,
    popup_redirect_uri: popupRedirectUri,
    popupWindowTarget: popupWindowTarget,
    automaticSilentRenew,
  });

  result.startSilentRenew();

  result.events.addAccessTokenExpired(async _ => {
    await result.signinRedirect();
  });

  return result;
};

/**
 *
 * @param props AuthProviderProps
 */
export const AuthProvider: FC<AuthProviderProps> = ({
  children,
  autoSignIn = true,
  onBeforeSignIn,
  onSignIn,
  onSignOut,
  location = window.location,
  ...props
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [userManager] = useState<UserManager>(() => initUserManager(props)); 

  const signOutHooks = async (): Promise<void> => {
    setUserData(null);
    onSignOut && onSignOut();
  };
  const signInPopupHooks = async (): Promise<void> => {
    const userFromPopup = await userManager.signinPopup();
    setUserData(userFromPopup);
    onSignIn && onSignIn(userManager, userFromPopup);
    await userManager.signinPopupCallback();
  };

  const getUser = async (location: Location, userManager: UserManager, autoSignIn: boolean, onBeforeSignIn: (() => void) | undefined, onSignIn: ((userManager: UserManager, userData: User | null) => void | Promise<void>) | undefined, userData: User | null): Promise<void> => {
    /**
     * Check if the user is returning back from OIDC.
     */
    if (hasCodeInUrl(location)) {
      const user = await userManager.signinCallback();
      setUserData(user);
      setIsLoading(false);
      onSignIn && onSignIn(userManager, user);
      return;
    }

    const user = await userManager.getUser();
    if ((!user || user.expired) && autoSignIn) {
      onBeforeSignIn && onBeforeSignIn();
      userManager.signinRedirect();
    } else if (!userData) {
      setUserData(user);
      setIsLoading(false);
    }
    return;
  };
  useEffect(() => {
    getUser(location, userManager, autoSignIn, onBeforeSignIn, onSignIn, userData);
  }, [location, userManager, autoSignIn, onBeforeSignIn, onSignIn, userData]);

  useEffect(() => {
    // for refreshing react state when new state is available in e.g. session storage
    const updateUserData = async () => {
      const user = await userManager.getUser();
      setUserData(user);
    };

    userManager.events.addUserLoaded(updateUserData);

    return () => userManager.events.removeUserLoaded(updateUserData);
  }, [userManager]);

  useEffect(() => {
    if(userData) {
      dispatch(updateIsAuthenticated(true));
      dispatch(updateToken(userData.access_token));
      dispatch(updateUser({ sub: userData.profile['sub'], name: userData.profile['name'], roles: userData.profile['role'] }));
    }
  }, [userData, dispatch])

  return (
    <AuthContext.Provider
      value={{
        signIn: async (args: unknown): Promise<void> => {
          await userManager.signinRedirect(args);
        },
        signInPopup: async (): Promise<void> => {
          await signInPopupHooks();
        },
        signOut: async (): Promise<void> => {
          await userManager.removeUser();
          await signOutHooks();
        },
        signOutRedirect: async (args?: unknown): Promise<void> => {
          await userManager.signoutRedirect(args);
          await signOutHooks();
        },
        userManager,
        userData,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
