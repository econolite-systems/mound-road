// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { configInitialState, configStateSchema, initialState } from '@econolite/config/models';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IKnownError {
  errorMessage: string
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConfig.fulfilled, (state, { payload }) => {
      /**
       * * Using immer to do the immutable update when
       * * wanting to replace everything except a few values.
       */
      return { ...payload, isLoading: false } as typeof initialState;
    });
    builder.addCase(fetchConfig.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  }
})

export const fetchConfig = createAsyncThunk<
  typeof configInitialState,
  string,
  {
    rejectValue: IKnownError
  }>('config/fetchConfig', async (url, thunkApi) => {
    const response = await fetch(url);
    if (response.status !== 200) {
      thunkApi.rejectWithValue((await response.json()) as IKnownError)
    }
    return configStateSchema.validate(await response.json());
  });

export const configReducer = configSlice.reducer
