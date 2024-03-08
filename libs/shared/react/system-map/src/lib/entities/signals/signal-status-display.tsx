// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { SignalStatusModel } from '@econolite/shared/data-access/api-signal-status';
import SignalStatusPhaseTable from './signal-status-phase-table';
import SignalStatusOverlapTable from './signal-status-overlap-table';
import { useGetSignalStatusGetQuery } from '@econolite/shared/data-access/api-signal-status';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface SignalStatusDisplayProps {
  id: string
}

export function SignalStatusDisplay({ id }: SignalStatusDisplayProps) {
  const { data, error, isLoading } = useGetSignalStatusGetQuery({id});
  return (
    <>
    { data && (
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        
      </Box>
    )}
    { (!status) && (
      <Typography variant="subtitle2">No status available.</Typography>
    )}
    </>
  )
}

export default SignalStatusDisplay;
