// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { MapsState, MapState } from '@econolite/shared/data-access/map-state';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseMapConfig {
  selectedMap?: MapState;
  maps: MapsState;
}

export function useMapConfig(id?: string): UseMapConfig {
  const maps = useSelector((state: any) => state.maps as MapsState);
  const selectedMap = useSelector((state: any) => {
    const maps = state.maps as MapsState;
    let map: MapState | undefined;
    if(id) {
      map = maps.maps.find((v) => v.id === id);
    } else if(maps.maps && maps.maps.length > 0) {
      map = maps.maps[0];
    }
    return map;
  });
  return { selectedMap, maps };
}

export default useMapConfig;
