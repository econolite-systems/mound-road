// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { configureStore } from '@reduxjs/toolkit';
import { authReducer as auth } from '@econolite/auth-state';
import { configReducer as config } from './features/configSlice';
import { entitiesReducer as entities, travelersMessagesReducer as messages } from '@econolite/entities-state';
import { mapReducer as maps } from '@econolite/shared/data-access/map-state';
import { apiReports } from '@econolite/shared/data-access/api-reports';
import { apiConfiguration } from '@econolite/shared/data-access/api-configuration';
import { setupListeners } from '@reduxjs/toolkit/query'
import { apiVehiclePriority } from '@econolite/shared/data-access/api-vehicle-priority';
import { apiTim } from '@econolite/shared/data-access/api-tim';
import { apiSystemHealth } from '@econolite/shared/data-access/api-system-health';
import { apiSignalStatus } from '@econolite/shared/data-access/api-signal-status';
import { apiSpeedStatus } from '@econolite/shared/data-access/api-speed-status';

export const store = configureStore({
  reducer: {
    config,
    auth,
    entities,
    messages,
    maps,
    [apiReports.reducerPath]: apiReports.reducer,
    [apiConfiguration.reducerPath]: apiConfiguration.reducer,
    [apiVehiclePriority.reducerPath]: apiVehiclePriority.reducer,
    [apiTim.reducerPath]: apiTim.reducer,
    [apiSystemHealth.reducerPath]: apiSystemHealth.reducer,
    [apiSignalStatus.reducerPath]: apiSignalStatus.reducer,
    [apiSpeedStatus.reducerPath]: apiSpeedStatus.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiReports.middleware)
      .concat(apiConfiguration.middleware)
      .concat(apiVehiclePriority.middleware)
      .concat(apiTim.middleware)
      .concat(apiSystemHealth.middleware)
      .concat(apiSignalStatus.middleware)
      .concat(apiSpeedStatus.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
