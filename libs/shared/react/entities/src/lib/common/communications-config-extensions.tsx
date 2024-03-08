// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { CommunicationsModelAdd, CommunicationsModelUpdate } from '@econolite/shared/data-access/api-configuration';
import { EntityState } from '@econolite/entities-state';

export function ToCommunicationsModelAdd(entity: EntityState): CommunicationsModelAdd {
  return {
    ipAddress: entity.ipAddress,
    port: entity.port,
    sshPort: entity.sshPort,
    sshHostKey: entity.sshHostKey,
    commMode: entity.commMode,
    filteredCommBad: entity.filteredCommBad,
    filteredCommMarginal: entity.filteredCommMarginal,
    filteredCommWeightingFactor: entity.filteredCommWeightingFactor
  }
}

export function ToCommunicationsModelUpdate(entity: EntityState): CommunicationsModelUpdate {
  return {
    ipAddress: entity.ipAddress,
    port: entity.port,
    sshPort: entity.sshPort,
    sshHostKey: entity.sshHostKey,
    commMode: entity.commMode,
    filteredCommBad: entity.filteredCommBad,
    filteredCommMarginal: entity.filteredCommMarginal,
    filteredCommWeightingFactor: entity.filteredCommWeightingFactor
  }
}

export function CommModeToNumber(mode?: string): number {
  let result = 0;
  switch (mode) {
    case "Online":
      result = 0;
      break;
    case "Offline":
      result = 1;
      break;
    case "Standby":
      result = 2;
      break;
  }
  return result;
}

export function CommModeToString(mode?: number): string {
  let result = "Online";
  switch (mode) {
    case 0:
      result = "Online";
      break;
    case 1:
      result = "Offline";
      break;
    case 2:
      result = "Standby";
      break;
  }
  return result;
}
