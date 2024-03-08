// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { array, boolean, number, object, string } from 'yup';
import { TriggerFormInput, TriggerEvent, TriggerEventProperty, TriggerEventPropertyInput, ActionSetWithAction } from './trigger-props';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TYPE = 'Info'; // type is not currently supported, should always default to Info

export const defaultActionSetFormData: ActionSetWithAction = {
  id: uuidv4(),
  name: "",
  isEnabled: true,
  statements: [
    {
      id: uuidv4(),
      type: 'EnvironmentalSensor',
      property: {
        name: '',
        comparator: '=',
        value: ''
      },
      entities: [],
      schedule: {
        type: 'immediate',
        times: 0,
        in: {
          minutes: 0,
          seconds: 0,
        },
      },
    },
  ],
  conditionals: [],
  actions: [],
  statementActions: [{
    id: uuidv4(),
    actionType: 'send-tim-message',
    info: 'VehicleTravelingWrongWay',
    targetType: 'downstream',
    parameter: []
  }],
};

export const defaultFormData: TriggerFormInput = {
  id: '',
  name: '',
  event: undefined,
  properties: [],
  type: DEFAULT_TYPE,
  targets: [],
  itis: '',
  enabled: true
};

export const triggerSchema = object({
  name: string().max(100).required(),
  event: object().required(),
  properties: array().notRequired(),
  type: string().required(),
  targets: array().min(1).required(),
  itis: string().min(3).required(),
  enabled: boolean().required()
});

export const triggerEventSchema = object({
  display: string().required(),
  name: string(),
  type: string(),
  level: string(),
  emumType: string()
});

export const statementPropertySchema = object({
  name: string(),
  comparator: string(),
  value: string(),
  cast: string()
});

export const statementScheduleTimeSchema = object({
  minutes: number().min(0).default(0),
  seconds: number().min(0).default(0)
});

export const statementScheduleSchema = object({
  type: string().min(3).required(),
  times: number().min(0).max(100).optional().default(0),
  in: statementScheduleTimeSchema,
});

export const statementSchema = object({
  property: statementPropertySchema,
  entities: array(),
  schedule: statementScheduleSchema
});

export const conditionalSchema = object({
  condition: string()
})

export const actionSetSchema = object({
  name: string().required(),
  statements: array(statementSchema),
  conditionals: array(conditionalSchema)
});

export const convertTriggerDataToLogicStatement = (data: TriggerFormInput): any => {
  const properties = data.properties.filter((p: TriggerEventPropertyInput) => p.isEnabled)
  const entityProps = properties.filter((p: TriggerEventPropertyInput) => p.level === 'entity');
  const eventProps = properties.filter((p: TriggerEventPropertyInput) => p.level === 'event');

  return {
    id: data.id,
    enabled: data.enabled,
    metadata: {
      name: data.name,
      description: `${data.itis}`
    },
    entity: data.event?.entity ?? '',
    where: entityProps.length > 0
      ? ['and', ...entityProps.map(p => [
          p.comparator,
          ['entity', p.name],
          p.cast ? [p.cast, p.value] : p.value
        ])]
      : null,
    handlers: [{
      event: {
        name: data.event?.name ?? ''
      },
      when: eventProps.length > 0
        ? ['and', ...eventProps.map(p => [
            p.comparator,
            ['event', p.name],
            p.cast ? [p.cast, p.value] : p.value
          ])]
        : null,
      actions: [{
        then: [{
          type: 'tim-send-itis',
          statement: `{"devices": ${JSON.stringify(data.targets)},"itis-code": "${data.itis}"}`
        }]
      }]
    }]
  }
}

export const convertLogicStatementToTriggerData = (logicStatement: any, event?: TriggerEvent): TriggerFormInput => {
  const properties = event?.properties.map((property) => {
    const { name, level } = property;
    const propertyData = level === 'entity'
      ? logicStatement?.where
      : logicStatement?.handlers?.[0].when;
    const logicStatementProperty = propertyData?.find((val: any, idx: number) => idx > 0 && val[1][1] === name) as any;
    const propertyValue = logicStatementProperty?.[2];
    return {
      name,
      level,
      isEnabled: !!logicStatementProperty,
      comparator: logicStatementProperty?.[0] ?? '==',
      value: Array.isArray(propertyValue) ? propertyValue[1] : propertyValue,
      cast: getPropertyValueCast(property)
    };
  });
  const statement = JSON.parse(logicStatement?.handlers?.[0].actions?.[0].then?.[0].statement);
  let targets:Array<string> = [];
  if ( statement && statement.devices) {
    targets = statement.devices;
  }
  
  return {
    id: logicStatement?.id ?? defaultFormData.id,
    enabled: logicStatement?.enabled ?? defaultFormData.enabled,
    name: logicStatement?.metadata?.name ?? defaultFormData.name,
    type: DEFAULT_TYPE,
    targets: targets ?? defaultFormData.targets,
    itis: statement["itis-code"] ?? "none",
    properties: properties ?? defaultFormData.properties,
    event,
  };
};

export const convertLogicStatementToTableData = (logicStatement: any): any => ({
  id: logicStatement.id,
  enabled: logicStatement.enabled,
  name: logicStatement.metadata?.name,
  type: DEFAULT_TYPE,
  itis: logicStatement.handlers?.[0].actions?.[0].then?.[0].type
});

export const convertPropertyToDefaultInput = (property: TriggerEventProperty): TriggerEventPropertyInput => ({
  isEnabled: false,
  name: property.name,
  level: property.level,
  comparator: '==',
  value: '',
  cast: getPropertyValueCast(property)
});

export const isEventEqual = (a?: TriggerEvent, b?: TriggerEvent): boolean => {
  if (!a || !b) return false;
  return a.entity === b.entity && a.name === b.name;
}

// Returns the cast type for a property, or undefined if not needed
export const getPropertyValueCast = (property: TriggerEventProperty): string | undefined => {
  switch (property.type) {
    case 'guid':
      return property.type;
    case 'enum':
      return property.enumType;
    default:
      return undefined;
  }
}
