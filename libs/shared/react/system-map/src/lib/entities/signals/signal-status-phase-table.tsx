// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { PhaseStatusModel } from '@econolite/shared/data-access/api-signal-status';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SignalStatusPhaseState from './signal-status-phase-state';

export interface SignalStatusPhaseTableProps {
  data: PhaseStatusModel[]
}

export function SignalStatusPhaseTable(props: SignalStatusPhaseTableProps) {
  const rowHeader = (hide: boolean = false) => (
    <Grid item xs={4} sx={{ textAlign: 'center', display: { sm: `${hide ? 'none' : 'inherit'}` } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
        <Typography noWrap={true} variant="overline">Signal Group</Typography>
        <Typography variant="overline" sx={{ height: '16px', padding: 0, alignContent: 'center', lineHeight: '16px' }}>On</Typography>
      </Box>
    </Grid>
  );
  const getPhase = (phase: PhaseStatusModel, i: Number) => {
    let item = (
      <Grid item xs={1} sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Typography variant="overline">{phase.phase}</Typography>
          <Box sx={{ justifyContent: 'center' }}>
            <SignalStatusPhaseState data={phase.extendedPhaseState!} isInFlash={phase.isPhaseFlash ?? false} />
          </Box>
        </Box>
      </Grid>
    )
    const result = (i === 8) ? (<>{rowHeader(true)} {item}</>) : item;
    return result;
  }
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      {props.data && props.data.length > 0 &&
        <Grid container spacing={1} columns={{ xs: 10, sm: 20 }} alignItems="top">
          {rowHeader()}
          {props.data.map((phase: PhaseStatusModel, i: number) => (
            getPhase(phase, i)
          ))}
        </Grid>
      }
      {((!props.data) || (props.data && props.data.length === 0)) &&
        <Typography variant="subtitle2">No signal groups available.</Typography>
      }
    </Paper>
  )
}

export default SignalStatusPhaseTable
