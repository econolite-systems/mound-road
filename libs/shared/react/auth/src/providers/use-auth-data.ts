// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

export function useAuth() {
  const token = useSelector((state: any) => state.auth.token);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const fullName = useSelector((state: any) => state.auth.name);
  const userId = useSelector((state: any) => state.auth.sub);
  const roles = useSelector((state: any) => state.auth.roles);

  return { token, isAuthenticated, fullName, userId, roles };
}

export default useAuth;
