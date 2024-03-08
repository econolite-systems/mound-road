// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import SensorsIcon from '@mui/icons-material/Sensors';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SignalIcon from '@mui/icons-material/Brightness1';
import CarCrashIcon from '@mui/icons-material/CarCrash';

export function MapLegendPopup() {

  return (
    <Box className='legend' sx={{ height: 100, width: 200 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                <SensorsIcon/>
                <Box>{'Environmental Sensor Station'}</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                <WarningAmberIcon/>
                <Box>{'Active Pavement Condition'}</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                <SignalIcon/>
                <Box>{'Vehicle Priority'}</Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                <CarCrashIcon/>
                <Box>{'Wrong Way Driver'}</Box>
            </Box>
        </Box>
    </Box>
  );
}

export default MapLegendPopup;
