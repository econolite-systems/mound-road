// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PanToolIcon from '@mui/icons-material/PanTool';

export interface SignalPopupProps {
  id: string;
}

export function SignalPopup({ id }: SignalPopupProps) {
  
  // TODO: Fetch data from API when it can compile
  const status = {
    phaseGreen: 0x1,
    phaseYellow: 0x6,
    phaseRed: 0xFFF8,
    phaseFlash: 0xC,
    walk: 0xFFF8,
    pedClearance: 0x4, // flashing dontWalk
    dontWalk: 0x7,
    overlapGreen: 0x1,
    overlapYellow: 0x6,
    overlapRed: 0xFFF8,
    overlapFlash: 0xC,
  };

  // shared properties for most grid items
  const gridItem = { item: true, xs: 1, sx: { textAlign: 'center' } };

  const renderLights = (
    green: number,
    yellow: number,
    red: number,
    flash: number
  ): any[] => {
    const lights = new Array(16);
    for (let i = 0; i < 16; i++) {
      let className;
      if (getBitValue(green, i)) {
        className = 'green';
      } else if (getBitValue(yellow, i)) {
        className = 'yellow';
      } else if (getBitValue(red, i)) {
        className = 'red';
      } else {
        lights[i] = <Grid {...gridItem}><div/></Grid>;
        continue;
      }
      if (getBitValue(flash, i)) {
        className += ' flash';
      }
      lights[i] = (
        <Grid {...gridItem}>
          <CircleIcon className={className} />
        </Grid>          
      );
    }
    return lights;
  }

  const renderPeds = (
    walk: number,
    dontWalk: number,
    pedClearance: number
  ): any[] => {
    const peds = new Array(16);
    for (let i = 0; i < 16; i++) {
      let className = '', icon;
      if (getBitValue(pedClearance, i)) {
        className = ' flash';
      }
      if (getBitValue(walk, i)) {
        icon = <DirectionsWalkIcon className={'black' + className} />;
      } else if (getBitValue(dontWalk, i)) {
        icon = <PanToolIcon className={'red' + className} />;
      } else {
        icon = null;
      }
      peds[i] = <Grid {...gridItem}>{icon}</Grid>;
    }
    return peds;
  }

  const renderNumbers = () => Array.from({ length: 16 }, (_, i) => (
    <Grid {...gridItem}>
      <Typography variant="caption">{i + 1}
      </Typography>
    </Grid>
  ));

  const renderLetters = () => Array.from({ length: 16 }, (_, i) => (
    <Grid {...gridItem}>{String.fromCharCode(BASE_CHAR_CODE + i)}</Grid>
  ));

  return (
    <Box sx={{ width: 800 }}>
      <Paper sx={{ marginBottom: '1em' }} elevation={1}>
        <Grid container spacing={0} columns={18} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="overline" sx={{ paddingLeft: '1em' }}>Phase</Typography>
          </Grid>
          {renderNumbers()}
          <Grid item xs={2}>
            <Typography variant="overline" sx={{ paddingLeft: '1em' }}>On</Typography>
          </Grid>
          {renderLights(status.phaseGreen, status.phaseYellow, status.phaseRed, status.phaseFlash)}
          <Grid item xs={2}>
            <Typography variant="overline" sx={{ paddingLeft: '1em' }}>Ped</Typography>
          </Grid>
          {renderPeds(status.walk, status.dontWalk, status.pedClearance)}
        </Grid>
      </Paper>
      <Paper elevation={2}>
        <Grid container spacing={0} columns={18} alignItems="center">
          <Grid item xs={2}>
            <Typography variant="overline" sx={{ paddingLeft: '1em' }}>Overlap</Typography>
          </Grid>
          {renderLetters()}
          <Grid item xs={2}>
            <Typography variant="overline" sx={{ paddingLeft: '1em' }}>On</Typography>
          </Grid>
          {renderLights(status.overlapGreen, status.overlapYellow, status.overlapRed, status.overlapFlash)}
        </Grid>
      </Paper>
    </Box>
  );
}

const BASE_CHAR_CODE = 'A'.charCodeAt(0);

function getBitValue(data: any, pos: number) {
  const mask = 0x1 << pos;
  return data & mask;
}

export default SignalPopup;
