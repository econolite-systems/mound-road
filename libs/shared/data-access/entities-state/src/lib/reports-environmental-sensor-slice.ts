// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { createSlice } from '@reduxjs/toolkit';
import { array, boolean, object, string } from 'yup';

export const reportsEnvironmentalSensorStateSchema = object({
    id: string().uuid().required(),
    name: string().required(),
    timestamp: string().required(),
    temp: string().required(),
    dewpointTemp: string().required(),
    maxTemp: string().required(),
    minTemp: string().required(),
    pressure: string().required(),
    humidity: string().required(),
  });

  export const reportsEnvironmentalSensorsStateSchema = object(
    {
        sensors: array().of(reportsEnvironmentalSensorStateSchema).default([]),
    }
  );

  const initialState = reportsEnvironmentalSensorsStateSchema.cast({
    reportSensors: [reportsEnvironmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        name: 'Env Sensor',
        timestamp: '12/13/21 11:23',
        temp: '37',
        dewpointTemp: '21',
        maxTemp: '110',
        minTemp: '-17',
        pressure: '25.89',
        humidity: '15',
      }),
      reportsEnvironmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21f',
        name: 'Env Sensor 2',
        timestamp: '12/13/21 11:23',
        temp: '37',
        dewpointTemp: '21',
        maxTemp: '110',
        minTemp: '-17',
        pressure: '25.89',
        humidity: '15',
      }),
      reportsEnvironmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21g',
        name: 'Env Sensor 3',
        timestamp: '12/13/21 11:23',
        temp: '37',
        dewpointTemp: '21',
        maxTemp: '110',
        minTemp: '-17',
        pressure: '25.89',
        humidity: '15',
      }),
    ]
  });

  export const reportsEnvironmentalSensorsSlice = createSlice({
    name: "environmentalSensors",
    initialState,
    reducers: {
      LoadTypesReportsSensors: (state, action) => {
        state.sensors = action.payload;
      },
    },
  });

export const { LoadTypesReportsSensors } = reportsEnvironmentalSensorsSlice.actions;

export const reportsEnvironmentalSensors = reportsEnvironmentalSensorsSlice.reducer;
