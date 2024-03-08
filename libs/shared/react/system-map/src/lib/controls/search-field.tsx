// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { GeoSearchControl } from 'leaflet-geosearch';
//import * as L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-geosearch/assets/css/leaflet.css';
import { SearchControlOptions } from 'leaflet-geosearch/dist/SearchControl';

// Allow any, otherwise compiler complains about unable to get information for non-exported interface from leaflet-geosearch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SearchFieldControl: any = createControlComponent(
// If the above has issues, attempt done below to better specify type
//export const SearchFieldControl: any = createControlComponent<L.Control, SearchControlOptions>(
  function createSearchControl(props: SearchControlOptions) {
    return GeoSearchControl({
      position: 'bottomright',
      showMarker: true,
      marker: {
        draggable: true,
      },
      maxMarker: 1,
      autoClose: true,
      autoComplete: true,
      retainZoomLevel: false,
      maxSuggestions: 5,
      keepResult: true,
      resultFormat: function(t: any) {
        return "" + t.result.label;
      },
      updateMap: !0,
      style: 'bar',
      provider: props.provider
    });
  }
);
