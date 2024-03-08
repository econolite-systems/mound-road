// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';

/* eslint-disable-next-line */
export interface SlowdownPopupProps {
  data: any;
}

export function SlowdownPopup({
  data,
}: SlowdownPopupProps) {

  return (
    <Box sx={{ height: 150, width: 150 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
        <Box>{data.location}</Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
        <Box>Status: {data.trafficStatus}</Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
        <Box>Speed: {data.segmentSpeed.toFixed(2)} mph</Box>
      </Box>
    </Box>
  );
}

export default SlowdownPopup;
