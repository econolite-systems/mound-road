// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityState } from '@econolite/entities-state';
import { Entity } from '@econolite/shared/data-access/api-configuration';

export function ToEntityAdd(entity: EntityState): Entity {
  return {
    type: entity.type,
    description: entity.description,
    name: entity.name,
    id: entity.id
  }
}

export function ToEntityUpdate(entity: EntityState): Entity {
  return {
    type: entity.type,
    description: entity.description,
    name: entity.name,
    id: entity.id
  }
}
