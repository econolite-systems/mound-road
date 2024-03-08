import { emptySplitApi as api } from './emptyApiSpeedStatus';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    putLocationLocationInventoryGetFromApiAndInsert: build.mutation<
      PutLocationLocationInventoryGetFromApiAndInsertApiResponse,
      PutLocationLocationInventoryGetFromApiAndInsertApiArg
    >({
      query: () => ({
        url: `/location/locationInventory/GetFromApiAndInsert`,
        method: 'PUT',
      }),
    }),
    getLocationLocationInventoryGetFromApi: build.query<
      GetLocationLocationInventoryGetFromApiApiResponse,
      GetLocationLocationInventoryGetFromApiApiArg
    >({
      query: () => ({ url: `/location/locationInventory/GetFromApi` }),
    }),
    getLocationLocationInventoryGetFromDatabase: build.query<
      GetLocationLocationInventoryGetFromDatabaseApiResponse,
      GetLocationLocationInventoryGetFromDatabaseApiArg
    >({
      query: () => ({ url: `/location/locationInventory/getFromDatabase` }),
    }),
    putLocationLocationInventoryUpdateDatabase: build.mutation<
      PutLocationLocationInventoryUpdateDatabaseApiResponse,
      PutLocationLocationInventoryUpdateDatabaseApiArg
    >({
      query: (queryArg) => ({
        url: `/location/locationInventory/updateDatabase`,
        method: 'PUT',
        body: queryArg.locationInventoryDocument,
      }),
    }),
    putSegmentSegmentInventoryGetFromApiAndInsert: build.mutation<
      PutSegmentSegmentInventoryGetFromApiAndInsertApiResponse,
      PutSegmentSegmentInventoryGetFromApiAndInsertApiArg
    >({
      query: () => ({
        url: `/segment/segmentInventory/GetFromApiAndInsert`,
        method: 'PUT',
      }),
    }),
    getSegmentSegmentInventoryGetFromApi: build.query<
      GetSegmentSegmentInventoryGetFromApiApiResponse,
      GetSegmentSegmentInventoryGetFromApiApiArg
    >({
      query: () => ({ url: `/segment/segmentInventory/GetFromApi` }),
    }),
    getSegmentSegmentInventoryGetFromDatabase: build.query<
      GetSegmentSegmentInventoryGetFromDatabaseApiResponse,
      GetSegmentSegmentInventoryGetFromDatabaseApiArg
    >({
      query: () => ({ url: `/segment/segmentInventory/getFromDatabase` }),
    }),
    putSegmentSegmentInventoryUpdateDatabase: build.mutation<
      PutSegmentSegmentInventoryUpdateDatabaseApiResponse,
      PutSegmentSegmentInventoryUpdateDatabaseApiArg
    >({
      query: (queryArg) => ({
        url: `/segment/segmentInventory/updateDatabase`,
        method: 'PUT',
        body: queryArg.segmentInventoryDocument,
      }),
    }),
    deleteSegmentSegmentInventoryDeleteSegment: build.mutation<
      DeleteSegmentSegmentInventoryDeleteSegmentApiResponse,
      DeleteSegmentSegmentInventoryDeleteSegmentApiArg
    >({
      query: (queryArg) => ({
        url: `/segment/segmentInventory/deleteSegment`,
        method: 'DELETE',
        body: queryArg.segmentInventoryDocument,
      }),
    }),
    getSegmentCollectionAll: build.query<
      GetSegmentCollectionAllApiResponse,
      GetSegmentCollectionAllApiArg
    >({
      query: () => ({ url: `/segment-collection/all` }),
    }),
    getSegmentCollection: build.query<
      GetSegmentCollectionApiResponse,
      GetSegmentCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/segment-collection`,
        params: { id: queryArg.id },
      }),
    }),
    postSegmentCollection: build.mutation<
      PostSegmentCollectionApiResponse,
      PostSegmentCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/segment-collection`,
        method: 'POST',
        body: queryArg.segmentCollectionSegment,
      }),
    }),
    putSegmentCollection: build.mutation<
      PutSegmentCollectionApiResponse,
      PutSegmentCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/segment-collection`,
        method: 'PUT',
        body: queryArg.segmentCollectionSegment,
      }),
    }),
    deleteSegmentCollection: build.mutation<
      DeleteSegmentCollectionApiResponse,
      DeleteSegmentCollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/segment-collection`,
        method: 'DELETE',
        params: { id: queryArg.id },
      }),
    }),
    getSpeedStatus: build.query<
      GetSpeedStatusApiResponse,
      GetSpeedStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/speed-status`,
        params: { deviceId: queryArg.deviceId },
      }),
    }),
    getSpeedStatusAll: build.query<
      GetSpeedStatusAllApiResponse,
      GetSpeedStatusAllApiArg
    >({
      query: () => ({ url: `/speed-status/all` }),
    }),
    postSpeedStatusPublish: build.mutation<
      PostSpeedStatusPublishApiResponse,
      PostSpeedStatusPublishApiArg
    >({
      query: (queryArg) => ({
        url: `/speed-status/publish`,
        method: 'POST',
        body: queryArg.speedEvent,
        params: { tenantId: queryArg.tenantId, deviceId: queryArg.deviceId },
      }),
    }),
    getTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriod:
      build.query<
        GetTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodApiResponse,
        GetTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodApiArg
      >({
        query: (queryArg) => ({
          url: `/travel/travelData/${queryArg.segmentId}/${queryArg.startTimeEpoch}/${queryArg.endTimeEpoch}/${queryArg.period}`,
        }),
      }),
    putTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsert:
      build.mutation<
        PutTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsertApiResponse,
        PutTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsertApiArg
      >({
        query: (queryArg) => ({
          url: `/travel/travelData/${queryArg.segmentId}/${queryArg.startTimeEpoch}/${queryArg.endTimeEpoch}/${queryArg.period}/GetAndInsert`,
          method: 'PUT',
        }),
      }),
    getTravelTravelDataGetFromDatabase: build.query<
      GetTravelTravelDataGetFromDatabaseApiResponse,
      GetTravelTravelDataGetFromDatabaseApiArg
    >({
      query: () => ({ url: `/travel/travelData/getFromDatabase` }),
    }),
    putTravelTravelDataUpdateDatabase: build.mutation<
      PutTravelTravelDataUpdateDatabaseApiResponse,
      PutTravelTravelDataUpdateDatabaseApiArg
    >({
      query: (queryArg) => ({
        url: `/travel/travelData/updateDatabase`,
        method: 'PUT',
        body: queryArg.travelDataDocument,
      }),
    }),
    deleteTravelTravelDataDeleteTravelData: build.mutation<
      DeleteTravelTravelDataDeleteTravelDataApiResponse,
      DeleteTravelTravelDataDeleteTravelDataApiArg
    >({
      query: (queryArg) => ({
        url: `/travel/travelData/deleteTravelData`,
        method: 'DELETE',
        body: queryArg.travelDataDocument,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiSpeedStatus };
export type PutLocationLocationInventoryGetFromApiAndInsertApiResponse =
  unknown;
export type PutLocationLocationInventoryGetFromApiAndInsertApiArg = void;
export type GetLocationLocationInventoryGetFromApiApiResponse = unknown;
export type GetLocationLocationInventoryGetFromApiApiArg = void;
export type GetLocationLocationInventoryGetFromDatabaseApiResponse = unknown;
export type GetLocationLocationInventoryGetFromDatabaseApiArg = void;
export type PutLocationLocationInventoryUpdateDatabaseApiResponse = unknown;
export type PutLocationLocationInventoryUpdateDatabaseApiArg = {
  locationInventoryDocument: LocationInventoryDocument;
};
export type PutSegmentSegmentInventoryGetFromApiAndInsertApiResponse = unknown;
export type PutSegmentSegmentInventoryGetFromApiAndInsertApiArg = void;
export type GetSegmentSegmentInventoryGetFromApiApiResponse = unknown;
export type GetSegmentSegmentInventoryGetFromApiApiArg = void;
export type GetSegmentSegmentInventoryGetFromDatabaseApiResponse = unknown;
export type GetSegmentSegmentInventoryGetFromDatabaseApiArg = void;
export type PutSegmentSegmentInventoryUpdateDatabaseApiResponse = unknown;
export type PutSegmentSegmentInventoryUpdateDatabaseApiArg = {
  segmentInventoryDocument: SegmentInventoryDocument;
};
export type DeleteSegmentSegmentInventoryDeleteSegmentApiResponse = unknown;
export type DeleteSegmentSegmentInventoryDeleteSegmentApiArg = {
  segmentInventoryDocument: SegmentInventoryDocument;
};
export type GetSegmentCollectionAllApiResponse =
  /** status 200 Success */ SegmentCollectionSegment[];
export type GetSegmentCollectionAllApiArg = void;
export type GetSegmentCollectionApiResponse =
  /** status 200 Success */ SegmentCollectionSegment;
export type GetSegmentCollectionApiArg = {
  id?: string;
};
export type PostSegmentCollectionApiResponse =
  /** status 200 Success */ SegmentCollectionSegment;
export type PostSegmentCollectionApiArg = {
  segmentCollectionSegment: SegmentCollectionSegment;
};
export type PutSegmentCollectionApiResponse = /** status 200 Success */ number;
export type PutSegmentCollectionApiArg = {
  segmentCollectionSegment: SegmentCollectionSegment;
};
export type DeleteSegmentCollectionApiResponse = unknown;
export type DeleteSegmentCollectionApiArg = {
  id?: string;
};
export type GetSpeedStatusApiResponse =
  /** status 200 Success */ SpeedStatusModel;
export type GetSpeedStatusApiArg = {
  deviceId?: string;
};
export type GetSpeedStatusAllApiResponse =
  /** status 200 Success */ SpeedStatusModel[];
export type GetSpeedStatusAllApiArg = void;
export type PostSpeedStatusPublishApiResponse =
  /** status 200 Success */ number;
export type PostSpeedStatusPublishApiArg = {
  tenantId?: string;
  deviceId?: string;
  speedEvent: SpeedEvent;
};
export type GetTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodApiResponse =
  unknown;
export type GetTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodApiArg =
  {
    segmentId: number;
    startTimeEpoch: number;
    endTimeEpoch: number;
    period: number;
  };
export type PutTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsertApiResponse =
  unknown;
export type PutTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsertApiArg =
  {
    segmentId: number;
    startTimeEpoch: number;
    endTimeEpoch: number;
    period: number;
  };
export type GetTravelTravelDataGetFromDatabaseApiResponse = unknown;
export type GetTravelTravelDataGetFromDatabaseApiArg = void;
export type PutTravelTravelDataUpdateDatabaseApiResponse = unknown;
export type PutTravelTravelDataUpdateDatabaseApiArg = {
  travelDataDocument: TravelDataDocument;
};
export type DeleteTravelTravelDataDeleteTravelDataApiResponse = unknown;
export type DeleteTravelTravelDataDeleteTravelDataApiArg = {
  travelDataDocument: TravelDataDocument;
};
export type LocationInventoryDocument = {
  id?: string;
  locationId?: number;
  latitude?: number;
  longitude?: number;
  diffrfSensors?: number[] | null;
  cabinets?: number[] | null;
  vsoSensors?: number[] | null;
  userFiles?: number[] | null;
};
export type ThresholdDocument = {
  color?: string | null;
  value?: number;
};
export type SegmentInventoryDocument = {
  id?: string;
  segmentId?: number;
  startSerial?: number;
  startId?: number;
  endSerial?: number;
  endId?: number;
  distance?: number;
  thresholds?: ThresholdDocument[][] | null;
  polyline?: string | null;
  baseOffset?: number;
};
export type SegmentCollectionSegment = {
  id?: string;
  segmentIds?: number[] | null;
  segmentCollectionSpeed?: number;
};
export type CommStatus =
  | 'Unknown'
  | 'Offline'
  | 'Standby'
  | 'Bad'
  | 'BadContent'
  | 'Marginal'
  | 'Good';
export type TrafficStatus =
  | 'Stopped'
  | 'StopAndGo'
  | 'Slow'
  | 'LongQueues'
  | 'Normal';
export type SpeedStatusModel = {
  deviceId?: string;
  actionEventType?: string | null;
  timeStamp?: string;
  segmentId?: number;
  segmentSpeed?: number;
  commStatus?: CommStatus;
  trafficStatus?: TrafficStatus;
  latitude?: number;
  longitude?: number;
  location?: string | null;
  coordinates?: number[][] | null;
};
export type SpeedEvent = {
  actionEventType?: string | null;
  timeStamp?: string;
  deviceId?: string;
  segmentId?: number;
  segmentSpeed?: number;
  commStatus?: CommStatus;
  trafficStatus?: TrafficStatus;
  latitude?: number;
  longitude?: number;
  polylineCoordinates?: number[][] | null;
  location?: string | null;
};
export type TravelDataDocument = {
  id?: string;
  segmentId?: number;
  time?: number;
  strength?: number;
  first?: number;
  last?: number;
  minimum?: number;
  maximum?: number;
};
export const {
  usePutLocationLocationInventoryGetFromApiAndInsertMutation,
  useGetLocationLocationInventoryGetFromApiQuery,
  useGetLocationLocationInventoryGetFromDatabaseQuery,
  usePutLocationLocationInventoryUpdateDatabaseMutation,
  usePutSegmentSegmentInventoryGetFromApiAndInsertMutation,
  useGetSegmentSegmentInventoryGetFromApiQuery,
  useGetSegmentSegmentInventoryGetFromDatabaseQuery,
  usePutSegmentSegmentInventoryUpdateDatabaseMutation,
  useDeleteSegmentSegmentInventoryDeleteSegmentMutation,
  useGetSegmentCollectionAllQuery,
  useGetSegmentCollectionQuery,
  usePostSegmentCollectionMutation,
  usePutSegmentCollectionMutation,
  useDeleteSegmentCollectionMutation,
  useGetSpeedStatusQuery,
  useGetSpeedStatusAllQuery,
  usePostSpeedStatusPublishMutation,
  useGetTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodQuery,
  usePutTravelTravelDataBySegmentIdAndStartTimeEpochEndTimeEpochPeriodGetAndInsertMutation,
  useGetTravelTravelDataGetFromDatabaseQuery,
  usePutTravelTravelDataUpdateDatabaseMutation,
  useDeleteTravelTravelDataDeleteTravelDataMutation,
} = injectedRtkApi;
