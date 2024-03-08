// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { array, boolean, object, string } from 'yup';
import { createSlice } from '@reduxjs/toolkit';

export const authStateSchema = object(
  {
    isAuthenticated: boolean().required().default(false),
    token: string().optional(),
    sub: string().optional(),
    name: string().optional(),
    roles: array().optional()
  }
);

export const initialState = authStateSchema.cast({});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
    updateToken: (state, action) => {
      state.token = action.payload
    },
    updateUser: (state, action) => {
      state.sub = action.payload.sub;
      state.name = action.payload.name;
      state.roles = action.payload.roles;
    },
    clearAuthState: (state) => {
      state.name = undefined;
      state.isAuthenticated = false;
      state.token = undefined;
      state.sub = undefined;
      state.roles = undefined;
    }
  },
})

export const { updateIsAuthenticated, updateToken, updateUser, clearAuthState } = authSlice.actions;

export const authReducer = authSlice.reducer;
