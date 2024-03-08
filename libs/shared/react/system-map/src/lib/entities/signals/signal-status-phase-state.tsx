// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { ExtPhaseState } from '@econolite/shared/data-access/api-signal-status';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Theme } from '@mui/material/styles';

export interface SignalStatusPhaseStateProps {
  data: ExtPhaseState,
  isInFlash: boolean
}

const flashStyle = (color: string) => (theme:Theme) => ({
  "@keyframes flash": {
    "to": { visibility: 'hidden' }
  },
  animation: `flash 1200ms steps(3, start) infinite`,
  color: color,
  height: '16px'
});

const gridItem = { item: true, xs: 1, sx: { textAlign: 'center' } };

export function SignalStatusPhaseState(props: SignalStatusPhaseStateProps) {
  const { data, isInFlash } = props
  const get = (data: ExtPhaseState, isInFlash: boolean) => {
    if (isInFlash) {
      return <CircleIcon sx={flashStyle('red')} />
    }
    switch (data) {
      case 'Green':
        return <CircleIcon sx={{ color: '#008000', height: '16px'}} />
      case 'Yellow':
        return <CircleIcon sx={{ color: '#FFBF00', height: '16px'}} />
      case 'Red':
        return <CircleIcon sx={{ color: 'red', height: '16px'}} />
      case 'Orange':
        return <CircleIcon sx={{ color: 'orange', height: '16px'}} />
      case 'CommFail':
        return <CircleIcon sx={{ color: 'black', height: '16px'}} />
      default:
        return <CircleOutlinedIcon sx={{ color: '#C0C3CC', height: '16px'}} />
    }
  }
  return (
    get(data, isInFlash)
  )
}

export default SignalStatusPhaseState
