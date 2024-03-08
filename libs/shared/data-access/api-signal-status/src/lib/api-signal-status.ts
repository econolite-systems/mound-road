// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { emptySplitApi as api } from './emptyApiSignalStatus';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSignalStatusGet: build.query<
      GetSignalStatusGetApiResponse,
      GetSignalStatusGetApiArg
    >({
      query: (queryArg) => ({
        url: `/signal-status/get`,
        params: { id: queryArg.id },
      }),
    }),
    getSignalStatusAll: build.query<
      GetSignalStatusAllApiResponse,
      GetSignalStatusAllApiArg
    >({
      query: () => ({ url: `/signal-status/all` }),
    }),
    getSignalStatusPoint: build.query<
      GetSignalStatusPointApiResponse,
      GetSignalStatusPointApiArg
    >({
      query: () => ({ url: `/signal-status/point` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiSignalStatus };
export type GetSignalStatusGetApiResponse =
  /** status 200 Success */ SignalStatusModel;
export type GetSignalStatusGetApiArg = {
  id: string;
};
export type GetSignalStatusAllApiResponse =
  /** status 200 Success */ SignalStatusModel[];
export type GetSignalStatusAllApiArg = void;
export type GetSignalStatusPointApiResponse =
  /** status 200 Success */ MapSignalState[];
export type GetSignalStatusPointApiArg = void;
export type CommStatus =
  | 'Unknown'
  | 'Offline'
  | 'Standby'
  | 'Bad'
  | 'BadContent'
  | 'Marginal'
  | 'Good';
export type ExtSignalState =
  | 'Offline'
  | 'CommFail'
  | 'Standby'
  | 'Flash'
  | 'Preempt'
  | 'Transition'
  | 'Coordinated'
  | 'Free'
  | 'AutomaticFlash';
export type LocalFreeStatus =
  | 'None'
  | 'Other'
  | 'NotFree'
  | 'CommandFree'
  | 'TransitionFree'
  | 'InputFree'
  | 'CoordFree'
  | 'BadPlan'
  | 'BadCycleTime'
  | 'SplitOverrun'
  | 'InvalidOffset'
  | 'Failed';
export type UnitFlashStatus =
  | 'None'
  | 'Other'
  | 'NotFlash'
  | 'Automatic'
  | 'LocalManual'
  | 'FaultMonitor'
  | 'Mmu'
  | 'Startup'
  | 'Preempt';
export type CoordState = 'Unknown' | 'InSync' | 'Transition' | 'Flash' | 'Free';
export type PreemptKind =
  | 'None'
  | 'Railroad'
  | 'EmergencyVehicle'
  | 'Other'
  | 'Unsupported';
export type Preempt = {
  preemptType?: PreemptKind;
  preemptNumber?: number;
  preemptCentracsNumber?: number;
};
export type ExtPhaseState =
  | 'CommFail'
  | 'Off'
  | 'Green'
  | 'Yellow'
  | 'Red'
  | 'Orange';
export type ExtPedState = 'CommFail' | 'Off' | 'Walk' | 'FDW' | 'DW' | 'Dark';
export type PhaseStatusModel = {
  phase?: number;
  extendedPhaseState?: ExtPhaseState;
  extendedPedState?: ExtPedState;
  isNextPhase?: boolean;
  isVehCall?: boolean;
  isPedCall?: boolean;
  isPhaseFlash?: boolean;
};
export type OverlapStatusModel = {
  overlap?: string | null;
  extendedPhaseState?: ExtPhaseState;
  extendedPedState?: ExtPedState;
  isOverlapFlash?: boolean;
};
export type RingStatus =
  | 'MinGreen'
  | 'Extension'
  | 'Maximum'
  | 'GreenRest'
  | 'YellowChange'
  | 'RedClearance'
  | 'RedRest'
  | 'Undefined';
export type RingStatusTermination =
  | 'Unknown'
  | 'GapOut'
  | 'MaxOut'
  | 'ForceOff';
export type TspCallStatus2 =
  | 'EnabledIdle'
  | 'CallFromInput'
  | 'CallFromNTCIP'
  | 'CallBeingServed'
  | 'CallReserviced'
  | 'CallInhibited'
  | 'Disabled'
  | 'ProgrammingError'
  | 'EarlyExtendedGreen';
export type SignalStatusSource = 'Unknown' | 'DirectPolling' | 'SPaTMessage';
export type SignalStatusModel = {
  signalId?: string;
  commStatus?: CommStatus;
  commSuccessRate?: number;
  extendedSignalState?: ExtSignalState;
  isInTransition?: boolean;
  isCommsDead?: boolean;
  localFreeStatus?: LocalFreeStatus;
  unitFlashStatus?: UnitFlashStatus;
  coordState?: CoordState;
  preemptState?: Preempt;
  signalName?: string | null;
  unitControlMode?: string | null;
  coordPattern?: string | null;
  alarmCount?: number;
  alarms?: string[] | null;
  phaseStatus?: PhaseStatusModel[] | null;
  overlapStatus?: OverlapStatusModel[] | null;
  ringStatuses?: RingStatus[] | null;
  ringStatusTerminations?: RingStatusTermination[] | null;
  timestamp?: string;
  systemClock?: number;
  localClock?: number;
  offset?: number;
  tspCallStatus?: TspCallStatus2[] | null;
  notifications?: string[] | null;
  signalStatusSource?: SignalStatusSource;
};
export type SignalState =
  | 'Offline'
  | 'CommFail'
  | 'Standby'
  | 'Flash'
  | 'Preempt'
  | 'Transition'
  | 'Coordination'
  | 'Free'
  | 'AutomaticFlash';
export type MapSignalState = {
  id?: string;
  state?: SignalState;
  time?: string;
  signalStatusSource?: SignalStatusSource;
};
export const {
  useGetSignalStatusGetQuery,
  useGetSignalStatusAllQuery,
  useGetSignalStatusPointQuery,
} = injectedRtkApi;
