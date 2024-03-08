// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';

/* eslint-disable-next-line */
export interface EnvironmentalSensorMapPopupProps {
  data: Array<any> | null;
}

export function EnvironmentalSensorMapPopup({
  data,
}: EnvironmentalSensorMapPopupProps) {

  return (
    <Box sx={{ height: 80, width: 120 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {(!data || data.length === 0) &&
        <div>No data found</div>
      }
      {(data && data.length > 0) &&
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Box>{data[3].name + ': ' + data[3].value}&deg;</Box>
            <Box>{data[1].name + ': ' + data[1].value}</Box>
            <Box>{data[0].name + ': ' + data[0].value}</Box>
            <Box>{data[2].name + ': ' + data[2].value}</Box>
        </Box>
      }
      </Box>
    </Box>
  );
}

export default EnvironmentalSensorMapPopup;


