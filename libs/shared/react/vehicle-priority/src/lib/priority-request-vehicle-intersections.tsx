// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  disableColumn,
  editDeleteActionColumn,
  nameColumn,
} from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleIntersectionsProps {
  data: Array<any>;
  onToggleDisable: (id: string, value: boolean) => void; 
  onEdit: (id: string) => void;
}

export function PriorityRequestVehicleIntersections({
  data,
  onToggleDisable,
  onEdit
  }: PriorityRequestVehicleIntersectionsProps
) {
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  // define columns
  const columns: GridColDef[] = useMemo(
    () => [
      nameColumn(),
      disableColumn({
        headerName: 'Disabled',
        field: 'disable',
        onClick: (id, value) => onToggleDisable(id as string, !value)
      }),
      editDeleteActionColumn({ onEdit: (id) => onEdit(id as string) }, isContributor, isAdministrator),
    ],
    [onEdit, onToggleDisable]
  );

  return (
    <DataGrid sx={{height: '100%'}} rows={data} columns={columns} />
  );
}

export default PriorityRequestVehicleIntersections;
