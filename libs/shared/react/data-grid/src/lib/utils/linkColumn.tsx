// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  GridRowId,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { SettingsInputSvideo } from '@mui/icons-material';

export interface ILinkColumn {
  headerName?: string;
  field: string;
  onClick: (id: GridRowId) => void;
}

export function getLinkColumn({ headerName, field, onClick }: ILinkColumn) {
  const click = (id: string | number) => () => onClick(id);
  const label = field ?? 'name';

  return (params: GridRenderCellParams) => {
    return (
      <Box>
        <div onClick={click(params.id)}>
          {params.row[label]}
          <SettingsInputSvideo />
        </div>
      </Box>
    );
  }

}
