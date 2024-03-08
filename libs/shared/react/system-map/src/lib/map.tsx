// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  MapContainer,
  LayersControl,
  FeatureGroup,
  useMap
} from 'react-leaflet';
import {
  latLngBounds,
  LatLngExpression,
  Marker
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import {
  createGoogleMapLayer,
  createLayerGroupHybrid
} from './helpers/create-layer';
import useMapConfig from './hooks/use-map-config';
import { useEffect, useState } from 'react';
import { SearchFieldControl } from './controls/search-field';
import { EsriProvider } from 'leaflet-geosearch';
import { EasyButtonControl, EasyButtonProps } from './controls/easy-button';
import EnvironmentalSensorLayer from './entities/environmental-sensor/environmental-sensor-layer';
import PavementConditionSensorLayer from './entities/pavement-condition-sensor/pavement-condition-sensor-layer';
import VehiclePriorityLayer from './entities/vehicle-priority/vehicle-priority-layer';
import WrongWayDriverLayer from './entities/wrong-way-driver/wrong-way-driver-layer';
import SignalLayer from './entities/signals/signal-layer';
import SlowDownLayer from './entities/slowdown/slowdown-layer';
import { SignalRProvider } from '@econolite/signalr';
import { MapLegendPopup } from './entities/map-legend-popup';
import Box from '@mui/material/Box';
import { RootState, useAppConfig } from '@econolite/mound-road/data-access/global-state';

function ZoomTo(props: { zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (props.zoom) {
      map.setZoom(props.zoom);
    }
  }, []);

  return null;
}

export const Map = () => {
  const [showLegend, setShowLegend] = useState(false);
  const { config } = useAppConfig();

  //WARNING:  mapContainer props are mutable and some are not!
  const { selectedMap } = useMapConfig('Mound Rd');

  const zoomLv = 13;
  const homeButton = {
    title: 'Home',
    icon: '<i class="material-icons">home</i>',
    onClick: (btn, map) => {
      if (selectedMap) {
        map.setView(selectedMap.center ?? {lat: 0, lng: 0}, selectedMap.zoom, {animate: true, duration: 1})
      }
    }
  } as EasyButtonProps;

  const legendButton = {
    title: 'Map Legend',
    icon: '<i class="material-icons">crop_original</i>',
    onClick: (btn, map) => {
      setShowLegend(showLegend => !showLegend)
    }
  } as EasyButtonProps;

  return (
    <SignalRProvider url={`${config.serviceSettings.vehiclePriorityService}/vehicleStatusHub`}>
    <MapContainer {...selectedMap}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Streets">
          {createGoogleMapLayer('m', 0, 16, 11)}
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Hybrid">
          {createLayerGroupHybrid()}
        </LayersControl.BaseLayer>
        <FeatureGroup>
          <EnvironmentalSensorLayer />
          <PavementConditionSensorLayer />
          <VehiclePriorityLayer />
          <WrongWayDriverLayer />
          <SignalLayer />
          <SlowDownLayer />
        </FeatureGroup>
      </LayersControl>
      <SearchFieldControl provider={new EsriProvider()} />
      <EasyButtonControl {...homeButton} />
      <EasyButtonControl position="bottomleft" {...legendButton} />
      <Box>
        { showLegend ? <MapLegendPopup /> : null }
      </Box>
      <ZoomTo zoom={selectedMap?.zoom} />
    </MapContainer>
    </SignalRProvider>
  );
};

export default Map;
