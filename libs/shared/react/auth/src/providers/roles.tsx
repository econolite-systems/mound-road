// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useAuth } from './use-auth-data';

export const ROLES = {
    ReadOnly: "ReadOnly",
    Contributor: "Contributor",
    Administrator: "Administrator",
    AlwaysHide: "StayHiddenMyFriends"
};
  
export function HasRole(role: string) : boolean {
    const {roles} = useAuth();
    return roles && !!roles.find((r: string) => r === role);
}

export function IsReadOnly() : boolean {
    const {roles} = useAuth();
    return roles && !!roles.find((r: string) => r === ROLES.ReadOnly);
}

export function IsContributor() : boolean {
    const {roles} = useAuth();
    return roles && !!roles.find((r: string) => r === ROLES.Contributor);
}

export function IsAdministrator() : boolean {
    const {roles} = useAuth();
    return roles && !!roles.find((r: string) => r === ROLES.Administrator);
}
