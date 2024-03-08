// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Switch from '@mui/material/Switch';

export interface IToggleColumn {
  headerName?: string;
  field: string;
  readonly?: boolean;
  onClick?: (id: GridRowId, value: boolean) => void;
}


export function getToggleColumn({ readonly, onClick }: IToggleColumn) {
  return (params: GridRenderCellParams) => (
    <Switch
      checked={params.value}
      onClick={() => onClick ? onClick(params.id, params.value) : {}}
      disabled={readonly}
    />
  )
  ;
}
