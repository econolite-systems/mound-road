// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityTypeId, EntityTypeSection } from '@econolite/shared/data-access/api-configuration';
import { createSlice } from '@reduxjs/toolkit';
import { array, boolean, object, string, StringSchema } from 'yup';

export const entityCommTypeStateSchema = object({

});

export const entitySubTypeStateSchema = object({
  id: string().required(),
  name: string().required(),
  icon: string().optional()
});

export const entityTypeStateSchema = object({
  id: string().uuid().optional(),
  name: string().min(4).required(),
  description: string().optional(),
  icon: string().optional(),
  subTypes: array().of(entitySubTypeStateSchema).default([]),
  supportsDeviceManager: boolean().default(false)
});

export const entityStateSchema = object({
  id: string().uuid().optional(),
  name: string().min(3).required(),
  description: string().optional(),
  typeId: string().uuid().required(),
  typeLabel: string().required()
});

export const entitiesStateSchema = object(
  {
    types: array().of(entityTypeStateSchema).default([]),
    entities: array().of(entityStateSchema).default([]),
    currentEntity: entityStateSchema
  }
);

export interface EntitySubTypeState {
  id: string;
  name: string;
  icon: string;
};

export interface EntityTypeState {
  id: string;
  name: string;
  description: string;
  icon: string;
  subTypes: Array<EntitySubTypeState>;
  supportsDeviceManager: boolean;
};

export interface EntityState extends SignalEntityState, ControllerTypeEntityState, CommunicationsEntityState, CredentialsEntityState, EnvironmentalSensorEntityState {
  id: string;
  name: string;
  description?: string;
  type: EntityTypeId;
};

export interface EnvironmentalSensorEntityState {
  latitude?: number;
  longitude?: number;
  deviceManager?: string;
  channel?: string;
}

export interface SignalEntityState {
  primaryStreet?: string;
  secondaryStreet?: string;
  signalId?: number;
};

export interface ControllerTypeEntityState {
  controllerType?: string;
}

export interface CommunicationsEntityState {
  ipAddress?: string;
  port?: number;
  sshPort?: number;
  sshHostKey?: string;
  commMode?: number;
  filteredCommBad?: number;
  filteredCommMarginal?: number;
  filteredCommWeightingFactor?: number;
}

export interface PavementConditionEntityState {
  activeDays?: number;
  id?: string;
}

export interface WrongWayDriverEntityState {
  activeDays?: number;
  id?: string;
}

export interface CredentialsEntityState {
  username?: string;
  password?: string;
  snmpCommunityName?: string;
}

export interface EntitiesState {
  types: Array<EntityTypeState>;
  entities: Array<EntityTree>;
};

export interface EntityTree {
  expanded: boolean;
  id: string;
  instanceId: string;
  name: string;
  description: string;
  type: EntityTypeId;
  isCopy: boolean;
  isLeaf: boolean;
  parent: string;
  parents: string[];
  children: EntityTree[];
}

export const initialState: EntitiesState = ({
  types: [
  ],
  entities: [
  ]
});

export const entitiesSlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    LoadTypesEntities: (state, action) => {
      state.types = action.payload;
    },
    LoadEntities: (state, action) => {
      state.entities = action.payload;
    },
    ExpandNode: (state, action) => {
      //state.entities.flatMap
    },

  },
});

export const { LoadEntities, LoadTypesEntities } = entitiesSlice.actions;

export const entitiesReducer = entitiesSlice.reducer;
