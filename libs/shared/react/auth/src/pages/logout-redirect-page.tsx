// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuthContext } from '../providers/use-auth';

export function LogoutRedirectPage() {
  const auth = useAuthContext();
  
  const path = '/';
  if(auth && auth.userData ){
    auth.userManager.signoutRedirectCallback().then(
      () => {
        auth.userManager.clearStaleState();
        window.location.href = path;
      },
      error => {
        console.error(error);
      }
    );
  }
  return (
    <div></div>
  );
}

export default LogoutRedirectPage;
