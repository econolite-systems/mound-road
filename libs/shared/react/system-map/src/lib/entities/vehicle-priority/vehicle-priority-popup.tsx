// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EventAvailable } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

/* eslint-disable-next-line */
export interface VehiclePriorityPopupProps {
  data: Array<any> | null;
}

export function VehiclePriorityPopup({
  data,
}: VehiclePriorityPopupProps) {
  const Sensor = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 150,
    width: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "normal",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 2
    }
  }));

  const SensorLabel = {
    verticalAlign: 'top',
    fontSize: 16,
    fontWeight: 'bold'
  }

  const SensorValue = {
    verticalAlign: 'bottom',
    fontSize: 25,
    paddingTop: 40
  }
  const height = data ? data.length > 2 ? 350 : 175 : 175;
  return (
    <Box sx={{ height: height, width: 350 }}>
      {(!data || data.length === 0) &&
        <div>No data found</div>
      }
      {(data && data.length > 0) &&
        <Grid container rowSpacing={1} columnSpacing={1} columns={2}>
          { data.map((item, index) =>
          <Grid item xs={1}>
            <Sensor>
              <Box style={SensorLabel}>{data[index].name}</Box>
              <Box style={SensorValue}>{data[index].value}</Box>
            </Sensor>
          </Grid>
          )}
        </Grid>
      }
    </Box>
  );
}

export default VehiclePriorityPopup;
