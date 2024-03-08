// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { SignalStatusModel, useGetSignalStatusGetQuery } from '@econolite/shared/data-access/api-signal-status';
import SignalStatusPhaseTable from './signal-status-phase-table';
//import SignalStatusOverlapTable from './signal-status-overlap-table';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export interface SignalStatusPopupProps {
  id: string
}

export function SignalStatusPopup({ id }: SignalStatusPopupProps) {
  const [polling, setpolling] = useState(true)
  const { data, status, error, isError, isLoading, isUninitialized } = useGetSignalStatusGetQuery({id},{
    pollingInterval: 1000
  });

  return (
    <>
    { data && (
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        <SignalStatusPhaseTable data={data.phaseStatus!} />
        {/* <SignalStatusOverlapTable data={status.overlapStatus!} /> */}
      </Box>
    )}
    { (!data || isError) && (
      <Typography variant="subtitle2">No status available.</Typography>
    )}
    </>
  )
}

export default SignalStatusPopup
