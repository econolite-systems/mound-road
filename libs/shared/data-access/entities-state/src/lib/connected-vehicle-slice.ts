// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
export interface ConnectedVehicleState {
    onlineStorageType?: string | null;
    archiveStorageType?: string | null;
    onlineDays?: number;
    onlineSize?: number;
    archivedDays?: number;
    archivedSize?: number;
    startTime?: string;
    endTime?: string;
    id?: string;
  };
