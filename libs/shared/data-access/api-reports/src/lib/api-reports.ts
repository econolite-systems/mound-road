// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiReports';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAuditReportFind: build.query<
      GetAuditReportFindApiResponse,
      GetAuditReportFindApiArg
    >({
      query: (queryArg) => ({
        url: `/audit-report/find`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          eventTypes: queryArg.eventTypes,
          usernames: queryArg.usernames,
          details: queryArg.details,
        },
      }),
    }),
    getAuditReportGetAuditEventTypes: build.query<
      GetAuditReportGetAuditEventTypesApiResponse,
      GetAuditReportGetAuditEventTypesApiArg
    >({
      query: () => ({ url: `/audit-report/getAuditEventTypes` }),
    }),
    getConnectedVehicleStatusFind: build.query<
      GetConnectedVehicleStatusFindApiResponse,
      GetConnectedVehicleStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/connected-vehicle-status/find`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
    getConnectedVehicleStatusGetTotalsByMessageType: build.query<
      GetConnectedVehicleStatusGetTotalsByMessageTypeApiResponse,
      GetConnectedVehicleStatusGetTotalsByMessageTypeApiArg
    >({
      query: () => ({
        url: `/connected-vehicle-status/getTotalsByMessageType`,
      }),
    }),
    getConnectedVehicleStatusGetTotalsByRepositoryType: build.query<
      GetConnectedVehicleStatusGetTotalsByRepositoryTypeApiResponse,
      GetConnectedVehicleStatusGetTotalsByRepositoryTypeApiArg
    >({
      query: () => ({
        url: `/connected-vehicle-status/getTotalsByRepositoryType`,
      }),
    }),
    getConnectedVehicleStatusGetLastHourTotalsByMessageType: build.query<
      GetConnectedVehicleStatusGetLastHourTotalsByMessageTypeApiResponse,
      GetConnectedVehicleStatusGetLastHourTotalsByMessageTypeApiArg
    >({
      query: () => ({
        url: `/connected-vehicle-status/getLastHourTotalsByMessageType`,
      }),
    }),
    getConnectedVehicleStatusGetTotalMessageCount: build.query<
      GetConnectedVehicleStatusGetTotalMessageCountApiResponse,
      GetConnectedVehicleStatusGetTotalMessageCountApiArg
    >({
      query: () => ({ url: `/connected-vehicle-status/getTotalMessageCount` }),
    }),
    getConnectedVehicleStatusGetIntersectionTotalsByMessageType: build.query<
      GetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeApiResponse,
      GetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeApiArg
    >({
      query: () => ({
        url: `/connected-vehicle-status/getIntersectionTotalsByMessageType`,
      }),
    }),
    getEssStatusLatest: build.query<
      GetEssStatusLatestApiResponse,
      GetEssStatusLatestApiArg
    >({
      query: (queryArg) => ({
        url: `/ess-status/latest`,
        params: { deviceId: queryArg.deviceId },
      }),
    }),
    getEssStatusLatestAll: build.query<
      GetEssStatusLatestAllApiResponse,
      GetEssStatusLatestAllApiArg
    >({
      query: () => ({ url: `/ess-status/latest/all` }),
    }),
    getEssStatusFind: build.query<
      GetEssStatusFindApiResponse,
      GetEssStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/ess-status/find`,
        params: {
          deviceId: queryArg.deviceId,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getEventLoggerFind: build.query<
      GetEventLoggerFindApiResponse,
      GetEventLoggerFindApiArg
    >({
      query: (queryArg) => ({
        url: `/event-logger/find`,
        params: { beginDate: queryArg.beginDate, endDate: queryArg.endDate },
      }),
    }),
    getEventLoggerErrors: build.query<
      GetEventLoggerErrorsApiResponse,
      GetEventLoggerErrorsApiArg
    >({
      query: (queryArg) => ({
        url: `/event-logger/errors`,
        params: {
          beginDate: queryArg.beginDate,
          endDate: queryArg.endDate,
          limit: queryArg.limit,
        },
      }),
    }),
    getJasperReportGetJasperReports: build.query<
      GetJasperReportGetJasperReportsApiResponse,
      GetJasperReportGetJasperReportsApiArg
    >({
      query: () => ({ url: `/jasper-report/getJasperReports` }),
    }),
    getSystemMetrics: build.query<
      GetSystemMetricsApiResponse,
      GetSystemMetricsApiArg
    >({
      query: () => ({ url: `/system-metrics` }),
    }),
    postSystemMetricsRemoveBySource: build.mutation<
      PostSystemMetricsRemoveBySourceApiResponse,
      PostSystemMetricsRemoveBySourceApiArg
    >({
      query: (queryArg) => ({
        url: `/system-metrics/remove/${queryArg.source}`,
        method: 'POST',
      }),
    }),
    getPavementConditionStatusActive: build.query<
      GetPavementConditionStatusActiveApiResponse,
      GetPavementConditionStatusActiveApiArg
    >({
      query: () => ({ url: `/pavement-condition-status/active` }),
    }),
    getPavementConditionStatusFind: build.query<
      GetPavementConditionStatusFindApiResponse,
      GetPavementConditionStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/find`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
    getRsuStatusFind: build.query<
      GetRsuStatusFindApiResponse,
      GetRsuStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/rsu-status/find`,
        params: {
          deviceIds: queryArg.deviceIds,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getTimStatusFindActive: build.query<
      GetTimStatusFindActiveApiResponse,
      GetTimStatusFindActiveApiArg
    >({
      query: () => ({ url: `/tim-status/find-active` }),
    }),
    getTimStatusFind: build.query<
      GetTimStatusFindApiResponse,
      GetTimStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/tim-status/find`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: (queryArg) => ({
        url: `/users`,
        params: { usernames: queryArg.usernames, locked: queryArg.locked },
      }),
    }),
    getWeatherResponsiveConfigByCorridorId: build.query<
      GetWeatherResponsiveConfigByCorridorIdApiResponse,
      GetWeatherResponsiveConfigByCorridorIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config/${queryArg.corridorId}`,
      }),
    }),
    getWeatherResponsiveConfigByCorridorIdAndConfigId: build.query<
      GetWeatherResponsiveConfigByCorridorIdAndConfigIdApiResponse,
      GetWeatherResponsiveConfigByCorridorIdAndConfigIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config/${queryArg.corridorId}/${queryArg.configId}`,
      }),
    }),
    putWeatherResponsiveConfig: build.mutation<
      PutWeatherResponsiveConfigApiResponse,
      PutWeatherResponsiveConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config`,
        method: 'PUT',
        body: queryArg.weatherResponsiveConfiguration,
      }),
    }),
    postWeatherResponsiveConfig: build.mutation<
      PostWeatherResponsiveConfigApiResponse,
      PostWeatherResponsiveConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config`,
        method: 'POST',
        body: queryArg.weatherResponsiveConfiguration,
      }),
    }),
    deleteWeatherResponsiveConfigByConfigId: build.mutation<
      DeleteWeatherResponsiveConfigByConfigIdApiResponse,
      DeleteWeatherResponsiveConfigByConfigIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config/${queryArg.configId}`,
        method: 'DELETE',
      }),
    }),
    putWeatherResponsiveConfigOrder: build.mutation<
      PutWeatherResponsiveConfigOrderApiResponse,
      PutWeatherResponsiveConfigOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-config/order`,
        method: 'PUT',
        body: queryArg.weatherResponsiveConfigurationOrder,
      }),
    }),
    getWeatherResponsiveEdaptive: build.query<
      GetWeatherResponsiveEdaptiveApiResponse,
      GetWeatherResponsiveEdaptiveApiArg
    >({
      query: () => ({ url: `/weather-responsive-edaptive` }),
    }),
    getWeatherResponsiveEdaptiveByAlgorithmIdAndDate: build.query<
      GetWeatherResponsiveEdaptiveByAlgorithmIdAndDateApiResponse,
      GetWeatherResponsiveEdaptiveByAlgorithmIdAndDateApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-edaptive/${queryArg.algorithmId}/${queryArg.date}`,
        params: {
          severity: queryArg.severity,
          pageIndex: queryArg.pageIndex,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
    getWeatherResponsiveEdaptiveConfigurationsByCorridorId: build.query<
      GetWeatherResponsiveEdaptiveConfigurationsByCorridorIdApiResponse,
      GetWeatherResponsiveEdaptiveConfigurationsByCorridorIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-edaptive/configurations/${queryArg.corridorId}`,
      }),
    }),
    getWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationId:
      build.query<
        GetWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationIdApiResponse,
        GetWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationIdApiArg
      >({
        query: (queryArg) => ({
          url: `/weather-responsive-edaptive/algorithm-for-configuration/${queryArg.configurationId}`,
        }),
      }),
    postWeatherResponsiveEdaptiveStartByConfigurationId: build.mutation<
      PostWeatherResponsiveEdaptiveStartByConfigurationIdApiResponse,
      PostWeatherResponsiveEdaptiveStartByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-edaptive/start/${queryArg.configurationId}`,
        method: 'POST',
      }),
    }),
    postWeatherResponsiveEdaptiveStopByConfigurationId: build.mutation<
      PostWeatherResponsiveEdaptiveStopByConfigurationIdApiResponse,
      PostWeatherResponsiveEdaptiveStopByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-edaptive/stop/${queryArg.configurationId}`,
        method: 'POST',
      }),
    }),
    getWeatherResponsiveGlobalConfig: build.query<
      GetWeatherResponsiveGlobalConfigApiResponse,
      GetWeatherResponsiveGlobalConfigApiArg
    >({
      query: () => ({ url: `/weather-responsive-global-config` }),
    }),
    putWeatherResponsiveGlobalConfig: build.mutation<
      PutWeatherResponsiveGlobalConfigApiResponse,
      PutWeatherResponsiveGlobalConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-global-config`,
        method: 'PUT',
        body: queryArg.weatherResponsiveGlobalConfig,
      }),
    }),
    postWeatherResponsiveGlobalConfig: build.mutation<
      PostWeatherResponsiveGlobalConfigApiResponse,
      PostWeatherResponsiveGlobalConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-global-config`,
        method: 'POST',
        body: queryArg.weatherResponsiveGlobalConfig,
      }),
    }),
    deleteWeatherResponsiveGlobalConfig: build.mutation<
      DeleteWeatherResponsiveGlobalConfigApiResponse,
      DeleteWeatherResponsiveGlobalConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-global-config`,
        method: 'DELETE',
        body: queryArg.weatherResponsiveGlobalConfig,
      }),
    }),
    getAll: build.query<GetAllApiResponse, GetAllApiArg>({
      query: () => ({ url: `/weather-responsive-speed` }),
    }),
    getOne: build.query<GetOneApiResponse, GetOneApiArg>({
      query: (queryArg) => ({
        url: `/weather-responsive-speed/${queryArg.corridorId}`,
        params: { date: queryArg.date },
      }),
    }),
    postWeatherResponsiveSpeedByCorridorId: build.mutation<
      PostWeatherResponsiveSpeedByCorridorIdApiResponse,
      PostWeatherResponsiveSpeedByCorridorIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-speed/${queryArg.corridorId}`,
        method: 'POST',
        params: {
          speedAdjustment: queryArg.speedAdjustment,
          speedType: queryArg.speedType,
        },
      }),
    }),
    deleteWeatherResponsiveSpeedByCorridorId: build.mutation<
      DeleteWeatherResponsiveSpeedByCorridorIdApiResponse,
      DeleteWeatherResponsiveSpeedByCorridorIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-speed/${queryArg.corridorId}`,
        method: 'DELETE',
      }),
    }),
    getWeatherResponsiveStatusFind: build.query<
      GetWeatherResponsiveStatusFindApiResponse,
      GetWeatherResponsiveStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-status/find`,
        params: {
          corridorIds: queryArg.corridorIds,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getWeatherResponsiveStatusLatestAll: build.query<
      GetWeatherResponsiveStatusLatestAllApiResponse,
      GetWeatherResponsiveStatusLatestAllApiArg
    >({
      query: () => ({ url: `/weather-responsive-status/latest/all` }),
    }),
    getWeatherResponsiveStatusFusion: build.query<
      GetWeatherResponsiveStatusFusionApiResponse,
      GetWeatherResponsiveStatusFusionApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-status/fusion`,
        params: {
          corridorIds: queryArg.corridorIds,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    postWeatherResponsiveTimingPlansSetTimingPlanByCorridorId: build.mutation<
      PostWeatherResponsiveTimingPlansSetTimingPlanByCorridorIdApiResponse,
      PostWeatherResponsiveTimingPlansSetTimingPlanByCorridorIdApiArg
    >({
      query: (queryArg) => ({
        url: `/weather-responsive-timing-plans/set-timing-plan/${queryArg.corridorId}`,
        method: 'POST',
        params: {
          timingPlan: queryArg.timingPlan,
          logicFlag: queryArg.logicFlag,
          logicFlagState: queryArg.logicFlagState,
        },
      }),
    }),
    getWrongWayDriverStatusFind: build.query<
      GetWrongWayDriverStatusFindApiResponse,
      GetWrongWayDriverStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/wrong-way-driver-status/find`,
        params: { startDate: queryArg.startDate, endDate: queryArg.endDate },
      }),
    }),
    getWrongWayDriverStatusActive: build.query<
      GetWrongWayDriverStatusActiveApiResponse,
      GetWrongWayDriverStatusActiveApiArg
    >({
      query: () => ({ url: `/wrong-way-driver-status/active` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiReports };
export type GetAuditReportFindApiResponse =
  /** status 200 Returns a list of audit report entries */ AuditReportDto[];
export type GetAuditReportFindApiArg = {
  /** Required start date */
  startDate: string;
  /** Optional end date */
  endDate?: string;
  /** Optional event types */
  eventTypes?: string[];
  /** Optional usernames */
  usernames?: string[];
  /** Optional details */
  details?: boolean;
};
export type GetAuditReportGetAuditEventTypesApiResponse =
  /** status 200 Returns a set of supported audit event types */ {
    [key: string]: AuditEventTypeModel;
  };
export type GetAuditReportGetAuditEventTypesApiArg = void;
export type GetConnectedVehicleStatusFindApiResponse =
  /** status 200 Returns a list of connected vehicle log messages matching the given query parameters */ ConnectedVehicleMessageDocument[];
export type GetConnectedVehicleStatusFindApiArg = {
  /** Required start date */
  startDate: string;
  /** Optional end date */
  endDate?: string;
};
export type GetConnectedVehicleStatusGetTotalsByMessageTypeApiResponse =
  /** status 200 Returns a list of connected vehicle log entries grouped by the type */ ConnectedVehicleMessageTypeCountAndSize[];
export type GetConnectedVehicleStatusGetTotalsByMessageTypeApiArg = void;
export type GetConnectedVehicleStatusGetTotalsByRepositoryTypeApiResponse =
  /** status 200 Returns a list of connected vehicle log entries grouped by the type */ ConnectedVehicleRepositoryTypeCountAndSize[];
export type GetConnectedVehicleStatusGetTotalsByRepositoryTypeApiArg = void;
export type GetConnectedVehicleStatusGetLastHourTotalsByMessageTypeApiResponse =
  /** status 200 Returns a list of connected vehicle log entries totals grouped by the type */ ConnectedVehicleMessageCount[];
export type GetConnectedVehicleStatusGetLastHourTotalsByMessageTypeApiArg =
  void;
export type GetConnectedVehicleStatusGetTotalMessageCountApiResponse =
  /** status 200 Returns a count of all the messages in the connected vehicle log */ number;
export type GetConnectedVehicleStatusGetTotalMessageCountApiArg = void;
export type GetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeApiResponse =
  /** status 200 Returns a list of connected vehicle log intersection message totals by the type */ ConnectedVehicleIntersectionTypeCountAndSize[];
export type GetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeApiArg =
  void;
export type GetEssStatusLatestApiResponse =
  /** status 200 Returns the latest environmental status entry for the given device ID */ EssStatusDto;
export type GetEssStatusLatestApiArg = {
  /** A device ID */
  deviceId: string;
};
export type GetEssStatusLatestAllApiResponse =
  /** status 200 Returns a list of the latest environmental sensor statuses for all devices */ EssStatusDto[];
export type GetEssStatusLatestAllApiArg = void;
export type GetEssStatusFindApiResponse =
  /** status 200 Returns a list of ESS status entries matching the given query parameters */ EssStatusDto[];
export type GetEssStatusFindApiArg = {
  /** Optional device ID to filter on */
  deviceId?: string[];
  /** Required start date */
  startDate: string;
  /** Optional end date */
  endDate?: string;
};
export type GetEventLoggerFindApiResponse =
  /** status 200 Success */ EventLogDto[];
export type GetEventLoggerFindApiArg = {
  beginDate?: string;
  endDate?: string;
};
export type GetEventLoggerErrorsApiResponse =
  /** status 200 Success */ EventLogDto[];
export type GetEventLoggerErrorsApiArg = {
  beginDate?: string;
  endDate?: string;
  limit?: number;
};
export type GetJasperReportGetJasperReportsApiResponse =
  /** status 200 Returns a list of Jasper reports */ JasperReportModel[];
export type GetJasperReportGetJasperReportsApiArg = void;
export type GetSystemMetricsApiResponse =
  /** status 200 Success */ MetricSummaryDto[];
export type GetSystemMetricsApiArg = void;
export type PostSystemMetricsRemoveBySourceApiResponse = unknown;
export type PostSystemMetricsRemoveBySourceApiArg = {
  source: string;
};
export type GetPavementConditionStatusActiveApiResponse =
  /** status 200 Returns a list of pavement condition status entries matching the given query parameters */ PavementConditionStatusMessageDocument[];
export type GetPavementConditionStatusActiveApiArg = void;
export type GetPavementConditionStatusFindApiResponse =
  /** status 200 Returns a list of pavement condition status entries matching the given query parameters */ PavementConditionStatusMessageDocument[];
export type GetPavementConditionStatusFindApiArg = {
  /** Required start date */
  startDate: string;
  /** Optional end date */
  endDate?: string;
};
export type GetRsuStatusFindApiResponse =
  /** status 200 Success */ RsuStatusDto[];
export type GetRsuStatusFindApiArg = {
  deviceIds?: string[];
  startDate: string;
  endDate?: string;
};
export type GetTimStatusFindActiveApiResponse =
  /** status 200 Returns a list of active TIM entries */ TimDocument[];
export type GetTimStatusFindActiveApiArg = void;
export type GetTimStatusFindApiResponse =
  /** status 200 Returns a list of TIM entries matching the given query parameters */ TimDocumentDto[];
export type GetTimStatusFindApiArg = {
  startDate: string;
  endDate?: string;
};
export type GetUsersApiResponse =
  /** status 200 Returns a list of locked users */ UserDto[];
export type GetUsersApiArg = {
  /** Optional usernames */
  usernames?: string[];
  /** Optional filter for locked or unlocked users */
  locked?: boolean;
};
export type GetWeatherResponsiveConfigByCorridorIdApiResponse =
  /** status 200 Success */ WeatherResponsiveConfiguration[];
export type GetWeatherResponsiveConfigByCorridorIdApiArg = {
  corridorId: string;
};
export type GetWeatherResponsiveConfigByCorridorIdAndConfigIdApiResponse =
  /** status 200 Success */ WeatherResponsiveConfiguration;
export type GetWeatherResponsiveConfigByCorridorIdAndConfigIdApiArg = {
  corridorId: string;
  configId: string;
};
export type PutWeatherResponsiveConfigApiResponse = unknown;
export type PutWeatherResponsiveConfigApiArg = {
  weatherResponsiveConfiguration: WeatherResponsiveConfiguration;
};
export type PostWeatherResponsiveConfigApiResponse = unknown;
export type PostWeatherResponsiveConfigApiArg = {
  weatherResponsiveConfiguration: WeatherResponsiveConfiguration;
};
export type DeleteWeatherResponsiveConfigByConfigIdApiResponse = unknown;
export type DeleteWeatherResponsiveConfigByConfigIdApiArg = {
  configId: string;
};
export type PutWeatherResponsiveConfigOrderApiResponse = unknown;
export type PutWeatherResponsiveConfigOrderApiArg = {
  weatherResponsiveConfigurationOrder: WeatherResponsiveConfigurationOrder;
};
export type GetWeatherResponsiveEdaptiveApiResponse =
  /** status 200 Success */ AlgorithmResultsSummaryModel[];
export type GetWeatherResponsiveEdaptiveApiArg = void;
export type GetWeatherResponsiveEdaptiveByAlgorithmIdAndDateApiResponse =
  /** status 200 Success */ AlgorithmResultsModel;
export type GetWeatherResponsiveEdaptiveByAlgorithmIdAndDateApiArg = {
  algorithmId: number;
  date: string;
  severity?: number;
  pageIndex?: number;
  pageSize?: number;
};
export type GetWeatherResponsiveEdaptiveConfigurationsByCorridorIdApiResponse =
  /** status 200 Success */ AlgorithmConfigurationSlimModel[];
export type GetWeatherResponsiveEdaptiveConfigurationsByCorridorIdApiArg = {
  corridorId: string;
};
export type GetWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationIdApiResponse =
  /** status 200 Success */ AlgorithmConfigurationSlimModel[];
export type GetWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationIdApiArg =
  {
    configurationId: number;
  };
export type PostWeatherResponsiveEdaptiveStartByConfigurationIdApiResponse =
  unknown;
export type PostWeatherResponsiveEdaptiveStartByConfigurationIdApiArg = {
  configurationId: number;
};
export type PostWeatherResponsiveEdaptiveStopByConfigurationIdApiResponse =
  unknown;
export type PostWeatherResponsiveEdaptiveStopByConfigurationIdApiArg = {
  configurationId: number;
};
export type GetWeatherResponsiveGlobalConfigApiResponse =
  /** status 200 Success */ WeatherResponsiveGlobalConfig;
export type GetWeatherResponsiveGlobalConfigApiArg = void;
export type PutWeatherResponsiveGlobalConfigApiResponse = unknown;
export type PutWeatherResponsiveGlobalConfigApiArg = {
  weatherResponsiveGlobalConfig: WeatherResponsiveGlobalConfig;
};
export type PostWeatherResponsiveGlobalConfigApiResponse = unknown;
export type PostWeatherResponsiveGlobalConfigApiArg = {
  weatherResponsiveGlobalConfig: WeatherResponsiveGlobalConfig;
};
export type DeleteWeatherResponsiveGlobalConfigApiResponse = unknown;
export type DeleteWeatherResponsiveGlobalConfigApiArg = {
  weatherResponsiveGlobalConfig: WeatherResponsiveGlobalConfig;
};
export type GetAllApiResponse =
  /** status 200 Success */ CorridorSpeedOverride[];
export type GetAllApiArg = void;
export type GetOneApiResponse =
  /** status 200 Success */ CorridorSpeedOverride[];
export type GetOneApiArg = {
  corridorId: string;
  date?: string;
};
export type PostWeatherResponsiveSpeedByCorridorIdApiResponse = unknown;
export type PostWeatherResponsiveSpeedByCorridorIdApiArg = {
  corridorId: number;
  speedAdjustment?: number;
  speedType?: CorridorSpeedOverrideType;
};
export type DeleteWeatherResponsiveSpeedByCorridorIdApiResponse = unknown;
export type DeleteWeatherResponsiveSpeedByCorridorIdApiArg = {
  corridorId: number;
};
export type GetWeatherResponsiveStatusFindApiResponse =
  /** status 200 Success */ WeatherResponsiveResultModel[];
export type GetWeatherResponsiveStatusFindApiArg = {
  corridorIds?: string[];
  startDate: string;
  endDate?: string;
};
export type GetWeatherResponsiveStatusLatestAllApiResponse =
  /** status 200 Success */ WeatherResponsiveResultModel[];
export type GetWeatherResponsiveStatusLatestAllApiArg = void;
export type GetWeatherResponsiveStatusFusionApiResponse =
  /** status 200 Success */ WeatherFusionResultModel[];
export type GetWeatherResponsiveStatusFusionApiArg = {
  corridorIds?: string[];
  startDate: string;
  endDate?: string;
};
export type PostWeatherResponsiveTimingPlansSetTimingPlanByCorridorIdApiResponse =
  unknown;
export type PostWeatherResponsiveTimingPlansSetTimingPlanByCorridorIdApiArg = {
  corridorId: string;
  timingPlan?: number;
  logicFlag?: number;
  logicFlagState?: number;
};
export type GetWrongWayDriverStatusFindApiResponse =
  /** status 200 Returns a list of wrong way driver incidents matching the given query parameters */ WrongWayDriversStatusDto[];
export type GetWrongWayDriverStatusFindApiArg = {
  /** Required start date */
  startDate: string;
  /** Optional end date */
  endDate?: string;
};
export type GetWrongWayDriverStatusActiveApiResponse =
  /** status 200 Returns a list of wrong way driver status entries matching the given query parameters */ WrongWayDriverStatusMessageDocument[];
export type GetWrongWayDriverStatusActiveApiArg = void;
export type AuditReportDto = {
  eventType?: string | null;
  startDate?: string;
  endDate?: string;
  username?: string | null;
  details?: string | null;
};
export type AuditEventTypeModel = {
  group?: string | null;
  name?: string | null;
  event?: string | null;
};
export type ConnectedVehicleMessageTypeEnum = 'SPAT' | 'BSM' | 'SRM' | 'TIM';
export type ConnectedVehicleMetaField = {
  timeStamp?: string;
  type?: ConnectedVehicleMessageTypeEnum;
  logEntryByteSize?: number;
};
export type ConnectedVehicleMessageDocument = {
  timeStamp?: string;
  metaData?: ConnectedVehicleMetaField;
  logEntry?: any | null;
};
export type ConnectedVehicleMessageTypeCountAndSize = {
  messageCount?: number;
  byteSize?: number;
  size?: string | null;
  type?: ConnectedVehicleMessageTypeEnum;
};
export type ConnectedVehicleRepositoryTypeEnum = 'Working' | 'Archive';
export type ConnectedVehicleRepositoryTypeCountAndSize = {
  messageCount?: number;
  byteSize?: number;
  size?: string | null;
  type?: ConnectedVehicleRepositoryTypeEnum;
};
export type ConnectedVehicleMessageCount = {
  messageCount?: number;
};
export type ConnectedVehicleIntersectionTypeCountAndSize = {
  messageCount?: number;
  byteSize?: number;
  size?: string | null;
  type?: ConnectedVehicleMessageTypeEnum;
  signalId?: string;
  signalName?: string | null;
  intersectionId?: string | null;
  intersectionRegion?: string | null;
  intersectionName?: string | null;
};
export type EssPrecipYesNoEnum = 'Precip' | 'NoPrecip' | 'Error';
export type EssPrecipSituationEnum =
  | 'Other'
  | 'Unknown'
  | 'NoPrecipitation'
  | 'UnidentifiedSlight'
  | 'UnidentifiedModerate'
  | 'UnidentifiedHeavy'
  | 'SnowSlight'
  | 'SnowModerate'
  | 'SnowHeavy'
  | 'RainSlight'
  | 'RainModerate'
  | 'RainHeavy'
  | 'FrozenPrecipitationSlight'
  | 'FrozenPrecipitationModerate'
  | 'FrozenPrecipitationHeavy';
export type EssVisibilitySituationEnum =
  | 'Other'
  | 'Unknown'
  | 'Clear'
  | 'FogNotPatchy'
  | 'PatchyFog'
  | 'BlowingSnow'
  | 'Smoke'
  | 'SeaSpray'
  | 'VehicleSpray'
  | 'BlowingDustOrSand'
  | 'SunGlare'
  | 'SwarmsOfInsects';
export type EssCloudSituationEnum =
  | 'Overcast'
  | 'Cloudy'
  | 'PartlyCloudy'
  | 'MostlyClear'
  | 'Clear';
export type EssStatusDto = {
  deviceId?: string;
  timeStamp?: string;
  wetBulbTemp?: number;
  dewPointTemp?: number;
  maxTemp?: number;
  minTemp?: number;
  adjacentSnowDepth?: number;
  roadwaySnowDepth?: number;
  roadwaySnowPackDepth?: number;
  precipYesNo?: EssPrecipYesNoEnum;
  precipRate?: number;
  snowfallAccumRate?: number;
  precipSituation?: EssPrecipSituationEnum;
  iceThickness?: number;
  precipitationStartTime?: string;
  precipitationEndTime?: string;
  visibility?: number;
  visibilitySituation?: EssVisibilitySituationEnum;
  totalSun?: number;
  instantaneousTerrestrialRadiation?: number;
  instantaneousSolarRadiation?: number;
  totalRadiation?: number;
  totalRadiationPeriod?: number;
  cloudSituation?: EssCloudSituationEnum;
  relativeHumidity?: number;
  atmosphericPressure?: number;
  latitude?: number | null;
  longitude?: number | null;
  name?: string | null;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type LogName = 'LogNameUnknown' | 'SystemEvent' | 'Audit';
export type EventLevel =
  | 'EventLevelUnknown'
  | 'Debug'
  | 'Information'
  | 'Warning'
  | 'Error'
  | 'Critical';
export type Category = 'CategoryUnknown' | 'Server' | 'Operational' | 'User';
export type EventLogDto = {
  id?: string;
  timestamp?: string;
  name?: LogName;
  source?: string | null;
  tenantId?: string | null;
  level?: EventLevel;
  category?: Category;
  computer?: string | null;
  details?: string | null;
};
export type JasperReportModel = {
  label?: string | null;
  uri?: string | null;
};
export type MetricDto = {
  name?: string | null;
  value?: number;
  units?: string | null;
};
export type ServiceMetricDto = {
  id?: string | null;
  logged?: string;
  tenantId?: string;
  source?: string | null;
  computer?: string | null;
  instanceHash?: string | null;
  metrics?: MetricDto[] | null;
};
export type MetricSummaryDto = {
  source?: string | null;
  lastUpdated?: string;
  services?: number;
  serviceMetrics?: number;
  metrics?: ServiceMetricDto[] | null;
};
export type PavementConditionStatusSeverity = 'Low' | 'Medium' | 'High';
export type PavementConditionStatusMessageDocument = {
  statusId?: string;
  location?: string | null;
  timeStamp?: string;
  latitude?: number;
  longitude?: number;
  severity?: PavementConditionStatusSeverity;
};
export type RsuStatusDto = {
  id?: string;
  deviceId?: string;
  timeStamp?: string;
  isConnected?: boolean;
  isConfigured?: boolean;
  error?: string | null;
  name?: string | null;
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
export type TimDocumentDto = {
  id?: string;
  batchId?: string;
  deleted?: boolean;
  state?: TimState;
  source?: TimSource;
  signalId?: string;
  creationDate?: string;
  deliveryStart?: string;
  deliveryEnd?: string;
  contents?: any | null;
};
export type UserDto = {
  id?: string;
  createdTimestamp?: string;
  username?: string | null;
  enabled?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  attributes?: {
    [key: string]: string[] | null;
  } | null;
};
export type CorridorSpeedOverrideType = 'ExactDelta' | 'PercentDelta' | 'Exact';
export type WeatherResponsiveConfiguration = {
  id?: string;
  corridorId?: string;
  priority?: number;
  name?: string | null;
  isEnabled?: boolean;
  hasPrecipitation?: boolean;
  temperatureThreshold?: number;
  roadConditions?: number[] | null;
  minimumConfidence?: number;
  enableEdaptive?: boolean;
  edaptiveConfigurationId?: number | null;
  adjustSpeed?: boolean;
  speedAdjustment?: number | null;
  speedOverrideType?: CorridorSpeedOverrideType;
  adjustTimingPlan?: boolean;
  timingPlan?: number | null;
};
export type WeatherResponsiveConfigurationOrder = {
  corridorId?: string;
  configurationOrder?: string[] | null;
};
export type AlgorithmResultsSummaryModel = {
  algorithmId?: number;
  algorithmName?: string | null;
  state?: string | null;
  lastRunTime?: string | null;
  lastResult?: string | null;
  isScheduled?: boolean;
  isEnabled?: boolean;
};
export type AlgorithmConfigurationSlimModel = {
  algorithmId?: number;
  id?: number;
  name?: string | null;
  mode?: number;
  optimizeOffset?: boolean;
  optimizeCycleLength?: boolean;
  optimizeSplits?: boolean;
  optimizePhaseSequence?: boolean;
  dataAffinity?: number;
  cyclesToOptimize?: number;
  cycleAndOffsetPeriod?: number;
  sideStreetMaxSplitIncrease?: number;
  sideStreetMaxSplitDecrease?: number;
  coordPhaseMaxSplitIncrease?: number;
  coordPhaseMaxSplitDecrease?: number;
  minimumSplitBufferSeconds?: number;
  cycleLengthLowerVolumeCapacityThreshold?: number;
  cycleLengthUpperVolumeCapacityThreshold?: number;
  minCycleLength?: number;
  maxCycleLength?: number;
  cycleLengthDecreaseDelta?: number;
  cycleLengthIncreaseDelta?: number;
};
export type CorridorOverrideType =
  | 'Schedule'
  | 'VolumeCapacity'
  | 'MachineLearning';
export type AlgorithmSignalModel = {
  id?: number;
  name?: string | null;
  index?: number;
  corridorOverride?: number;
  signalLocatedAtEnd?: boolean;
  overrideType?: CorridorOverrideType;
};
export type AlgorithmCorridorModel = {
  corridorName?: string | null;
  corridorId?: number;
  index?: number;
  isSelected?: boolean;
  splitLockGroup?: number;
  signals?: AlgorithmSignalModel[] | null;
};
export type AlgorithmPatternRingModel = {
  ring?: number;
  phase?: number;
  phaseSequence?: number;
  isCoordinated?: boolean;
  split?: number;
  yellow?: number;
  redClear?: number;
  walk?: number;
  pedClear?: number;
  minGreen?: number;
  maxGreen?: number;
  barrierGroup?: number;
};
export type AlgorithmResultIntersectionModel = {
  signalId?: number;
  name?: string | null;
  pattern?: number;
  cycleLengthBefore?: number;
  cycleLengthPredicted?: number;
  offsetBefore?: number;
  offsetPredicted?: number;
  offsetRefMode?: number;
  upstreamVolumeCapacityRatio?: number;
  downstreamVolumeCapacityRatio?: number;
  ringsBefore?: AlgorithmPatternRingModel[] | null;
  ringsAfter?: AlgorithmPatternRingModel[] | null;
  commandedPattern?: string | null;
  corridorOverride?: number | null;
};
export type AlgorithmResultModel = {
  id?: number;
  algorithmConfigurationId?: number;
  startTime?: string;
  endTime?: string | null;
  success?: boolean;
  rollback?: boolean;
  mode?: number;
  message?: string | null;
  messageSeverity?: string | null;
  basePattern?: number;
  averageVolumeCapacityRatio?: number;
  intersections?: AlgorithmResultIntersectionModel[] | null;
};
export type AlgorithmResultHeaderModel = {
  analysisStart?: string;
  analysisEnd?: string;
  basePattern?: number;
  mode?: number;
  messageSeverity?: string | null;
};
export type CorridorSpeedOverride = {
  corridorId?: number;
  startTime?: string;
  speedAdjustment?: number;
  speedOverrideType?: CorridorSpeedOverrideType;
};
export type AlgorithmResultsModel = {
  algorithmName?: string | null;
  totalCount?: number;
  configuration?: AlgorithmConfigurationSlimModel;
  corridors?: AlgorithmCorridorModel[] | null;
  results?: AlgorithmResultModel[] | null;
  header?: AlgorithmResultHeaderModel;
  corridorSpeedOverrides?: CorridorSpeedOverride[] | null;
};
export type TimingPlanLogicFlagState = {
  timingPlan?: number;
  logicFlag?: number;
  logicFlagState?: number;
};
export type WeatherResponsiveGlobalConfig = {
  id?: string;
  timingPlanLogicFlagStates?: TimingPlanLogicFlagState[] | null;
};
export type EnumRoadCondition =
  | 'Unknown'
  | 'Dry'
  | 'Damp'
  | 'ChemicallyDamp'
  | 'Wet'
  | 'ChemicallyWet'
  | 'CriticallyWet'
  | 'FrostOrRime'
  | 'Snow'
  | 'SnowOrIce'
  | 'Ice'
  | 'Error';
export type WeatherResponsiveResultModel = {
  id?: string;
  corridorId?: string;
  corridorName?: string | null;
  timestamp?: string;
  ranEdaptive?: boolean;
  changedSpeed?: boolean;
  changedTimingPlan?: boolean;
  edaptiveConfigurationName?: string | null;
  speedAdjustment?: number | null;
  speedOverrideType?: CorridorSpeedOverrideType;
  timingPlan?: number | null;
  errors?: string | null;
  confidence?: number;
  precipitation?: boolean;
  temperature?: number;
  roadCondition?: EnumRoadCondition;
};
export type WeatherFusionResultModel = {
  id?: string;
  corridorId?: string;
  corridorName?: string | null;
  timestamp?: string;
  confidence?: number;
  precipitation?: boolean;
  temperature?: number;
  roadCondition?: EnumRoadCondition;
};
export type WrongWayDriversStatusDto = {
  timeStamp?: string;
  longitude?: number;
  latitude?: number;
  location?: string | null;
  isActive?: boolean;
};
export type WrongWayDriverStatusMessageDocument = {
  timeStamp?: string;
  latitude?: number;
  longitude?: number;
  location?: string | null;
};
export const {
  useGetAuditReportFindQuery,
  useGetAuditReportGetAuditEventTypesQuery,
  useGetConnectedVehicleStatusFindQuery,
  useGetConnectedVehicleStatusGetTotalsByMessageTypeQuery,
  useGetConnectedVehicleStatusGetTotalsByRepositoryTypeQuery,
  useGetConnectedVehicleStatusGetLastHourTotalsByMessageTypeQuery,
  useGetConnectedVehicleStatusGetTotalMessageCountQuery,
  useGetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeQuery,
  useGetEssStatusLatestQuery,
  useGetEssStatusLatestAllQuery,
  useGetEssStatusFindQuery,
  useGetEventLoggerFindQuery,
  useGetEventLoggerErrorsQuery,
  useGetJasperReportGetJasperReportsQuery,
  useGetSystemMetricsQuery,
  usePostSystemMetricsRemoveBySourceMutation,
  useGetPavementConditionStatusActiveQuery,
  useGetPavementConditionStatusFindQuery,
  useGetRsuStatusFindQuery,
  useGetTimStatusFindActiveQuery,
  useGetTimStatusFindQuery,
  useGetUsersQuery,
  useGetWeatherResponsiveConfigByCorridorIdQuery,
  useGetWeatherResponsiveConfigByCorridorIdAndConfigIdQuery,
  usePutWeatherResponsiveConfigMutation,
  usePostWeatherResponsiveConfigMutation,
  useDeleteWeatherResponsiveConfigByConfigIdMutation,
  usePutWeatherResponsiveConfigOrderMutation,
  useGetWeatherResponsiveEdaptiveQuery,
  useGetWeatherResponsiveEdaptiveByAlgorithmIdAndDateQuery,
  useGetWeatherResponsiveEdaptiveConfigurationsByCorridorIdQuery,
  useGetWeatherResponsiveEdaptiveAlgorithmForConfigurationByConfigurationIdQuery,
  usePostWeatherResponsiveEdaptiveStartByConfigurationIdMutation,
  usePostWeatherResponsiveEdaptiveStopByConfigurationIdMutation,
  useGetWeatherResponsiveGlobalConfigQuery,
  usePutWeatherResponsiveGlobalConfigMutation,
  usePostWeatherResponsiveGlobalConfigMutation,
  useDeleteWeatherResponsiveGlobalConfigMutation,
  useGetAllQuery,
  useGetOneQuery,
  usePostWeatherResponsiveSpeedByCorridorIdMutation,
  useDeleteWeatherResponsiveSpeedByCorridorIdMutation,
  useGetWeatherResponsiveStatusFindQuery,
  useGetWeatherResponsiveStatusLatestAllQuery,
  useGetWeatherResponsiveStatusFusionQuery,
  usePostWeatherResponsiveTimingPlansSetTimingPlanByCorridorIdMutation,
  useGetWrongWayDriverStatusFindQuery,
  useGetWrongWayDriverStatusActiveQuery,
} = injectedRtkApi;
