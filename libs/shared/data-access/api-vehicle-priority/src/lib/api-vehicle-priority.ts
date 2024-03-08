// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiVehiclePriority';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getScpVehicleClass: build.query<
      GetScpVehicleClassApiResponse,
      GetScpVehicleClassApiArg
    >({
      query: () => ({ url: `/scp-vehicle-class` }),
    }),
    putScpVehicleClass: build.mutation<
      PutScpVehicleClassApiResponse,
      PutScpVehicleClassApiArg
    >({
      query: (queryArg) => ({
        url: `/scp-vehicle-class`,
        method: 'PUT',
        body: queryArg.priorityRequestVehicleConfiguration,
      }),
    }),
    putScpRegisterheartbeat: build.mutation<
      PutScpRegisterheartbeatApiResponse,
      PutScpRegisterheartbeatApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/registerheartbeat`,
        method: 'PUT',
        params: { sourceId: queryArg.sourceId },
      }),
    }),
    postScpRequestpriority: build.mutation<
      PostScpRequestpriorityApiResponse,
      PostScpRequestpriorityApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/requestpriority`,
        method: 'POST',
        body: queryArg.priorityRequest,
      }),
    }),
    putScpCancelpriorityrequest: build.mutation<
      PutScpCancelpriorityrequestApiResponse,
      PutScpCancelpriorityrequestApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/cancelpriorityrequest`,
        method: 'PUT',
        params: { requestId: queryArg.requestId },
      }),
    }),
    putScpUpdatevehicleposition: build.mutation<
      PutScpUpdatevehiclepositionApiResponse,
      PutScpUpdatevehiclepositionApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/updatevehicleposition`,
        method: 'PUT',
        params: {
          vehicleid: queryArg.vehicleid,
          latitude: queryArg.latitude,
          longitude: queryArg.longitude,
          speedmph: queryArg.speedmph,
          heading: queryArg.heading,
        },
      }),
    }),
    putScpUpdatevehicle: build.mutation<
      PutScpUpdatevehicleApiResponse,
      PutScpUpdatevehicleApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/updatevehicle`,
        method: 'PUT',
        body: queryArg.vehicleUpdate,
      }),
    }),
    postScpRegisterroute: build.mutation<
      PostScpRegisterrouteApiResponse,
      PostScpRegisterrouteApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/registerroute`,
        method: 'POST',
        body: queryArg.routeUpdate,
      }),
    }),
    putScpUpdateroute: build.mutation<
      PutScpUpdaterouteApiResponse,
      PutScpUpdaterouteApiArg
    >({
      query: (queryArg) => ({
        url: `/scp/updateroute`,
        method: 'PUT',
        body: queryArg.routeUpdate,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiVehiclePriority };
export type GetScpVehicleClassApiResponse =
  /** status 200 Success */ PriorityRequestVehicleConfiguration;
export type GetScpVehicleClassApiArg = void;
export type PutScpVehicleClassApiResponse = /** status 200 Success */ boolean;
export type PutScpVehicleClassApiArg = {
  priorityRequestVehicleConfiguration: PriorityRequestVehicleConfiguration;
};
export type PutScpRegisterheartbeatApiResponse =
  /** status 200 Success */ boolean;
export type PutScpRegisterheartbeatApiArg = {
  /** Agreed upon system ID */
  sourceId?: string;
};
export type PostScpRequestpriorityApiResponse =
  /** status 200 Success */ string;
export type PostScpRequestpriorityApiArg = {
  priorityRequest: PriorityRequest;
};
export type PutScpCancelpriorityrequestApiResponse =
  /** status 200 Success */ boolean;
export type PutScpCancelpriorityrequestApiArg = {
  /** ID of the request */
  requestId?: string;
};
export type PutScpUpdatevehiclepositionApiResponse = unknown;
export type PutScpUpdatevehiclepositionApiArg = {
  /** The id. */
  vehicleid?: string;
  /** The lat. */
  latitude?: number;
  /** The lon. */
  longitude?: number;
  /** The speed in mph. */
  speedmph?: number;
  /** The heading in degrees. */
  heading?: string;
};
export type PutScpUpdatevehicleApiResponse = unknown;
export type PutScpUpdatevehicleApiArg = {
  /** The vehicle update. */
  vehicleUpdate: VehicleUpdate;
};
export type PostScpRegisterrouteApiResponse = /** status 200 Success */ string;
export type PostScpRegisterrouteApiArg = {
  routeUpdate: RouteUpdate;
};
export type PutScpUpdaterouteApiResponse = unknown;
export type PutScpUpdaterouteApiArg = {
  routeUpdate: RouteUpdate;
};
export type ScheduleTime = {
  hour?: number;
  minute?: number;
};
export type PriorityRequestVehicle = {
  id?: string | null;
  type?: string | null;
  allowed?: boolean;
  startTime?: ScheduleTime;
  endTime?: ScheduleTime;
};
export type PriorityRequestVehicleClassType = {
  id?: number;
  type?: string | null;
};
export type PriorityRequestVehicleClassLevel = {
  id?: number;
  type?: string | null;
};
export type PriorityRequestVehicleName = {
  name?: string | null;
};
export type PriorityRequestVehicleIntersection = {
  id?: string;
  name?: string | null;
  disable?: boolean;
  vehicles?: PriorityRequestVehicleName[] | null;
};
export type PriorityRequestVehicleConfiguration = {
  id?: string | null;
  vehicles?: PriorityRequestVehicle[] | null;
  priorityRequestVehicleClassType?: PriorityRequestVehicleClassType[] | null;
  priorityRequestVehicleClassLevel?: PriorityRequestVehicleClassLevel[] | null;
  priorityRequestVehicleIntersections?:
    | PriorityRequestVehicleIntersection[]
    | null;
};
export type PriorityRequest = {
  requestId?: string | null;
  vehicleId?: string | null;
  vehicleType?: string | null;
  vehicleName?: string | null;
  tag?: string | null;
  requestMetadata?: string | null;
  routeId?: string | null;
  desiredClassLevel?: number | null;
};
export type VehicleUpdate = {
  vehicleId?: string | null;
  vehicleType?: string | null;
  vehicleName?: string | null;
  tag?: string | null;
  routeId?: string | null;
  vehicleLatitude?: string | null;
  vehicleLongitude?: string | null;
  travelDirection?: number;
  travelSpeed?: number;
};
export type LatLongPair = {
  latitude?: number;
  longitude?: number;
};
export type RouteUpdate = {
  routeId?: string | null;
  destinationLocation?: string | null;
  destinationCity?: string | null;
  destinationLatitude?: number;
  destinationLongitude?: number;
  unitLocation?: string | null;
  unitCity?: string | null;
  unitLatitude?: number;
  unitLongitude?: number;
  waypoints?: LatLongPair[] | null;
};
export const {
  useGetScpVehicleClassQuery,
  usePutScpVehicleClassMutation,
  usePutScpRegisterheartbeatMutation,
  usePostScpRequestpriorityMutation,
  usePutScpCancelpriorityrequestMutation,
  usePutScpUpdatevehiclepositionMutation,
  usePutScpUpdatevehicleMutation,
  usePostScpRegisterrouteMutation,
  usePutScpUpdaterouteMutation,
} = injectedRtkApi;
