// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { boolean, object, string, array } from 'yup';

export const configFetch = object(
  {
    isLoading: boolean().default(true),
    error: string().optional().default(undefined),
  }
);

export const authSettingsSchema = object(
  {
    authority: string().trim().url().optional(),
    clientId: string().trim().optional(),
    clientSecret: string().trim().optional(),
    redirectUri: string().trim().optional(),
    silentRedirectUri: string().trim().optional(),
    postLogoutRedirectUri: string().trim().optional(),
    responseType: string().trim().optional(),
    scope: string().trim().optional(),
    automaticSilentRenew: boolean().required().default(true),
    loadUserInfo: boolean().required().default(true),
    popupWindowFeatures: string().optional(),
    popupRedirectUri: string().trim().optional(),
    popupWindowTarget: string().trim().optional().default('_blank')
  }
);

export const jasperReportSettingsSchema = object(
  {
    reportServerUrl: string().trim().optional(),
    reportServerUsername: string().trim().optional(),
    reportServerPassword: string().trim().optional()
  }
);

export const serviceSettingsSchema = object(
  {
    configService: string().trim().optional().default("http://localhost:5138"),
    reportsService: string().trim().optional().default("http://localhost:5254"),
    vehiclePriorityService: string().trim().optional().default("http://localhost:5186"),
    timService: string().trim().optional().default("http://localhost:5187"),
    systemHealthService: string().trim().optional().default("http://localhost:5255"),
    signalStatusService: string().trim().optional().default("http://localhost:5121"),
    speedStatusService: string().trim().optional().default("http://localhost:5122"),
  }
);

export const applicationSchema = array(object(
  {
    name: string().trim().default("Unconfigured"),
    url: string().trim().default("/unconfigured")
  }
));

export const configSchema = object(
  {
    authSettings: authSettingsSchema,
    jasperReportSettings: jasperReportSettingsSchema,
    serviceSettings: serviceSettingsSchema,
    applications: applicationSchema
  }
);

export const configStateSchema = configFetch.concat(configSchema);

export const configInitialState = configSchema.cast({})

export const initialState = configStateSchema.cast({});
