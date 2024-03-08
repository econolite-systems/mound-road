// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './providers/use-auth';

export function PrivateOutlet() {
  const auth = useAuthContext();
  return auth.userData ? <Outlet /> : <span>Loading...</span>
}

export default PrivateOutlet
