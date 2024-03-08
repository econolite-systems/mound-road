// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuth } from '@econolite/shared-react-auth';
import { createSignalRContext } from 'react-signalr';

/* eslint-disable-next-line */
export interface SignalRProviderProps {
  url: string;
  children?: JSX.Element;
}

const SignalRContext = createSignalRContext({
  shareConnectionBetweenTab: true,
});

export function SignalRProvider(props: SignalRProviderProps ) {
  const {token} = useAuth();
  return (
    <SignalRContext.Provider
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]} 
      url={props.url}>
      {props.children}
    </SignalRContext.Provider>
  );
}

export const useSignalR = SignalRContext.useSignalREffect;

export default SignalRProvider;
