// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityState } from '@econolite/entities-state';
import { CredentialsModelAdd, CredentialsModelUpdate } from '@econolite/shared/data-access/api-configuration';

export function ToCredentialsAdd(entity: EntityState): CredentialsModelAdd {
  return {
    username: entity.username,
    password: entity.password,
    snmpCommunityName: entity.snmpCommunityName
  }
}

export function ToCredentialsUpdate(entity: EntityState): CredentialsModelUpdate {
  return {
    username: entity.username,
    password: entity.password,
    snmpCommunityName: entity.snmpCommunityName
  }
}
