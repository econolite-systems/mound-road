// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { ExtPedState } from '@econolite/shared/data-access/api-signal-status';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PanToolIcon from '@mui/icons-material/PanTool';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import { Theme } from '@mui/material/styles';

export interface SignalStatusPedStateProps {
  data: ExtPedState
}

const flashStyle = (theme:Theme) => ({
  "@keyframes flash": {
    "to": { visibility: 'hidden' }
  },
  animation: `flash 1200ms steps(3, start) infinite`,
  color: 'red',
  height: '16px'
});

export function SignalStatusPedState(props: SignalStatusPedStateProps) {
  const get = (data: ExtPedState) => {
    switch (data) {
      case 'Walk':
        return <DirectionsWalkIcon sx={{color: 'black', height: '16px'}} />
      case 'DW':
        return <PanToolIcon sx={{color: 'red', height: '16px'}} />;
      case 'FDW':
        return <PanToolIcon sx={flashStyle} />;
      default:
        return <SquareOutlinedIcon sx={{color: '#C0C3CC', height: '16px'}}/>
    }
  }
  return (
    get(props.data)
  )
}

export default SignalStatusPedState
