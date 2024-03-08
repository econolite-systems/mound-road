// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const rawBaseQuery = (baseUrl: string, token: string|undefined) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
      return headers
    }
});

export const baseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, api, extraOptions) => {
    const state = api.getState() as {
      config: {
        serviceSettings: {
          signalStatusService: string
        }
      },
      auth: {
        token: string
      }
    };

    const baseUrl = state.config.serviceSettings.signalStatusService;
    const token = state.auth.token;
    // gracefully handle scenarios where data to generate the URL is missing
    if (!baseUrl) {
      return {
        error: {
          status: 400,
          statusText: 'Bad Request',
          data: 'No Host found',
        },
      };
    }

    return rawBaseQuery(baseUrl, token)(args, api, extraOptions);
  };

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'api-signal-status',
  baseQuery: baseQuery,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 0,
  endpoints: () => ({}),
})
