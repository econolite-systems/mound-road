// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiTim';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTim: build.query<GetTimApiResponse, GetTimApiArg>({
      query: () => ({ url: `/tim` }),
    }),
    getTimItisCodes: build.query<
      GetTimItisCodesApiResponse,
      GetTimItisCodesApiArg
    >({
      query: () => ({ url: `/tim/itis-codes` }),
    }),
    getTimStatus: build.query<GetTimStatusApiResponse, GetTimStatusApiArg>({
      query: () => ({ url: `/tim/status` }),
    }),
    getTimBatchByBatchId: build.query<
      GetTimBatchByBatchIdApiResponse,
      GetTimBatchByBatchIdApiArg
    >({
      query: (queryArg) => ({ url: `/tim/batch/${queryArg.batchId}` }),
    }),
    deleteTimBatchByBatchId: build.mutation<
      DeleteTimBatchByBatchIdApiResponse,
      DeleteTimBatchByBatchIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tim/batch/${queryArg.batchId}`,
        method: 'DELETE',
      }),
    }),
    postTimSendRequest: build.mutation<
      PostTimSendRequestApiResponse,
      PostTimSendRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/tim/send-request`,
        method: 'POST',
        body: queryArg.timRequest,
      }),
    }),
    putTimCancelById: build.mutation<
      PutTimCancelByIdApiResponse,
      PutTimCancelByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tim/cancel/${queryArg.id}`,
        method: 'PUT',
      }),
    }),
    putTimCancelBatchByBatchId: build.mutation<
      PutTimCancelBatchByBatchIdApiResponse,
      PutTimCancelBatchByBatchIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tim/cancel/batch/${queryArg.batchId}`,
        method: 'PUT',
      }),
    }),
    deleteTimById: build.mutation<
      DeleteTimByIdApiResponse,
      DeleteTimByIdApiArg
    >({
      query: (queryArg) => ({ url: `/tim/${queryArg.id}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiTim };
export type GetTimApiResponse = /** status 200 Success */ TimDocument[];
export type GetTimApiArg = void;
export type GetTimItisCodesApiResponse =
  /** status 200 Success */ ItisCodeType[];
export type GetTimItisCodesApiArg = void;
export type GetTimStatusApiResponse = /** status 200 Success */ TimStatus[];
export type GetTimStatusApiArg = void;
export type GetTimBatchByBatchIdApiResponse =
  /** status 200 Success */ TimDocument[];
export type GetTimBatchByBatchIdApiArg = {
  /** Guid for the batch */
  batchId: string;
};
export type DeleteTimBatchByBatchIdApiResponse = unknown;
export type DeleteTimBatchByBatchIdApiArg = {
  /** The ID of a batch of TIM messages */
  batchId: string;
};
export type PostTimSendRequestApiResponse =
  /** status 200 Success */ TimRequest;
export type PostTimSendRequestApiArg = {
  timRequest: TimRequest;
};
export type PutTimCancelByIdApiResponse = unknown;
export type PutTimCancelByIdApiArg = {
  /** The ID of a TIM message */
  id: string;
};
export type PutTimCancelBatchByBatchIdApiResponse = unknown;
export type PutTimCancelBatchByBatchIdApiArg = {
  /** The ID of a batch of TIM messages */
  batchId: string;
};
export type DeleteTimByIdApiResponse = unknown;
export type DeleteTimByIdApiArg = {
  /** The ID of a TIM message */
  id: string;
};
export type TimState =
  | 'Pending'
  | 'Canceling'
  | 'Canceled'
  | 'Running'
  | 'Stopped'
  | 'Error';
export type TimSource = 'LogicStatement' | 'ManualEntry';
export type Action = 'Create' | 'Update' | 'Delete';
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
export type ItisCode =
  | 'None'
  | 'StoppedTraffic'
  | 'StopAndGoTraffic'
  | 'SlowTraffic'
  | 'LongQueues'
  | 'SpeedLimit'
  | 'Bumps'
  | 'Pothole'
  | 'VehicleTravelingWrongWay'
  | 'SevereWeather'
  | 'Blizzard'
  | 'HeavySnow'
  | 'Snow'
  | 'WinterStorm'
  | 'IceStorm'
  | 'RainAndSnowMixed'
  | 'DamagingHail'
  | 'Thunderstorms'
  | 'HeavyRain'
  | 'Tornado'
  | 'StrongWinds'
  | 'StrongWindsHaveEased'
  | 'Fog'
  | 'VisibilityReduced'
  | 'WhiteOut'
  | 'VisibilityImproved'
  | 'DangerOfHydroplaning'
  | 'Ice'
  | 'BlackIce'
  | 'FreezingRain'
  | 'SnowOnRoadway'
  | 'PavementConditionsCleared'
  | 'Watch'
  | 'Warning'
  | 'Alert'
  | 'WarningCanceled'
  | 'WatchCanceled'
  | 'AlertCanceled';
export type MessageType = 'Information' | 'Alert' | 'Warning' | 'Watch';
export type TimDocument = {
  id?: string;
  batchId?: string;
  intersectionId?: string;
  rsuId?: string;
  deleted?: boolean;
  state?: TimState;
  source?: TimSource;
  creationDate?: string;
  endDate?: string | null;
  error?: string | null;
  action?: Action;
  index?: number | null;
  isAlternating?: boolean;
  deliveryStart?: string;
  deliveryDuration?: TimeSpan;
  enable?: boolean;
  itisCode?: ItisCode;
  messageType?: MessageType;
  payload?: number[] | null;
  cancelOnDuration?: boolean;
};
export type DurationType = 'None' | 'Minutes' | 'Hours' | 'Days' | 'Weeks';
export type ItisCodeType = {
  label?: string | null;
  value?: ItisCode;
  fireOnce?: boolean;
  messageTypes?: string[] | null;
  durationType?: DurationType;
};
export type TimStatus = {
  id?: string;
  batchId?: string;
  intersection?: string | null;
  rsu?: string | null;
  status?: string | null;
  message?: string | null;
  deliveryTime?: string;
};
export type TimTransmitMode = 'Continuous' | 'Alternating';
export type TargetType =
  | 'None'
  | 'Downstream'
  | 'Upstream'
  | 'Radius'
  | 'Target';
export type TimRequest = {
  id?: string;
  cancel?: boolean;
  messageType?: MessageType;
  itisCode?: ItisCode;
  transmitMode?: TimTransmitMode;
  durationType?: DurationType;
  duration?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  targetType?: TargetType;
  target?: string[] | null;
  parameters?: string[] | null;
};
export const {
  useGetTimQuery,
  useGetTimItisCodesQuery,
  useGetTimStatusQuery,
  useGetTimBatchByBatchIdQuery,
  useDeleteTimBatchByBatchIdMutation,
  usePostTimSendRequestMutation,
  usePutTimCancelByIdMutation,
  usePutTimCancelBatchByBatchIdMutation,
  useDeleteTimByIdMutation,
} = injectedRtkApi;
