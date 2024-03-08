// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { ActionSet } from '@econolite/shared/data-access/api-configuration';

export interface TriggerTarget {
  id?: string,
  name?: string | null
}

export interface TriggerEvent {
  entity: string,
  name: string,
  properties: TriggerEventProperty[],
  itiscodes: { label: string, value: string }[]
}

export interface TriggerEventProperty {
  display: string,
  name: string,
  type: string,
  level: string,
  enumType?: string
}

export interface TriggerEventPropertyInput {
  name: string,
  isEnabled: boolean,
  comparator: string,
  level: string,
  value: string | number,
  cast?: string
}

export interface TriggerFormInput {
  id: string;
  name: string;
  event?: TriggerEvent;
  properties: TriggerEventPropertyInput[];
  type: string;
  targets: string[];
  itis: string;
  enabled: boolean;
}

export interface StatementInputProperty {
  label: string,
  name: string,
  type: string,
  level: string,
  enumType?: string,
  operators?: string[],
  unit?: string,
  defaultValue: any
}

export interface StatementActionData {
  id: string;
  actionType: string;
  info: string;
  targetType: string;
  parameter: string[];
}

export type StatementActions = {
  statementActions: Array<StatementActionData>
}

export type ActionSetWithAction = ActionSet & StatementActions;
