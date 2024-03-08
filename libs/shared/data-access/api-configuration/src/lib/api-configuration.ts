// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiConfiguration';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getActionSet: build.query<GetActionSetApiResponse, GetActionSetApiArg>({
      query: () => ({ url: `/action-set` }),
    }),
    postActionSet: build.mutation<
      PostActionSetApiResponse,
      PostActionSetApiArg
    >({
      query: (queryArg) => ({
        url: `/action-set`,
        method: 'POST',
        body: queryArg.actionSet,
      }),
    }),
    putActionSet: build.mutation<PutActionSetApiResponse, PutActionSetApiArg>({
      query: (queryArg) => ({
        url: `/action-set`,
        method: 'PUT',
        body: queryArg.actionSet,
      }),
    }),
    getActionSetById: build.query<
      GetActionSetByIdApiResponse,
      GetActionSetByIdApiArg
    >({
      query: (queryArg) => ({ url: `/action-set/${queryArg.id}` }),
    }),
    deleteActionSetById: build.mutation<
      DeleteActionSetByIdApiResponse,
      DeleteActionSetByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/action-set/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getActionSetEntityByTypeAndId: build.query<
      GetActionSetEntityByTypeAndIdApiResponse,
      GetActionSetEntityByTypeAndIdApiArg
    >({
      query: (queryArg) => ({
        url: `/action-set/entity/${queryArg['type']}/${queryArg.id}`,
      }),
    }),
    getAcyclica: build.query<GetAcyclicaApiResponse, GetAcyclicaApiArg>({
      query: () => ({ url: `/acyclica` }),
    }),
    postAcyclica: build.mutation<PostAcyclicaApiResponse, PostAcyclicaApiArg>({
      query: (queryArg) => ({
        url: `/acyclica`,
        method: 'POST',
        body: queryArg.acyclicaConfigDto,
      }),
    }),
    putAcyclica: build.mutation<PutAcyclicaApiResponse, PutAcyclicaApiArg>({
      query: (queryArg) => ({
        url: `/acyclica`,
        method: 'PUT',
        body: queryArg.acyclicaConfigDto,
      }),
    }),
    deleteAcyclica: build.mutation<
      DeleteAcyclicaApiResponse,
      DeleteAcyclicaApiArg
    >({
      query: (queryArg) => ({
        url: `/acyclica`,
        method: 'DELETE',
        body: queryArg.acyclicaConfigDto,
      }),
    }),
    getConnectedVehicle: build.query<
      GetConnectedVehicleApiResponse,
      GetConnectedVehicleApiArg
    >({
      query: () => ({ url: `/connected-vehicle` }),
    }),
    postConnectedVehicle: build.mutation<
      PostConnectedVehicleApiResponse,
      PostConnectedVehicleApiArg
    >({
      query: (queryArg) => ({
        url: `/connected-vehicle`,
        method: 'POST',
        body: queryArg.connectedVehicleConfigAdd,
      }),
    }),
    putConnectedVehicle: build.mutation<
      PutConnectedVehicleApiResponse,
      PutConnectedVehicleApiArg
    >({
      query: (queryArg) => ({
        url: `/connected-vehicle`,
        method: 'PUT',
        body: queryArg.connectedVehicleConfigUpdate,
      }),
    }),
    deleteConnectedVehicleById: build.mutation<
      DeleteConnectedVehicleByIdApiResponse,
      DeleteConnectedVehicleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/connected-vehicle/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getDeviceManagers: build.query<
      GetDeviceManagersApiResponse,
      GetDeviceManagersApiArg
    >({
      query: () => ({ url: `/device-managers` }),
    }),
    postDeviceManagers: build.mutation<
      PostDeviceManagersApiResponse,
      PostDeviceManagersApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers`,
        method: 'POST',
        body: queryArg.dmConfigAdd,
      }),
    }),
    putDeviceManagers: build.mutation<
      PutDeviceManagersApiResponse,
      PutDeviceManagersApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers`,
        method: 'PUT',
        body: queryArg.dmConfigUpdate,
      }),
    }),
    getDeviceManagersById: build.query<
      GetDeviceManagersByIdApiResponse,
      GetDeviceManagersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/device-managers/${queryArg.id}` }),
    }),
    deleteDeviceManagersById: build.mutation<
      DeleteDeviceManagersByIdApiResponse,
      DeleteDeviceManagersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postDeviceManagersByIdChannel: build.mutation<
      PostDeviceManagersByIdChannelApiResponse,
      PostDeviceManagersByIdChannelApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers/${queryArg.id}/channel`,
        method: 'POST',
        body: queryArg.channelAdd,
      }),
    }),
    putDeviceManagersByIdChannel: build.mutation<
      PutDeviceManagersByIdChannelApiResponse,
      PutDeviceManagersByIdChannelApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers/${queryArg.id}/channel`,
        method: 'PUT',
        body: queryArg.channelUpdate,
      }),
    }),
    deleteDeviceManagersByIdChannelAndChId: build.mutation<
      DeleteDeviceManagersByIdChannelAndChIdApiResponse,
      DeleteDeviceManagersByIdChannelAndChIdApiArg
    >({
      query: (queryArg) => ({
        url: `/device-managers/${queryArg.id}/channel/${queryArg.chId}`,
        method: 'DELETE',
      }),
    }),
    getEntitiesTypes: build.query<
      GetEntitiesTypesApiResponse,
      GetEntitiesTypesApiArg
    >({
      query: () => ({ url: `/entities/types` }),
    }),
    getEntitiesAll: build.query<
      GetEntitiesAllApiResponse,
      GetEntitiesAllApiArg
    >({
      query: () => ({ url: `/entities/all` }),
    }),
    getEntities: build.query<GetEntitiesApiResponse, GetEntitiesApiArg>({
      query: (queryArg) => ({
        url: `/entities`,
        params: { ids: queryArg.ids },
      }),
    }),
    postEntities: build.mutation<PostEntitiesApiResponse, PostEntitiesApiArg>({
      query: (queryArg) => ({
        url: `/entities`,
        method: 'POST',
        body: queryArg.entityNode,
      }),
    }),
    putEntities: build.mutation<PutEntitiesApiResponse, PutEntitiesApiArg>({
      query: (queryArg) => ({
        url: `/entities`,
        method: 'PUT',
        body: queryArg.entityNode,
      }),
    }),
    getEntitiesById: build.query<
      GetEntitiesByIdApiResponse,
      GetEntitiesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/entities/${queryArg.id}` }),
    }),
    deleteEntitiesById: build.mutation<
      DeleteEntitiesByIdApiResponse,
      DeleteEntitiesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEntitiesTypesByType: build.query<
      GetEntitiesTypesByTypeApiResponse,
      GetEntitiesTypesByTypeApiArg
    >({
      query: (queryArg) => ({ url: `/entities/types/${queryArg['type']}` }),
    }),
    getEntitiesIntersectionById: build.query<
      GetEntitiesIntersectionByIdApiResponse,
      GetEntitiesIntersectionByIdApiArg
    >({
      query: (queryArg) => ({ url: `/entities/intersection/${queryArg.id}` }),
    }),
    postEntitiesIntersectionsQueryRadiusByMiles: build.mutation<
      PostEntitiesIntersectionsQueryRadiusByMilesApiResponse,
      PostEntitiesIntersectionsQueryRadiusByMilesApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/intersections/query/radius/${queryArg.miles}`,
        method: 'POST',
        body: queryArg.geoJsonPointFeature,
      }),
    }),
    postEntitiesQueryByType: build.mutation<
      PostEntitiesQueryByTypeApiResponse,
      PostEntitiesQueryByTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/query/${queryArg['type']}`,
        method: 'POST',
        body: queryArg.geoJsonLineStringFeature,
      }),
    }),
    postEntitiesQueryGeofence: build.mutation<
      PostEntitiesQueryGeofenceApiResponse,
      PostEntitiesQueryGeofenceApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/query/geofence`,
        method: 'POST',
        body: queryArg.geoJsonPointFeature,
      }),
    }),
    postEntitiesQueryGeofenceByType: build.mutation<
      PostEntitiesQueryGeofenceByTypeApiResponse,
      PostEntitiesQueryGeofenceByTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/query/geofence/${queryArg['type']}`,
        method: 'POST',
        body: queryArg.geoJsonPointFeature,
      }),
    }),
    getEntitiesTypesByTypeParents: build.query<
      GetEntitiesTypesByTypeParentsApiResponse,
      GetEntitiesTypesByTypeParentsApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/types/${queryArg['type']}/parents`,
      }),
    }),
    postEntitiesByParent: build.mutation<
      PostEntitiesByParentApiResponse,
      PostEntitiesByParentApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/${queryArg.parent}`,
        method: 'POST',
        body: queryArg.entityNode,
      }),
    }),
    postEntitiesDownstreamByIntersections: build.mutation<
      PostEntitiesDownstreamByIntersectionsApiResponse,
      PostEntitiesDownstreamByIntersectionsApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/downstream/${queryArg.intersections}`,
        method: 'POST',
        body: queryArg.geoJsonPointFeature,
      }),
    }),
    postEntitiesUpstreamByIntersections: build.mutation<
      PostEntitiesUpstreamByIntersectionsApiResponse,
      PostEntitiesUpstreamByIntersectionsApiArg
    >({
      query: (queryArg) => ({
        url: `/entities/upstream/${queryArg.intersections}`,
        method: 'POST',
        body: queryArg.geoJsonPointFeature,
      }),
    }),
    postEntitiesSync: build.mutation<
      PostEntitiesSyncApiResponse,
      PostEntitiesSyncApiArg
    >({
      query: (queryArg) => ({
        url: `/entities-sync`,
        method: 'POST',
        body: queryArg.entitySync,
      }),
    }),
    getEntityTypeSections: build.query<
      GetEntityTypeSectionsApiResponse,
      GetEntityTypeSectionsApiArg
    >({
      query: () => ({ url: `/entity-type/sections` }),
    }),
    getEntityType: build.query<GetEntityTypeApiResponse, GetEntityTypeApiArg>({
      query: () => ({ url: `/entity-type` }),
    }),
    postEntityType: build.mutation<
      PostEntityTypeApiResponse,
      PostEntityTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/entity-type`,
        method: 'POST',
        body: queryArg.entityTypeAdd,
      }),
    }),
    putEntityType: build.mutation<
      PutEntityTypeApiResponse,
      PutEntityTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/entity-type`,
        method: 'PUT',
        body: queryArg.entityType,
      }),
    }),
    getEntityTypeById: build.query<
      GetEntityTypeByIdApiResponse,
      GetEntityTypeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/entity-type/${queryArg.id}` }),
    }),
    deleteEntityTypeById: build.mutation<
      DeleteEntityTypeByIdApiResponse,
      DeleteEntityTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/entity-type/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getPavementCondition: build.query<
      GetPavementConditionApiResponse,
      GetPavementConditionApiArg
    >({
      query: () => ({ url: `/pavement-condition` }),
    }),
    postPavementCondition: build.mutation<
      PostPavementConditionApiResponse,
      PostPavementConditionApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition`,
        method: 'POST',
        body: queryArg.pavementConditionConfigAdd,
      }),
    }),
    putPavementCondition: build.mutation<
      PutPavementConditionApiResponse,
      PutPavementConditionApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition`,
        method: 'PUT',
        body: queryArg.pavementConditionConfigUpdate,
      }),
    }),
    deletePavementConditionById: build.mutation<
      DeletePavementConditionByIdApiResponse,
      DeletePavementConditionByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getPavementConditionStatusFind: build.query<
      GetPavementConditionStatusFindApiResponse,
      GetPavementConditionStatusFindApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/find`,
        params: { active: queryArg.active },
      }),
    }),
    postPavementConditionStatusParse: build.mutation<
      PostPavementConditionStatusParseApiResponse,
      PostPavementConditionStatusParseApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/parse`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    postPavementConditionStatusImport: build.mutation<
      PostPavementConditionStatusImportApiResponse,
      PostPavementConditionStatusImportApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/import`,
        method: 'POST',
        body: queryArg.body,
        params: { filename: queryArg.filename },
      }),
    }),
    putPavementConditionStatusUpdate: build.mutation<
      PutPavementConditionStatusUpdateApiResponse,
      PutPavementConditionStatusUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/update`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    deletePavementConditionStatusDelete: build.mutation<
      DeletePavementConditionStatusDeleteApiResponse,
      DeletePavementConditionStatusDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/pavement-condition-status/delete`,
        method: 'DELETE',
        body: queryArg.body,
      }),
    }),
    getRsu: build.query<GetRsuApiResponse, GetRsuApiArg>({
      query: () => ({ url: `/rsu` }),
    }),
    postRsu: build.mutation<PostRsuApiResponse, PostRsuApiArg>({
      query: (queryArg) => ({
        url: `/rsu`,
        method: 'POST',
        body: queryArg.rsu,
      }),
    }),
    putRsu: build.mutation<PutRsuApiResponse, PutRsuApiArg>({
      query: (queryArg) => ({ url: `/rsu`, method: 'PUT', body: queryArg.rsu }),
    }),
    getRsuById: build.query<GetRsuByIdApiResponse, GetRsuByIdApiArg>({
      query: (queryArg) => ({ url: `/rsu/${queryArg.id}` }),
    }),
    deleteRsuById: build.mutation<
      DeleteRsuByIdApiResponse,
      DeleteRsuByIdApiArg
    >({
      query: (queryArg) => ({ url: `/rsu/${queryArg.id}`, method: 'DELETE' }),
    }),
    getTreeAll: build.query<GetTreeAllApiResponse, GetTreeAllApiArg>({
      query: () => ({ url: `/tree/all` }),
    }),
    getTree: build.query<GetTreeApiResponse, GetTreeApiArg>({
      query: () => ({ url: `/tree` }),
    }),
    postTree: build.mutation<PostTreeApiResponse, PostTreeApiArg>({
      query: (queryArg) => ({
        url: `/tree`,
        method: 'POST',
        body: queryArg.indexRequest,
      }),
    }),
    getTreeSearchByTerm: build.query<
      GetTreeSearchByTermApiResponse,
      GetTreeSearchByTermApiArg
    >({
      query: (queryArg) => ({ url: `/tree/search/${queryArg.term}` }),
    }),
    getTreeByInstanceId: build.query<
      GetTreeByInstanceIdApiResponse,
      GetTreeByInstanceIdApiArg
    >({
      query: (queryArg) => ({ url: `/tree/${queryArg.instanceId}` }),
    }),
    getTreeByInstanceIdChildren: build.query<
      GetTreeByInstanceIdChildrenApiResponse,
      GetTreeByInstanceIdChildrenApiArg
    >({
      query: (queryArg) => ({ url: `/tree/${queryArg.instanceId}/children` }),
    }),
    postTreeChildren: build.mutation<
      PostTreeChildrenApiResponse,
      PostTreeChildrenApiArg
    >({
      query: (queryArg) => ({
        url: `/tree/children`,
        method: 'POST',
        body: queryArg.instanceRequest,
      }),
    }),
    putTreeByInstanceIdMoveToAndParent: build.mutation<
      PutTreeByInstanceIdMoveToAndParentApiResponse,
      PutTreeByInstanceIdMoveToAndParentApiArg
    >({
      query: (queryArg) => ({
        url: `/tree/${queryArg.instanceId}/move-to/${queryArg.parent}`,
        method: 'PUT',
      }),
    }),
    putTreeByInstanceIdCopyToAndParent: build.mutation<
      PutTreeByInstanceIdCopyToAndParentApiResponse,
      PutTreeByInstanceIdCopyToAndParentApiArg
    >({
      query: (queryArg) => ({
        url: `/tree/${queryArg.instanceId}/copy-to/${queryArg.parent}`,
        method: 'PUT',
      }),
    }),
    putTreeByInstanceIdMoveUp: build.mutation<
      PutTreeByInstanceIdMoveUpApiResponse,
      PutTreeByInstanceIdMoveUpApiArg
    >({
      query: (queryArg) => ({
        url: `/tree/${queryArg.instanceId}/move-up`,
        method: 'PUT',
      }),
    }),
    putTreeByInstanceIdMoveDown: build.mutation<
      PutTreeByInstanceIdMoveDownApiResponse,
      PutTreeByInstanceIdMoveDownApiArg
    >({
      query: (queryArg) => ({
        url: `/tree/${queryArg.instanceId}/move-down`,
        method: 'PUT',
      }),
    }),
    getTwilio: build.query<GetTwilioApiResponse, GetTwilioApiArg>({
      query: () => ({ url: `/twilio` }),
    }),
    postTwilio: build.mutation<PostTwilioApiResponse, PostTwilioApiArg>({
      query: (queryArg) => ({
        url: `/twilio`,
        method: 'POST',
        body: queryArg.twilioConfigDto,
      }),
    }),
    putTwilio: build.mutation<PutTwilioApiResponse, PutTwilioApiArg>({
      query: (queryArg) => ({
        url: `/twilio`,
        method: 'PUT',
        body: queryArg.twilioConfigDto,
      }),
    }),
    deleteTwilio: build.mutation<DeleteTwilioApiResponse, DeleteTwilioApiArg>({
      query: (queryArg) => ({
        url: `/twilio`,
        method: 'DELETE',
        body: queryArg.twilioConfigDto,
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
    getWrongWayDriver: build.query<
      GetWrongWayDriverApiResponse,
      GetWrongWayDriverApiArg
    >({
      query: () => ({ url: `/wrong-way-driver` }),
    }),
    postWrongWayDriver: build.mutation<
      PostWrongWayDriverApiResponse,
      PostWrongWayDriverApiArg
    >({
      query: (queryArg) => ({
        url: `/wrong-way-driver`,
        method: 'POST',
        body: queryArg.wrongWayDriverConfigAdd,
      }),
    }),
    putWrongWayDriver: build.mutation<
      PutWrongWayDriverApiResponse,
      PutWrongWayDriverApiArg
    >({
      query: (queryArg) => ({
        url: `/wrong-way-driver`,
        method: 'PUT',
        body: queryArg.wrongWayDriverConfigUpdate,
      }),
    }),
    deleteWrongWayDriverById: build.mutation<
      DeleteWrongWayDriverByIdApiResponse,
      DeleteWrongWayDriverByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/wrong-way-driver/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiConfiguration };
export type GetActionSetApiResponse = /** status 200 Success */ ActionSet[];
export type GetActionSetApiArg = void;
export type PostActionSetApiResponse = /** status 200 Success */ ActionSet;
export type PostActionSetApiArg = {
  actionSet: ActionSet;
};
export type PutActionSetApiResponse = /** status 200 Success */ boolean;
export type PutActionSetApiArg = {
  actionSet: ActionSet;
};
export type GetActionSetByIdApiResponse = /** status 200 Success */ ActionSet;
export type GetActionSetByIdApiArg = {
  id: string;
};
export type DeleteActionSetByIdApiResponse = /** status 200 Success */ boolean;
export type DeleteActionSetByIdApiArg = {
  id: string;
};
export type GetActionSetEntityByTypeAndIdApiResponse =
  /** status 200 Success */ ActionSet[];
export type GetActionSetEntityByTypeAndIdApiArg = {
  id: string;
  type: string;
};
export type GetAcyclicaApiResponse =
  /** status 200 Success */ AcyclicaConfigDto;
export type GetAcyclicaApiArg = void;
export type PostAcyclicaApiResponse =
  /** status 200 Success */ AcyclicaConfigDto;
export type PostAcyclicaApiArg = {
  acyclicaConfigDto: AcyclicaConfigDto;
};
export type PutAcyclicaApiResponse =
  /** status 200 Success */ AcyclicaConfigDto;
export type PutAcyclicaApiArg = {
  acyclicaConfigDto: AcyclicaConfigDto;
};
export type DeleteAcyclicaApiResponse =
  /** status 200 Success */ AcyclicaConfigDto;
export type DeleteAcyclicaApiArg = {
  acyclicaConfigDto: AcyclicaConfigDto;
};
export type GetConnectedVehicleApiResponse =
  /** status 200 Returns connected vehicle configs */ ConnectedVehicleConfigDto;
export type GetConnectedVehicleApiArg = void;
export type PostConnectedVehicleApiResponse =
  /** status 200 Returns connected vehicle config */ ConnectedVehicleConfigDto;
export type PostConnectedVehicleApiArg = {
  /** The connected vehicle config to add */
  connectedVehicleConfigAdd: ConnectedVehicleConfigAdd;
};
export type PutConnectedVehicleApiResponse =
  /** status 200 Returns connected vehicle config */ boolean;
export type PutConnectedVehicleApiArg = {
  /** The connected vehicle config to update */
  connectedVehicleConfigUpdate: ConnectedVehicleConfigUpdate;
};
export type DeleteConnectedVehicleByIdApiResponse =
  /** status 200 Returns a success code */ boolean;
export type DeleteConnectedVehicleByIdApiArg = {
  id: string;
};
export type GetDeviceManagersApiResponse =
  /** status 200 Success */ DmConfigDto[];
export type GetDeviceManagersApiArg = void;
export type PostDeviceManagersApiResponse =
  /** status 200 Success */ DmConfigDto;
export type PostDeviceManagersApiArg = {
  dmConfigAdd: DmConfigAdd;
};
export type PutDeviceManagersApiResponse = /** status 200 Success */ boolean;
export type PutDeviceManagersApiArg = {
  dmConfigUpdate: DmConfigUpdate;
};
export type GetDeviceManagersByIdApiResponse =
  /** status 200 Success */ DmConfigDto;
export type GetDeviceManagersByIdApiArg = {
  id: string;
};
export type DeleteDeviceManagersByIdApiResponse =
  /** status 200 Success */ boolean;
export type DeleteDeviceManagersByIdApiArg = {
  id: string;
};
export type PostDeviceManagersByIdChannelApiResponse =
  /** status 200 Success */ ChannelDto;
export type PostDeviceManagersByIdChannelApiArg = {
  /** device manager id */
  id: string;
  /** channel config */
  channelAdd: ChannelAdd;
};
export type PutDeviceManagersByIdChannelApiResponse =
  /** status 200 Success */ ChannelDto;
export type PutDeviceManagersByIdChannelApiArg = {
  /** device manager id */
  id: string;
  /** channel config */
  channelUpdate: ChannelUpdate;
};
export type DeleteDeviceManagersByIdChannelAndChIdApiResponse =
  /** status 200 Success */ boolean;
export type DeleteDeviceManagersByIdChannelAndChIdApiArg = {
  /** device manager id */
  id: string;
  /** channel id */
  chId: string;
};
export type GetEntitiesTypesApiResponse =
  /** status 200 Success */ EntityTypeId[];
export type GetEntitiesTypesApiArg = void;
export type GetEntitiesAllApiResponse = /** status 200 Success */ EntityNode[];
export type GetEntitiesAllApiArg = void;
export type GetEntitiesApiResponse = /** status 200 Success */ EntityNode;
export type GetEntitiesApiArg = {
  ids?: string[];
};
export type PostEntitiesApiResponse = /** status 200 Success */ EntityNode;
export type PostEntitiesApiArg = {
  entityNode: EntityNode;
};
export type PutEntitiesApiResponse = /** status 200 Success */ boolean;
export type PutEntitiesApiArg = {
  entityNode: EntityNode;
};
export type GetEntitiesByIdApiResponse = /** status 200 Success */ EntityNode;
export type GetEntitiesByIdApiArg = {
  id: string;
};
export type DeleteEntitiesByIdApiResponse = /** status 200 Success */ boolean;
export type DeleteEntitiesByIdApiArg = {
  id: string;
};
export type GetEntitiesTypesByTypeApiResponse =
  /** status 200 Success */ EntityNode[];
export type GetEntitiesTypesByTypeApiArg = {
  type: string;
};
export type GetEntitiesIntersectionByIdApiResponse =
  /** status 200 Success */ EntityNode[];
export type GetEntitiesIntersectionByIdApiArg = {
  id: string;
};
export type PostEntitiesIntersectionsQueryRadiusByMilesApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesIntersectionsQueryRadiusByMilesApiArg = {
  miles: number;
  geoJsonPointFeature: GeoJsonPointFeature;
};
export type PostEntitiesQueryByTypeApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesQueryByTypeApiArg = {
  type: string;
  geoJsonLineStringFeature: GeoJsonLineStringFeature;
};
export type PostEntitiesQueryGeofenceApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesQueryGeofenceApiArg = {
  geoJsonPointFeature: GeoJsonPointFeature;
};
export type PostEntitiesQueryGeofenceByTypeApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesQueryGeofenceByTypeApiArg = {
  type: string;
  geoJsonPointFeature: GeoJsonPointFeature;
};
export type GetEntitiesTypesByTypeParentsApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type GetEntitiesTypesByTypeParentsApiArg = {
  type: string;
};
export type PostEntitiesByParentApiResponse =
  /** status 200 Success */ EntityNode;
export type PostEntitiesByParentApiArg = {
  parent: string;
  entityNode: EntityNode;
};
export type PostEntitiesDownstreamByIntersectionsApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesDownstreamByIntersectionsApiArg = {
  intersections: number;
  geoJsonPointFeature: GeoJsonPointFeature;
};
export type PostEntitiesUpstreamByIntersectionsApiResponse =
  /** status 200 Success */ EntityNode[];
export type PostEntitiesUpstreamByIntersectionsApiArg = {
  intersections: number;
  geoJsonPointFeature: GeoJsonPointFeature;
};
export type PostEntitiesSyncApiResponse = unknown;
export type PostEntitiesSyncApiArg = {
  entitySync: EntitySync;
};
export type GetEntityTypeSectionsApiResponse =
  /** status 200 Success */ EntityType[];
export type GetEntityTypeSectionsApiArg = void;
export type GetEntityTypeApiResponse = /** status 200 Success */ EntityType[];
export type GetEntityTypeApiArg = void;
export type PostEntityTypeApiResponse = /** status 200 Success */ EntityType;
export type PostEntityTypeApiArg = {
  entityTypeAdd: EntityTypeAdd;
};
export type PutEntityTypeApiResponse = /** status 200 Success */ boolean;
export type PutEntityTypeApiArg = {
  entityType: EntityType;
};
export type GetEntityTypeByIdApiResponse = /** status 200 Success */ EntityType;
export type GetEntityTypeByIdApiArg = {
  id: string;
};
export type DeleteEntityTypeByIdApiResponse = /** status 200 Success */ boolean;
export type DeleteEntityTypeByIdApiArg = {
  id: string;
};
export type GetPavementConditionApiResponse =
  /** status 200 Returns pavement condition configs */ PavementConditionConfigDto;
export type GetPavementConditionApiArg = void;
export type PostPavementConditionApiResponse =
  /** status 200 Returns pavement condition config */ PavementConditionConfigDto;
export type PostPavementConditionApiArg = {
  /** The pavement condition config to add */
  pavementConditionConfigAdd: PavementConditionConfigAdd;
};
export type PutPavementConditionApiResponse =
  /** status 200 Returns pavement condition config */ boolean;
export type PutPavementConditionApiArg = {
  /** The pavement condition config to update */
  pavementConditionConfigUpdate: PavementConditionConfigUpdate;
};
export type DeletePavementConditionByIdApiResponse =
  /** status 200 Returns a success code */ boolean;
export type DeletePavementConditionByIdApiArg = {
  id: string;
};
export type GetPavementConditionStatusFindApiResponse =
  /** status 200 Returns pavement condition statuses */ PavementConditionStatusDto[];
export type GetPavementConditionStatusFindApiArg = {
  active?: boolean;
};
export type PostPavementConditionStatusParseApiResponse =
  /** status 200 Returns pavement condition statuses */ PavementConditionStatusDto[];
export type PostPavementConditionStatusParseApiArg = {
  body: {
    file?: Blob;
  };
};
export type PostPavementConditionStatusImportApiResponse =
  /** status 200 Success */ PavementConditionStatusDto[];
export type PostPavementConditionStatusImportApiArg = {
  filename?: string;
  body: PavementConditionStatusDto[];
};
export type PutPavementConditionStatusUpdateApiResponse =
  /** status 200 Success */ PavementConditionStatusDto[];
export type PutPavementConditionStatusUpdateApiArg = {
  body: PavementConditionStatusDto[];
};
export type DeletePavementConditionStatusDeleteApiResponse =
  /** status 200 Success */ PavementConditionStatusDto[];
export type DeletePavementConditionStatusDeleteApiArg = {
  body: PavementConditionStatusDto[];
};
export type GetRsuApiResponse = /** status 200 Success */ Rsu[];
export type GetRsuApiArg = void;
export type PostRsuApiResponse = /** status 200 Success */ Rsu;
export type PostRsuApiArg = {
  rsu: Rsu;
};
export type PutRsuApiResponse = /** status 200 Success */ boolean;
export type PutRsuApiArg = {
  rsu: Rsu;
};
export type GetRsuByIdApiResponse = /** status 200 Success */ Rsu;
export type GetRsuByIdApiArg = {
  id: string;
};
export type DeleteRsuByIdApiResponse = /** status 200 Success */ boolean;
export type DeleteRsuByIdApiArg = {
  id: string;
};
export type GetTreeAllApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type GetTreeAllApiArg = void;
export type GetTreeApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type GetTreeApiArg = void;
export type PostTreeApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type PostTreeApiArg = {
  indexRequest: IndexRequest;
};
export type GetTreeSearchByTermApiResponse =
  /** status 200 Success */ EntityNode[];
export type GetTreeSearchByTermApiArg = {
  term: string;
};
export type GetTreeByInstanceIdApiResponse =
  /** status 200 Success */ EntityNodeProjection;
export type GetTreeByInstanceIdApiArg = {
  instanceId: string;
};
export type GetTreeByInstanceIdChildrenApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type GetTreeByInstanceIdChildrenApiArg = {
  instanceId: string;
};
export type PostTreeChildrenApiResponse =
  /** status 200 Success */ EntityNodeProjection[];
export type PostTreeChildrenApiArg = {
  instanceRequest: InstanceRequest;
};
export type PutTreeByInstanceIdMoveToAndParentApiResponse =
  /** status 200 Success */ EntityNode;
export type PutTreeByInstanceIdMoveToAndParentApiArg = {
  instanceId: string;
  parent: string;
};
export type PutTreeByInstanceIdCopyToAndParentApiResponse =
  /** status 200 Success */ EntityNodeProjection;
export type PutTreeByInstanceIdCopyToAndParentApiArg = {
  instanceId: string;
  parent: string;
};
export type PutTreeByInstanceIdMoveUpApiResponse =
  /** status 200 Success */ EntityNodeProjection;
export type PutTreeByInstanceIdMoveUpApiArg = {
  instanceId: string;
};
export type PutTreeByInstanceIdMoveDownApiResponse =
  /** status 200 Success */ EntityNodeProjection;
export type PutTreeByInstanceIdMoveDownApiArg = {
  instanceId: string;
};
export type GetTwilioApiResponse = /** status 200 Success */ TwilioConfigDto;
export type GetTwilioApiArg = void;
export type PostTwilioApiResponse = /** status 200 Success */ TwilioConfigDto;
export type PostTwilioApiArg = {
  twilioConfigDto: TwilioConfigDto;
};
export type PutTwilioApiResponse = /** status 200 Success */ TwilioConfigDto;
export type PutTwilioApiArg = {
  twilioConfigDto: TwilioConfigDto;
};
export type DeleteTwilioApiResponse = /** status 200 Success */ TwilioConfigDto;
export type DeleteTwilioApiArg = {
  twilioConfigDto: TwilioConfigDto;
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
export type GetWrongWayDriverApiResponse =
  /** status 200 Returns wrong way driver configs */ WrongWayDriverConfigDto;
export type GetWrongWayDriverApiArg = void;
export type PostWrongWayDriverApiResponse =
  /** status 200 Returns wrong way driver config */ WrongWayDriverConfigDto;
export type PostWrongWayDriverApiArg = {
  /** The wrong way driver config to add */
  wrongWayDriverConfigAdd: WrongWayDriverConfigAdd;
};
export type PutWrongWayDriverApiResponse =
  /** status 200 Returns wrong way driver config */ boolean;
export type PutWrongWayDriverApiArg = {
  /** The wrong way driver config to update */
  wrongWayDriverConfigUpdate: WrongWayDriverConfigUpdate;
};
export type DeleteWrongWayDriverByIdApiResponse =
  /** status 200 Returns a success code */ boolean;
export type DeleteWrongWayDriverByIdApiArg = {
  id: string;
};
export type StatementProperty = {
  name?: string | null;
  comparator?: string | null;
  value?: string | null;
  cast?: string | null;
};
export type ScheduleTime = {
  minutes?: number;
  seconds?: number;
};
export type StatementSchedule = {
  type?: string | null;
  times?: number;
  in?: ScheduleTime;
};
export type Statement = {
  id?: string | null;
  type?: string | null;
  property?: StatementProperty;
  entities?: string[] | null;
  schedule?: StatementSchedule;
};
export type Conditional = {
  condition?: string | null;
};
export type StatementAction = {
  action?: string | null;
};
export type ActionSet = {
  id?: string;
  name?: string | null;
  isEnabled?: boolean;
  statements?: Statement[] | null;
  conditionals?: Conditional[] | null;
  actions?: StatementAction[] | null;
};
export type AcyclicaConfigDto = {
  id?: string;
  url?: string | null;
  apiKey?: string | null;
  pollInterval?: number;
};
export type ConnectedVehicleConfigDto = {
  onlineStorageType?: string | null;
  archiveStorageType?: string | null;
  onlineDays?: number;
  onlineSize?: number;
  archivedDays?: number;
  archivedSize?: number;
  startTime?: string;
  endTime?: string;
  id?: string;
};
export type ConnectedVehicleConfigAdd = {
  onlineStorageType?: string | null;
  archiveStorageType?: string | null;
  onlineDays?: number;
  onlineSize?: number;
  archivedDays?: number;
  archivedSize?: number;
  startTime?: string;
  endTime?: string;
};
export type ConnectedVehicleConfigUpdate = {
  onlineStorageType?: string | null;
  archiveStorageType?: string | null;
  onlineDays?: number;
  onlineSize?: number;
  archivedDays?: number;
  archivedSize?: number;
  startTime?: string;
  endTime?: string;
  id?: string;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type CommunicationsModelDto = {
  ipAddress?: string | null;
  port?: number;
  sshPort?: number;
  sshHostKey?: string | null;
  commMode?: number | null;
  filteredCommBad?: number | null;
  filteredCommMarginal?: number | null;
  filteredCommWeightingFactor?: number | null;
};
export type CredentialsModelDto = {
  username?: string | null;
  password?: string | null;
  snmpCommunityName?: string | null;
};
export type ControllerDto = {
  id?: string;
  name?: string | null;
  type?: string | null;
  subType?: string | null;
  communications?: CommunicationsModelDto;
  ftpCredentials?: CredentialsModelDto;
  discoverDynamicObjects?: boolean | null;
};
export type ChannelDto = {
  id?: string;
  channelId?: number;
  name?: string | null;
  channelType?: string | null;
  protocol?: string | null;
  commRequestTimeout?: number;
  primaryPollRate?: number;
  secondaryPollRate?: number;
  tertiaryPollRate?: number;
  adaptivePollRate?: number;
  priorityPollRate?: number;
  deviceTimeout?: number;
  maxExpectedPacketSize?: number;
  sourceIPAddress?: string | null;
  sourcePort?: number;
  broadcastIPAddress?: string | null;
  destinationIPAddress?: string | null;
  destinationPort?: number;
  pollErrorThreshold?: number;
  retries?: number;
  pollRetries?: number;
  timeFormat?: string | null;
  checkTimeInterval?: number;
  allowedTimeDrift?: number;
  signalControllers?: ControllerDto[] | null;
};
export type DmConfigDto = {
  dmId?: number;
  name?: string | null;
  location?: string | null;
  port?: number;
  channels?: ChannelDto[] | null;
  id?: string;
};
export type CommunicationsModelAdd = {
  ipAddress?: string | null;
  port?: number;
  sshPort?: number;
  sshHostKey?: string | null;
  commMode?: number | null;
  filteredCommBad?: number | null;
  filteredCommMarginal?: number | null;
  filteredCommWeightingFactor?: number | null;
};
export type CredentialsModelAdd = {
  username?: string | null;
  password?: string | null;
  snmpCommunityName?: string | null;
};
export type ControllerAdd = {
  id?: string;
  name?: string | null;
  type?: string | null;
  subType?: string | null;
  communications?: CommunicationsModelAdd;
  ftpCredentials?: CredentialsModelAdd;
  discoverDynamicObjects?: boolean | null;
};
export type ChannelAdd = {
  channelId?: number;
  name?: string | null;
  channelType?: string | null;
  protocol?: string | null;
  commRequestTimeout?: number;
  primaryPollRate?: number;
  secondaryPollRate?: number;
  tertiaryPollRate?: number;
  adaptivePollRate?: number;
  priorityPollRate?: number;
  deviceTimeout?: number;
  maxExpectedPacketSize?: number;
  sourceIPAddress?: string | null;
  sourcePort?: number;
  broadcastIPAddress?: string | null;
  destinationIPAddress?: string | null;
  destinationPort?: number;
  pollErrorThreshold?: number;
  retries?: number;
  pollRetries?: number;
  timeFormat?: string | null;
  checkTimeInterval?: number;
  allowedTimeDrift?: number;
  signalControllers?: ControllerAdd[] | null;
};
export type DmConfigAdd = {
  dmId?: number;
  name?: string | null;
  location?: string | null;
  port?: number;
  channels?: ChannelAdd[] | null;
};
export type CommunicationsModelUpdate = {
  ipAddress?: string | null;
  port?: number;
  sshPort?: number;
  sshHostKey?: string | null;
  commMode?: number | null;
  filteredCommBad?: number | null;
  filteredCommMarginal?: number | null;
  filteredCommWeightingFactor?: number | null;
};
export type CredentialsModelUpdate = {
  username?: string | null;
  password?: string | null;
  snmpCommunityName?: string | null;
};
export type ControllerUpdate = {
  id?: string;
  name?: string | null;
  type?: string | null;
  subType?: string | null;
  communications?: CommunicationsModelUpdate;
  ftpCredentials?: CredentialsModelUpdate;
  discoverDynamicObjects?: boolean | null;
};
export type ChannelUpdate = {
  id?: string;
  channelId?: number;
  name?: string | null;
  channelType?: string | null;
  protocol?: string | null;
  commRequestTimeout?: number;
  primaryPollRate?: number;
  secondaryPollRate?: number;
  tertiaryPollRate?: number;
  adaptivePollRate?: number;
  priorityPollRate?: number;
  deviceTimeout?: number;
  maxExpectedPacketSize?: number;
  sourceIPAddress?: string | null;
  sourcePort?: number;
  broadcastIPAddress?: string | null;
  destinationIPAddress?: string | null;
  destinationPort?: number;
  pollErrorThreshold?: number;
  retries?: number;
  pollRetries?: number;
  timeFormat?: string | null;
  checkTimeInterval?: number;
  allowedTimeDrift?: number;
  signalControllers?: ControllerUpdate[] | null;
};
export type DmConfigUpdate = {
  dmId?: number;
  name?: string | null;
  location?: string | null;
  port?: number;
  channels?: ChannelUpdate[] | null;
  id?: string;
};
export type EntityTypeId = {
  id?: string;
  name?: string | null;
};
export type Jurisdiction = {
  id?: string;
  description?: string | null;
  isDeleted?: boolean;
  version?: number;
  name?: string | null;
};
export type GeoSpatialType =
  | 'None'
  | 'Point'
  | 'LineString'
  | 'Polygon'
  | 'Circle';
export type Bearing =
  | 'Unknown'
  | 'NB'
  | 'EB'
  | 'SB'
  | 'WB'
  | 'NEB'
  | 'NWB'
  | 'SEB'
  | 'SWB';
export type Movement = 'Unknown' | 'Left' | 'Thru' | 'Right';
export type DetectorType =
  | 'Unknown'
  | 'InductiveLoop'
  | 'Electrometric'
  | 'Video'
  | 'RadarFrontal'
  | 'RadarSideFire'
  | 'Hybrid';
export type DetectorModel = {
  number?: number;
  detectorName?: string | null;
  bearing?: Bearing;
  movement?: Movement;
  length?: number;
  setBack?: number;
  distanceToNextSignal?: number;
  lanes?: number;
  laneNumber?: number;
  phases?: number[] | null;
  protectedPhase?: number;
  permittedPhase?: number;
  type?: DetectorType;
  advanced?: boolean;
  phaseData?: boolean;
  exitDetection?: boolean;
  turningMovementCount?: boolean;
  splitFailure?: boolean;
  redLightMonitor?: boolean;
  speed?: boolean;
};
export type PhaseModel = {
  number?: number | null;
  movement?: string | null;
  lanes?: number | null;
  detectors?: DetectorModel[] | null;
};
export type TripPointLocation = {
  distance?: number;
  point?: number[] | null;
};
export type GeoJsonProperties = {
  intersection?: string | null;
  bearing?: Bearing;
  origin?: string | null;
  destination?: string | null;
  speedLimit?: number | null;
  phases?: PhaseModel[] | null;
  tripPointLocations?: TripPointLocation[] | null;
  intersections?: string[] | null;
};
export type GeoJsonPointFeature = {
  type?: GeoSpatialType;
  coordinates?: number[] | null;
  properties?: GeoJsonProperties;
};
export type GeoJsonLineStringFeature = {
  type?: GeoSpatialType;
  coordinates?: number[][] | null;
  properties?: GeoJsonProperties;
};
export type GeoJsonPolygonFeature = {
  type?: GeoSpatialType;
  coordinates?: number[][][] | null;
  properties?: GeoJsonProperties;
};
export type GeoJsonGeometry = {
  type?: GeoSpatialType;
  radius?: number | null;
  point?: GeoJsonPointFeature;
  lineString?: GeoJsonLineStringFeature;
  polygon?: GeoJsonPolygonFeature;
};
export type CommMode = 'Online' | 'Offline' | 'Standby';
export type Entity = {
  id?: string;
  description?: string | null;
  isDeleted?: boolean;
  version?: number;
  name?: string | null;
  type?: EntityTypeId;
  jurisdiction?: Jurisdiction;
  isCopy?: boolean;
  isLeaf?: boolean;
};
export type EntityNode = {
  id?: string;
  description?: string | null;
  isDeleted?: boolean;
  version?: number;
  name?: string | null;
  type?: EntityTypeId;
  jurisdiction?: Jurisdiction;
  isCopy?: boolean;
  isLeaf?: boolean;
  parent?: string;
  geometry?: GeoJsonGeometry;
  geoFence?: GeoJsonPolygonFeature;
  externalId?: string | null;
  primary?: string | null;
  secondary?: string | null;
  activeDays?: number | null;
  idMapping?: number | null;
  controllerType?: string | null;
  deviceManager?: string | null;
  channel?: string | null;
  commMode?: CommMode;
  ipAddress?: string | null;
  port?: number | null;
  sshPort?: number | null;
  sshHostKey?: string | null;
  filteredCommBad?: number | null;
  filteredCommMarginal?: number | null;
  filteredCommWeightingFactor?: number | null;
  username?: string | null;
  password?: string | null;
  privacyPhrase?: string | null;
  retries?: number | null;
  timeout?: number | null;
  pollRate?: number | null;
  authentication?: string | null;
  privacy?: string | null;
  requireStandbyOnSet?: boolean | null;
  parents?: string[] | null;
  children?: Entity[] | null;
};
export type EntityNodeProjection = {
  id?: string;
  description?: string | null;
  isDeleted?: boolean;
  version?: number;
  name?: string | null;
  type?: EntityTypeId;
  jurisdiction?: Jurisdiction;
  isCopy?: boolean;
  isLeaf?: boolean;
  instanceId?: string | null;
  parent?: string;
  children?: EntityNodeProjection[] | null;
};
export type CorridorsSyncModel = {
  id?: number;
  name?: string | null;
  isDeleted?: boolean;
  intersections?: number[] | null;
};
export type SpatIntersectionModel = {
  id?: string;
  clarityId?: number | null;
  spatId?: number | null;
  name?: string | null;
  description?: string | null;
  controllerType?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  isDeleted?: boolean;
};
export type EntitySync = {
  id?: string;
  corridors?: CorridorsSyncModel[] | null;
  intersections?: SpatIntersectionModel[] | null;
};
export type EntityTypeSection = {
  id?: string;
  name?: string | null;
  enabled?: boolean;
  sections?: EntityTypeSection[] | null;
};
export type EntityType = {
  name?: string | null;
  icon?: string | null;
  systemType?: boolean;
  visible?: boolean;
  copyable?: boolean;
  movable?: boolean;
  spatialType?: GeoSpatialType;
  sections?: EntityTypeSection[] | null;
  children?: string[] | null;
  id?: string;
};
export type EntityTypeAdd = {
  name?: string | null;
  icon?: string | null;
  systemType?: boolean;
  visible?: boolean;
  copyable?: boolean;
  movable?: boolean;
  spatialType?: GeoSpatialType;
  sections?: EntityTypeSection[] | null;
  children?: string[] | null;
};
export type PavementConditionConfigDto = {
  activeDays?: number;
  id?: string;
};
export type PavementConditionConfigAdd = {
  activeDays?: number;
};
export type PavementConditionConfigUpdate = {
  activeDays?: number;
  id?: string;
};
export type PavementConditionStatusSeverity = 'Low' | 'Medium' | 'High';
export type PavementConditionStatusType = 'None' | 'Bump' | 'Pothole';
export type PavementConditionStatusDto = {
  id?: string;
  timestamp?: string;
  location?: string | null;
  latitude?: number;
  longitude?: number;
  severity?: PavementConditionStatusSeverity;
  type?: PavementConditionStatusType;
  isActive?: boolean;
};
export type SnmpVersion = 'V1' | 'V2' | 'V3';
export type AuthenticationProviderType =
  | 'None'
  | 'MD5'
  | 'SHA'
  | 'SHA256'
  | 'SHA384'
  | 'SHA512';
export type PrivacyProviderType = 'None' | 'DES' | 'AES' | 'AES192' | 'AES256';
export type Rsu = {
  target?: string | null;
  snmpVersion?: SnmpVersion;
  community?: string | null;
  username?: string | null;
  password?: string | null;
  privacyPhrase?: string | null;
  contextName?: string | null;
  retries?: number;
  timeout?: number;
  pollRate?: number;
  maxVariables?: number;
  authentication?: AuthenticationProviderType;
  privacy?: PrivacyProviderType;
  requireStandbyOnSet?: boolean;
  id?: string;
};
export type IndexRequest = {
  expandedEntityIds?: string[] | null;
};
export type InstanceRequest = {
  instanceId?: string | null;
};
export type TwilioConfigDto = {
  id?: string;
  accountSid?: string | null;
  authToken?: string | null;
  senderPhone?: string | null;
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
export type WrongWayDriverConfigDto = {
  activeDays?: number;
  id?: string;
};
export type WrongWayDriverConfigAdd = {
  activeDays?: number;
};
export type WrongWayDriverConfigUpdate = {
  activeDays?: number;
  id?: string;
};
export const {
  useGetActionSetQuery,
  usePostActionSetMutation,
  usePutActionSetMutation,
  useGetActionSetByIdQuery,
  useDeleteActionSetByIdMutation,
  useGetActionSetEntityByTypeAndIdQuery,
  useGetAcyclicaQuery,
  usePostAcyclicaMutation,
  usePutAcyclicaMutation,
  useDeleteAcyclicaMutation,
  useGetConnectedVehicleQuery,
  usePostConnectedVehicleMutation,
  usePutConnectedVehicleMutation,
  useDeleteConnectedVehicleByIdMutation,
  useGetDeviceManagersQuery,
  usePostDeviceManagersMutation,
  usePutDeviceManagersMutation,
  useGetDeviceManagersByIdQuery,
  useDeleteDeviceManagersByIdMutation,
  usePostDeviceManagersByIdChannelMutation,
  usePutDeviceManagersByIdChannelMutation,
  useDeleteDeviceManagersByIdChannelAndChIdMutation,
  useGetEntitiesTypesQuery,
  useGetEntitiesAllQuery,
  useGetEntitiesQuery,
  usePostEntitiesMutation,
  usePutEntitiesMutation,
  useGetEntitiesByIdQuery,
  useDeleteEntitiesByIdMutation,
  useGetEntitiesTypesByTypeQuery,
  useGetEntitiesIntersectionByIdQuery,
  usePostEntitiesIntersectionsQueryRadiusByMilesMutation,
  usePostEntitiesQueryByTypeMutation,
  usePostEntitiesQueryGeofenceMutation,
  usePostEntitiesQueryGeofenceByTypeMutation,
  useGetEntitiesTypesByTypeParentsQuery,
  usePostEntitiesByParentMutation,
  usePostEntitiesDownstreamByIntersectionsMutation,
  usePostEntitiesUpstreamByIntersectionsMutation,
  usePostEntitiesSyncMutation,
  useGetEntityTypeSectionsQuery,
  useGetEntityTypeQuery,
  usePostEntityTypeMutation,
  usePutEntityTypeMutation,
  useGetEntityTypeByIdQuery,
  useDeleteEntityTypeByIdMutation,
  useGetPavementConditionQuery,
  usePostPavementConditionMutation,
  usePutPavementConditionMutation,
  useDeletePavementConditionByIdMutation,
  useGetPavementConditionStatusFindQuery,
  usePostPavementConditionStatusParseMutation,
  usePostPavementConditionStatusImportMutation,
  usePutPavementConditionStatusUpdateMutation,
  useDeletePavementConditionStatusDeleteMutation,
  useGetRsuQuery,
  usePostRsuMutation,
  usePutRsuMutation,
  useGetRsuByIdQuery,
  useDeleteRsuByIdMutation,
  useGetTreeAllQuery,
  useGetTreeQuery,
  usePostTreeMutation,
  useGetTreeSearchByTermQuery,
  useGetTreeByInstanceIdQuery,
  useGetTreeByInstanceIdChildrenQuery,
  usePostTreeChildrenMutation,
  usePutTreeByInstanceIdMoveToAndParentMutation,
  usePutTreeByInstanceIdCopyToAndParentMutation,
  usePutTreeByInstanceIdMoveUpMutation,
  usePutTreeByInstanceIdMoveDownMutation,
  useGetTwilioQuery,
  usePostTwilioMutation,
  usePutTwilioMutation,
  useDeleteTwilioMutation,
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
  useGetWrongWayDriverQuery,
  usePostWrongWayDriverMutation,
  usePutWrongWayDriverMutation,
  useDeleteWrongWayDriverByIdMutation,
} = injectedRtkApi;
