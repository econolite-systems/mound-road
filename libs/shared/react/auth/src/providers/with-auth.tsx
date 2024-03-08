// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { AuthContextProps } from './auth-context-interface';
import { useAuthContext } from './use-auth';
import React from 'react';

/**
 * A public higher-order component to access the imperative API
 */
export function withAuth<P extends AuthContextProps>(
  Component: React.ComponentType<P>,
): React.ComponentType<Omit<P, keyof AuthContextProps>> {
  const displayName = `withAuth(${Component.displayName || Component.name})`;
  const C: React.FC<Omit<P, keyof AuthContextProps>> = (props) => {
    const auth = useAuthContext();

    return <Component {...(props as P)} {...auth} />;
  };

  C.displayName = displayName;

  return C;
}
