// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { CorridorSpeedOverrideType } from "@econolite/shared/data-access/api-configuration";

export interface WeatherResponsiveCorridorConfigState {
    id?: string;
    corridorId: string;
    priority: number;
    name: string;
    isEnabled: boolean;
    hasPrecipitation: boolean;
    temperatureThreshold: number;
    roadConditions: Array<number>;
    minimumConfidence: number;
    enableEdaptive: boolean;
    edaptiveConfigurationId?: string;
    adjustSpeed: boolean;
    speedAdjustment?: number;
    speedOverrideType?: CorridorSpeedOverrideType;
    adjustTimingPlan: boolean;
    timingPlan?: number;
}
