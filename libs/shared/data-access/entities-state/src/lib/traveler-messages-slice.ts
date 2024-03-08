// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { createSlice } from '@reduxjs/toolkit';
import { array, boolean, object, string } from 'yup';

export const travelerMessageStateSchema = object({
    id: string().uuid().optional(),
    message: string().required(),
    location: string().optional(),
  });

  export const travelerMessagesStateSchema = object(
    {
        messages: array().of(travelerMessageStateSchema).default([]),
    }
  );

  const initialState = travelerMessagesStateSchema.cast({
    messages: [travelerMessageStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
        message: 'Construction Ahead',
        location: '1st @ Main',
      }),
      travelerMessageStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21f',
        message: 'Delay Expected',
        location: '1st @ Main, 2nd Street',
      }),
      travelerMessageStateSchema.cast(
      {
        id: '28c6d78e-1002-4b47-8b34-ff528610e21g',
        message: 'Crash Ahead',
        location: '2nd Street',
      })
    ]
  });

  export const travelerMessagesSlice = createSlice({
    name: "travelerMessages",
    initialState,
    reducers: {
      LoadTypesMessages: (state, action) => {
        state.messages = action.payload;
      },
    },
  });

export const { LoadTypesMessages } = travelerMessagesSlice.actions;

export const travelersMessagesReducer = travelerMessagesSlice.reducer;
