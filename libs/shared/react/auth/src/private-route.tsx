// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuthContext } from './providers/use-auth';

export interface PrivateRouteProps {
  children: JSX.Element
}
export function PrivateRoute({ children }: PrivateRouteProps ) {
  const auth = useAuthContext();
  if (!auth || !auth.userData) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      {children}
    </div>

  );
}

export default PrivateRoute;
