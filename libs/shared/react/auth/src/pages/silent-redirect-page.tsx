// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuthContext } from '../providers/use-auth';

export function SilentRedirectPage() {
  const auth = useAuthContext();

  if(auth && auth.userData ){
    auth.userManager.signinSilentCallback().then(
      () => {
        console.log("silent callback");
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

export default SilentRedirectPage;
