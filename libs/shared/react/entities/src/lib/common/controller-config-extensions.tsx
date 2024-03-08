// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityState } from '@econolite/entities-state';
import { ControllerDto } from '@econolite/shared/data-access/api-configuration';
import { ToCommunicationsModelUpdate } from './communications-config-extensions';
import { ToCredentialsUpdate } from './ftp-credentials-config-extensions';

//Note:  api doesn't differentiate between an add vs an update for a controller
export function ToController(entity: EntityState): ControllerDto {
  return {
    id: entity.id,
    name: entity.name,
    type: entity.type.name ?? 'unknown',
    subType: entity.controllerType ? entity.controllerType : '',
    discoverDynamicObjects: false,
    communications: ToCommunicationsModelUpdate(entity),
    ftpCredentials: ToCredentialsUpdate(entity)
  }
}
