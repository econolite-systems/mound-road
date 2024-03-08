// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EventAvailable } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

/* eslint-disable-next-line */
export interface EnvironmentalSensorPopupProps {
  data: Array<any> | null;
}

export function EnvironmentalSensorPopup({
  data,
}: EnvironmentalSensorPopupProps) {
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

  return (
    <Box sx={{ height: 350, width: 350 }}>
      {(!data || data.length === 0) &&
        <div>No data found</div>
      }
      {(data && data.length > 0) &&
        <Grid container rowSpacing={1} columnSpacing={1} columns={2}>
          <Grid item xs={1}>
            <Sensor>
              <Box style={SensorLabel}>{data[0].name}</Box>
              <Box style={SensorValue}>{data[0].value}</Box>
            </Sensor>
          </Grid>
          <Grid item xs={1}>
            <Sensor>
              <Box style={SensorLabel}>{data[1].name}</Box>
              <Box style={SensorValue}>{data[1].value}</Box>
            </Sensor>
          </Grid>
          <Grid item xs={1}>
            <Sensor>
              <Box style={SensorLabel}>{data[2].name}</Box>
              <Box style={SensorValue}>{data[2].value}</Box>
            </Sensor>
          </Grid>
          <Grid item xs={1}>
            <Sensor>
              <Box style={SensorLabel}>{data[3].name}</Box>
              <Box style={SensorValue}>{data[3].value}&deg;</Box>
            </Sensor>
          </Grid>
        </Grid>
      }
    </Box>
  );
}

export default EnvironmentalSensorPopup;
