// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
//import { LayerProps } from '@react-leaflet/core';
import { createSlice } from '@reduxjs/toolkit';
import { LatLngExpression, TileLayer } from 'leaflet';
import { MapContainerProps } from 'react-leaflet';
//import internal from 'stream';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MapState extends MapContainerProps {
}

export interface MapsState {
  maps: Array<MapState>;
};

const initialState: MapsState = {
  maps: [
    { id: 'Mound Rd', center: [42.53194, -83.04888] as LatLngExpression, zoom: 11, scrollWheelZoom: true },
    { id: 'Denver', center: [39.7392, -104.9903] as LatLngExpression, zoom: 9, scrollWheelZoom: true },
    { id: 'Colorado Springs', center: [38.87533344413089, -104.77965401291634] as LatLngExpression, zoom: 11, scrollWheelZoom: true }
  ]
};

export const mapSlice = createSlice({
  name: "maps",
  initialState: initialState,
  reducers: {
    LoadMaps: (state, action) => {
      state.maps = action.payload;
    },
  }
});

const { LoadMaps } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
