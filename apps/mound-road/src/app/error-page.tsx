// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Shell } from "@econolite/mound-road/ui/common";
import { AuthProviderProps } from "@econolite/shared-react-auth";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export interface ErrorProps {
  authSettings: AuthProviderProps;
  isAdministrator: boolean;
}

export default function ErrorPage({ authSettings, isAdministrator } : ErrorProps) {
  const error = useRouteError();
  console.error(error);

  return (
    <Shell authSettings={authSettings} isAdministrator={isAdministrator}>
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error instanceof Error ? error.message : isRouteErrorResponse(error) ? error.statusText : (typeof error).toString()}</i>
            </p>
        </div>
    </Shell>
  );
}
