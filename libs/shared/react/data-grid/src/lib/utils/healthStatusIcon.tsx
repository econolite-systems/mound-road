// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';

export function getHealthStatusValue(width: string | number, height: string | number) {
  return (params: GridRenderCellParams) => (
    GetHealthStatusIcon(params.value)
  );
}

function GetHealthStatusIcon(status: string) {
  if(status.toLowerCase() === 'healthy') {
    return <CheckCircleIcon color='success' />
  }
  if(status === 'unhealthy') {
    return <CancelIcon color='error' />
  }
  else {
    return <ErrorIcon color='error' />;
  }
}
