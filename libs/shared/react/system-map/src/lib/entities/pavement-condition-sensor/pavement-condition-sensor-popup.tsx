// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

/* eslint-disable-next-line */
export interface PavementConditionPopupProps {
  data: any;
}

export function PavementConditionSensorPopup({
  data,
}: PavementConditionPopupProps) {

  let colorClass = "green";
  switch (data.severity) {
    case 'High': //PavementConditionStatusSeverity.High
      colorClass = "red";
      break;
    case 'Medium':  //PavementConditionStatusSeverity.Medium
      colorClass = "yellow";
      break;
    default:
      colorClass = "green";
  }

  return (
    <Box sx={{ height: 150, width: 150 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box >
          <WarningAmberIcon className={colorClass} />
        </Box>
        <Box>
          Pothole
        </Box>
      </Box>
      <Box className='pt-8'>
        {data.location}
      </Box>
    </Box>
  );
}

export default PavementConditionSensorPopup;


