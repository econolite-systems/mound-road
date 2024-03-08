// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import CarCrashIcon from '@mui/icons-material/CarCrash';

/* eslint-disable-next-line */
export interface WrongWayDriverPopupProps {
  data: any;
}

export function WrongWayDriverPopup({
  data,
}: WrongWayDriverPopupProps) {

  const colorClass = "red";

  return (
    <Box sx={{ height: 150, width: 150 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box >
          <CarCrashIcon className={colorClass} />
        </Box>
      </Box>
      <Box className='pt-8'>
        {data.location}
      </Box>
    </Box>
  );
}

export default WrongWayDriverPopup;


