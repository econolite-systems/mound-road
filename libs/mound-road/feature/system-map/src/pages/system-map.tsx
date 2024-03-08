// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Map } from '@econolite/system-map';
import { createSignalRContext } from 'react-signalr';
import { useAuth } from '@econolite/shared-react-auth';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface SystemMapProps {
}

const SignalRContext = createSignalRContext({
  shareConnectionBetweenTab: true,
});

const Comp = () => {
  const [messages, setMessage] = useState<any>([]);
  
  SignalRContext.useSignalREffect(
    "vehicleUpdate",
    (message) => {
      setMessage([...messages, message]);
    },
    [messages],
  );

  return null;
};

export function SystemMap(props: SystemMapProps) {
  const { token } = useAuth();
  return (
    <Paper sx={{p: (theme: Theme) => theme.spacing(1), height: `calc(100vh - 64px)`}}>
        <Map />
    </Paper>
  );
}

export default SystemMap;
function createUseSignalREffect() {
  throw new Error('Function not implemented.');
}

function useSignalREffect(arg0: string, arg1: (message: any) => void, arg2: never[][]) {
  throw new Error('Function not implemented.');
}

