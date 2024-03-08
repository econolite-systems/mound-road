// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import {
  LayersControl,
  LayerGroup
} from 'react-leaflet';
import {
  LatLngExpression
} from 'leaflet';
import { useEffect, useState } from 'react';
import { EntityNode, useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../../entities/location-marker';
import SignalIcon from '../../icons/signal-icon';
import { useGetSignalStatusPointQuery } from '@econolite/shared/data-access/api-signal-status';

export function SignalLayer() {
  const { data: configData, isLoading: isConfigLoading, isError: isErrorFetching, refetch: isConfigRefetch } = useGetEntitiesTypesByTypeQuery({type: 'Signal'});
  const { data: signalsStatus, isLoading: isSignalStatusLoading, error: signalStatusError, isError: isSignalStatusError, refetch: signalStatusRefetch } = useGetSignalStatusPointQuery(
    undefined,
    {
      pollingInterval: 60000
    }
  );

  // if (!isConfigLoading && isErrorFetching) 
  // {
  //   isConfigRefetch();
  // }

  // if (!isSignalStatusLoading && isSignalStatusError) 
  // {
  //   signalStatusRefetch();
  // }

  const [markers, setMarkers] = useState<LocationMarkerProps[]>([]);

  useEffect(() => {
    //clear and rewrite the markers
    setMarkers([]);
    if (isConfigLoading || isSignalStatusLoading) return;
    if (!configData || configData.length <= 0) return;

    const markers: LocationMarkerProps[] = [];
    configData.forEach((signal: EntityNode) => {
      if (signal.geometry && signal.geometry.point && signal.geometry.point.coordinates) {
        const center = [signal.geometry.point.coordinates[1], signal.geometry.point.coordinates[0]] as LatLngExpression;
        const status = signalsStatus?.find((status) => status.id === signal.id)?.state ?? "Offline";
        const signalPriority = false;
        const signalIcon = SignalIcon({ className: `signal-${status.toLowerCase()} ${signalPriority ? 'signal-priority' : ''}` });

        markers.push({
          position: center, heading: `Signal: ${signal.name}`, popupData: signal.id,
          tooltip: signal.name, icon: signalIcon, type: LocationMarkerType.Signal,
          key: signal.id ?? ""
        });
      }
    });
    setMarkers(markers);
  }, [configData, signalsStatus]);

  return (
    <LayersControl.Overlay
      checked
      name="Signal"
    >
      <LayerGroup>
        {markers.length > 0 && markers.map((marker) => (
          <LocationMarker heading={marker.heading} position={marker.position}
          icon={marker.icon} tooltip={marker.tooltip}
          popupData={marker.popupData} type={marker.type} key={marker.key} />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

export default SignalLayer;
