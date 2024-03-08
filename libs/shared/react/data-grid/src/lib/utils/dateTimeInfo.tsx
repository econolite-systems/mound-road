// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import { GridRenderCellParams } from '@mui/x-data-grid';

export function getDateTimeInfoValue() {
  return (params: GridRenderCellParams) => (
    GetDateTimeInfo(params.value)
  );
}

function GetDateTimeInfo(date: string) {
  const result = new Date(date);
  return <Box>{result.toLocaleDateString()} {result.toLocaleTimeString()}</Box>;
}
