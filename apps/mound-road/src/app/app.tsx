// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { AuthProvider } from '@econolite/shared-react-auth';
import { useAppConfig } from '@econolite/mound-road/data-access/global-state';
import { useEffect } from 'react';

import Routes from './routes';

export function App() {
  const { isLoading, error, config, loadConfig } = useAppConfig();
  //const isAdministrator = IsAdministrator();
  //const isContributor = IsContributor();
  //const router = getRouter(isAdministrator, isContributor, config.authSettings);

  useEffect(() => {
    loadConfig('./config/config.json');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array keeps this from constantly re-running

  if (isLoading) {
    return <div>Loading Config...</div>;
  }

  if (error) {
    console.warn(error);
    return <div>Error Loading Config!</div>;
  }

  return (
    <AuthProvider {...config.authSettings}>
      <Routes />
    </AuthProvider>
  );
}

export default App;
