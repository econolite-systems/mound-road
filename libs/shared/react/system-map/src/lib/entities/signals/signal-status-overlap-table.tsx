// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { OverlapStatusModel } from '@econolite/shared/data-access/api-signal-status';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SignalStatusPhaseState from './signal-status-phase-state';

export interface SignalStatusOverlapTableProps {
  data: OverlapStatusModel[]
}

export function SignalStatusOverlapTable(props: SignalStatusOverlapTableProps) {
  const rowHeader = (hide: boolean = false) => (
    <Grid item xs={2} sx={{ textAlign: 'center', display: {sm: `${hide ? 'none':'inherit'}`} }}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start'}}>
          <Typography variant="overline">Overlap</Typography>
          <Typography variant="overline"sx={{ height: '16px', padding: 0, alignContent: 'center', lineHeight: '16px'}}>On</Typography>
        </Box>
      </Grid>
  );
  const getOverlap = (overlap: OverlapStatusModel, i: Number) => {
    let item = (
      <Grid item xs={1} sx={{ textAlign: 'center' }}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography variant="overline">{overlap.overlap}</Typography>
          <Box sx={{justifyContent: 'center'}}>
          <SignalStatusPhaseState data={overlap.extendedPhaseState!} isInFlash={overlap.isOverlapFlash ?? false} />
          </Box>
        </Box>
      </Grid>
    )
    const result = (i === 8) ? (<>{rowHeader(true)} {item}</>) : item;
    return result;
  }
  return (
    <Paper sx={{p: 2}} elevation={3}>
      { props.data && props.data.length > 0 &&
      <Grid container spacing={0} columns={{xs: 10, sm: 18}} alignItems="center">
        {rowHeader()}
        {props.data.map((overlap, i) => (
          getOverlap(overlap, i)
        ))}
      </Grid>
      }
      { ((!props.data) || (props.data && props.data.length === 0)) &&
      <Typography variant="subtitle2">No overlaps available.</Typography>
      }
    </Paper>
  )
}

export default SignalStatusOverlapTable
