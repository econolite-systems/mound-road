// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { relative } from 'path';
import { useContext } from 'react';
import { matchPath, useLocation, useResolvedPath, UNSAFE_DataRouterStateContext as DataRouterStateContext, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export function useRouteMatch(patterns: readonly string[], noMatchDefault: string) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath({path: pattern, end: false}, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return {pattern: {path: noMatchDefault}};
}

export default useRouteMatch;

export function useActivePath(to: string, caseSensitive = false, end = false) {
  const path = useResolvedPath(to);
  const location = useLocation();
  const routerState = useContext(DataRouterStateContext);
  const { navigator } = useContext(NavigationContext);

  let toPathname = navigator.encodeLocation
    ? navigator.encodeLocation(path).pathname
    : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname =
    routerState && routerState.navigation && routerState.navigation.location
      ? routerState.navigation.location.pathname
      : null;

  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname
      ? nextLocationPathname.toLowerCase()
      : null;
    toPathname = toPathname.toLowerCase();
  }

  const isActive =
    locationPathname === toPathname ||
    (!end &&
      locationPathname.startsWith(toPathname) &&
      locationPathname.charAt(toPathname.length) === "/");

  const isPending =
    nextLocationPathname != null &&
    (nextLocationPathname === toPathname ||
      (!end &&
        nextLocationPathname.startsWith(toPathname) &&
        nextLocationPathname.charAt(toPathname.length) === "/"));
  
  return {isActive, isPending};
}
