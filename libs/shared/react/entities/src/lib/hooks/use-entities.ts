// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityState } from '@econolite/entities-state';
import { useSelector } from 'react-redux';

export function useEntities() {
  const types = useSelector((state: any) => state.entities.types);
  const entities = useSelector((state: any) => state.entities.entities);
  const signals = useSelector((state: any) => (state.entities.entities as EntityState[]).filter(e => e.type.id === 'Signal'));
  const systems = useSelector((state: any) => (state.entities.entities as EntityState[]).filter(e => e.type.id === 'System'));
  const currentEntity = useSelector((state: any) => state.entities.currentEntity);
  return { types, entities, currentEntity };
}

export default useEntities;
