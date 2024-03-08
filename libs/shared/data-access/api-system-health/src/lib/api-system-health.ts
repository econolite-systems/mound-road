// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiSystemHealth';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHealthCheckConfigurations: build.query<
      GetHealthCheckConfigurationsApiResponse,
      GetHealthCheckConfigurationsApiArg
    >({
      query: () => ({ url: `/HealthCheckConfigurations` }),
    }),
    getServiceHealthStatus: build.query<
      GetServiceHealthStatusApiResponse,
      GetServiceHealthStatusApiArg
    >({
      query: () => ({ url: `/ServiceHealthStatus` }),
    }),
    postUiHealthReports: build.mutation<
      PostUiHealthReportsApiResponse,
      PostUiHealthReportsApiArg
    >({
      query: (queryArg) => ({
        url: `/UIHealthReports`,
        method: 'POST',
        body: queryArg.uiHealthReport,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiSystemHealth };
export type GetHealthCheckConfigurationsApiResponse =
  /** status 200 Success */ HealthCheckConfiguration[];
export type GetHealthCheckConfigurationsApiArg = void;
export type GetServiceHealthStatusApiResponse =
  /** status 200 Success */ HealthCheckExecution[];
export type GetServiceHealthStatusApiArg = void;
export type PostUiHealthReportsApiResponse = unknown;
export type PostUiHealthReportsApiArg = {
  uiHealthReport: UiHealthReport;
};
export type HealthCheckConfiguration = {
  id?: number;
  uri?: string | null;
  name?: string | null;
  discoveryService?: string | null;
};
export type UiHealthStatus = 'Unhealthy' | 'Degraded' | 'Healthy';
export type TimeSpan = {
  ticks?: number;
  days?: number;
  hours?: number;
  milliseconds?: number;
  minutes?: number;
  seconds?: number;
  totalDays?: number;
  totalHours?: number;
  totalMilliseconds?: number;
  totalMinutes?: number;
  totalSeconds?: number;
};
export type HealthCheckExecutionEntry = {
  id?: number;
  name?: string | null;
  status?: UiHealthStatus;
  description?: string | null;
  duration?: TimeSpan;
  tags?: string[] | null;
};
export type HealthCheckExecutionHistory = {
  id?: number;
  name?: string | null;
  description?: string | null;
  status?: UiHealthStatus;
  on?: string;
};
export type HealthCheckExecution = {
  id?: number;
  status?: UiHealthStatus;
  onStateFrom?: string;
  lastExecuted?: string;
  uri?: string | null;
  name?: string | null;
  discoveryService?: string | null;
  entries?: HealthCheckExecutionEntry[] | null;
  history?: HealthCheckExecutionHistory[] | null;
};
export type UiHealthReportEntry = {
  data?: {
    [key: string]: any;
  } | null;
  description?: string | null;
  duration?: TimeSpan;
  exception?: string | null;
  status?: UiHealthStatus;
  tags?: string[] | null;
};
export type UiHealthReport = {
  status?: UiHealthStatus;
  totalDuration?: TimeSpan;
  entries?: {
    [key: string]: UiHealthReportEntry;
  } | null;
};
export const {
  useGetHealthCheckConfigurationsQuery,
  useGetServiceHealthStatusQuery,
  usePostUiHealthReportsMutation,
} = injectedRtkApi;
