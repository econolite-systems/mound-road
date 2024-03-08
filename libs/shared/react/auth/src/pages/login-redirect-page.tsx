// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuthContext } from '../providers/use-auth';

export function LoginRedirectPage() {
  const auth = useAuthContext();
  
  const path = '/';
  if(auth && auth.userData ){
    auth.userManager.signinRedirectCallback().then(
      (user) => {
        window.history.replaceState({}, window.document.title, window.location.origin);
        window.location = user.state || path;
      },
      error => {
        if (error.message === 'No matching state found in storage') {
          window.location.href = path;
        } else {
          console.error(error);
        }
      }
    );
  }

  return (
    <div></div>
  );
}

export default LoginRedirectPage;
