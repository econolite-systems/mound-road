// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { AuthProviderProps, IsAdministrator, IsContributor, LoginRedirectPage, LogoutRedirectPage, PrivateOutlet, SilentRedirectPage, useAuth, useAuthContext } from '@econolite/shared-react-auth';
import { useAppConfig } from '@econolite/mound-road/data-access/global-state';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from './error-page';
import { Shell } from '@econolite/mound-road/ui/common';
import { SystemMap } from '@econolite/mound-road/feature/system-map';
import { Reports } from '@econolite/mound-road/feature/reports';
import { ReportsAuditTable, ReportsConnectedVehicleIntersectionsTable, ReportsConnectedVehiclesTotalsTable, ReportsEnvironmentalSensorsTable, ReportsErrorLogTable, ReportsEventLogTable, ReportsPavementCondidtionsTable, ReportsRevokedCredentialsTable, ReportsRoadSideUnitTable, ReportsTimTable, ReportsWeatherResponsiveCorridorsTable, ReportsWeatherResponsiveFusionTable, ReportsWrongWayOccurrencesTable } from '@econolite/shared/react/report-tables';
import { JasperReportViewer } from '@econolite/shared/react/reports';
import { VehiclePriority } from '@econolite/mound-road/feature/vehicle-priority';
import { PriorityRequestVehicleClassLevelConfig, PriorityRequestVehicleClassTypeConfig, PriorityRequestVehicleConfig, PriorityRequestVehicleIntersectionConfig } from '@econolite/vehicle-priority';
import { ConnectedVehicle } from '@econolite/mound-road/feature/connected-vehicle';
import { PavementCondition } from '@econolite/mound-road/feature/pavement-condition';
import { Tim } from '@econolite/mound-road/feature/tim';
import { WeatherResponsive } from '@econolite/mound-road/feature/weather-responsive';
import { CorridorRuleConfig as WeatherResponsiveConfig } from '@econolite/shared/react/weather-responsive';
import { AcyclicaConfig } from '@econolite/shared/react/acyclica';
import { DeviceManagerTabContents, ChannelConfig, ConnectedVehicleConfig, PavementConditionConfig, WrongWayDriverConfig } from '@econolite/shared/react/entities';
import { ServiceMetrics } from '@econolite/shared/react/metrics';
import { SystemHealth } from '@econolite/shared/react/system-monitoring';
import { ActionSetConfig } from '@econolite/shared/react/traveler-messages';
import { TwilioConfig } from '@econolite/shared/react/twilio';
import { Settings } from '@econolite/mound-road/feature/settings';

function getRouter(isAdministrator: boolean, isContributor: boolean, authSettings: AuthProviderProps) {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PrivateOutlet />} errorElement={<ErrorPage authSettings={authSettings} isAdministrator={isAdministrator} />}>
          <Route path="" element={<Shell authSettings={authSettings} isAdministrator={isAdministrator} />}>
            <Route path="" element={<SystemMap />} handle={{ title: 'Map' }} />
            <Route path="/reports" element={<Reports />} handle={{ title: 'Reports' }}>
              <Route path="audit" element={<ReportsAuditTable />} />
              <Route path="revokedcredentials" element={<ReportsRevokedCredentialsTable />} />
              <Route path="ess" element={<ReportsEnvironmentalSensorsTable />} />
              <Route path="errorlog" element={<ReportsErrorLogTable />} />
              <Route path="eventlog" element={<ReportsEventLogTable />} />
              <Route path="rsu" element={<ReportsRoadSideUnitTable />} />
              <Route path="pavementcondition" element={<ReportsPavementCondidtionsTable />} />
              <Route path="wwd" element={<ReportsWrongWayOccurrencesTable />} />
              <Route path="cvtotals" element={<ReportsConnectedVehiclesTotalsTable />} />
              <Route path="cvintersection" element={<ReportsConnectedVehicleIntersectionsTable />} />
              <Route path="tim" element={<ReportsTimTable />} />
              <Route path="weatherresponsive" element={<ReportsWeatherResponsiveCorridorsTable />} />
              <Route path="weatherfusion" element={<ReportsWeatherResponsiveFusionTable />} />
              {/* <Route path="prs" element={<ReportsPrsTable />} /> */}
              <Route path="custom/:reportType" element={<JasperReportViewer />} />
            </Route>
            {isContributor ? <Route path="/vehicle-priority" handle={{ title: 'Vehicle Priority' }}>
              <Route path="settings" element={<VehiclePriority />}>
                <Route path="intersections" element={<PriorityRequestVehicleIntersectionConfig />} />
                <Route path="vehicles" element={<PriorityRequestVehicleConfig />} />
                <Route path="vehicle-class-types" element={<PriorityRequestVehicleClassTypeConfig />} />
                <Route path="vehicle-class-levels" element={<PriorityRequestVehicleClassLevelConfig />} />
                <Route path="" element={<PriorityRequestVehicleIntersectionConfig />} />
              </Route>
            </Route> : ''}
            <Route path="/connected-vehicle" element={<ConnectedVehicle />} handle={{ title: 'Connected Vehicle Status' }} />
            <Route path="/weather-responsive" element={<WeatherResponsive />} handle={{ title: 'Weather Responsive' }} />
            <Route path="/tim" element={<Tim />} handle={{ title: 'Traveler Information Messages' }} />
            <Route path='/pavement-condition' element={<PavementCondition />} handle={{ title: 'Pavement Condition' }} />
            <Route path="/system-health" element={<SystemHealth />} handle={{ title: 'System Health' }} />
            <Route path="/system-metrics" element={<ServiceMetrics />} handle={{ title: 'System Metrics' }} />
            <Route path="/settings" element={<Settings />} handle={{ title: 'Settings' }}>
              <Route path="comms" element={<DeviceManagerTabContents />}>
                <Route path="channels/:deviceManagerId" element={<ChannelConfig />} />
              </Route>
              <Route path="cv" element={<ConnectedVehicleConfig />} />
              <Route path="pavementcondition" element={<PavementConditionConfig />} />
              {isAdministrator ? <Route path="acyclica" element={<AcyclicaConfig />} /> : ''}
              <Route path="actionsets" element={<ActionSetConfig />} />
              <Route path="wwd" element={<WrongWayDriverConfig />} />
              <Route path="weather-responsive" element={<WeatherResponsiveConfig />} />
              {isAdministrator ? <Route path="twilio" element={<TwilioConfig />} /> : ''}
              <Route path="" element={<ActionSetConfig />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login-redirect.html" element={<LoginRedirectPage />} />
        <Route path="/logout-redirect.html" element={<LogoutRedirectPage />} />
        <Route path="/silent-redirect.html" element={<SilentRedirectPage />} />
      </>
    )
  );
}

function Routes() {
  const { config } = useAppConfig();
  const { isAuthenticated } = useAuth();
  const isAdministrator = IsAdministrator();
  const isContributor = IsContributor();

  return (
    (!isAuthenticated)? <div>Authenticating...</div> :
    <RouterProvider router={getRouter(isAdministrator, isContributor, config.authSettings)} />
  )
}

export default Routes;
