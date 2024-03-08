// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { createSlice } from '@reduxjs/toolkit';
import { array, boolean, object, string } from 'yup';

export const environmentalSensorStateSchema = object({
    id: string().uuid().optional(),
    name: string().required(),
    value: string().required(),
  });

  export const environmentalSensorsStateSchema = object(
    {
        sensors: array().of(environmentalSensorStateSchema).default([]),
    }
  );

  const initialState = environmentalSensorsStateSchema.cast({
    sensors: [environmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        name: 'Precipitation',
        value: '0%',
      }),
      environmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        name: 'Visibility',
        value: '10 Miles',
      }),
      environmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        name: 'Humidity',
        value: '17%',
      }),
      environmentalSensorStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        name: 'Temperature',
        value: '51',
      })
    ]
  });

  export const environmentalSensorsSlice = createSlice({
    name: "environmentalSensors",
    initialState,
    reducers: {
      LoadTypesSensors: (state, action) => {
        state.sensors = action.payload;
      },
    },
  });

export const { LoadTypesSensors } = environmentalSensorsSlice.actions;

export const environmentalSensorsReducer = environmentalSensorsSlice.reducer;
