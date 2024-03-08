// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  LayersControl,
  LayerGroup
} from 'react-leaflet';
import {
  LatLngExpression
} from 'leaflet';
import { useEffect, useState } from 'react';
import { EntityNode, useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { EssStatusDto, useGetEssStatusLatestAllQuery } from '@econolite/shared/data-access/api-reports';
import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../../entities/location-marker';
import EnvironmentalSensorIcon from '../../icons/environmental-sensor-icon';

export function EnvironmentalSensorLayer() {

  const { data: statusData, isLoading, isError, refetch } = useGetEssStatusLatestAllQuery(
    undefined,
    {
      pollingInterval: 60000
    });

  const { data: configData, isLoading: isConfigLoading, isError: isErrorFetching, refetch: isConfigRefetch } = useGetEntitiesTypesByTypeQuery({type: 'Environmental Sensor'});
  
  const [markers, setMarkers] = useState<LocationMarkerProps[]>([]);

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  // if (!isConfigLoading && isErrorFetching) 
  // {
  //   isConfigRefetch();
  // }

  useEffect(() => {
    const markers: LocationMarkerProps[] = [];

    //clear and rewrite the markers
    setMarkers([]);

    if (configData && configData.length > 0) {
      //put all the ess entities on the map
      const essEntities = configData as EntityNode[];
      essEntities.forEach(function (entity, i) {
        if (entity.geometry && entity.geometry.point && entity.geometry.point.coordinates) {
          const center = [entity.geometry.point.coordinates[1],entity.geometry.point.coordinates[0]] as LatLngExpression;

          //don't change the color per status as of now
          const colorClass = "purple";
          const sensorIcon = EnvironmentalSensorIcon({ className: colorClass });

          //get the status data if it exists
          let statusPopupData = null;
          if (statusData && statusData.length > 0) {
            //try to find the status for the device
            const essStatuses = statusData as EssStatusDto[];
            const status = essStatuses?.find(d => d.deviceId === entity.id);
            if (status) {
              statusPopupData = [
                { name: 'Precipitation', value: status.precipRate + "%" },
                { name: 'Visibility', value: status.visibility + " miles" },
                { name: 'Humidity', value: status.relativeHumidity + "%" },
                { name: 'Temperature', value: status.maxTemp }
              ]
            }
          }

          markers.push({
            key: entity.name ?? `sensorIcon${i}`,
            position: center, heading: entity.name, popupData: statusPopupData,
            tooltip: entity.name, icon: sensorIcon, type: LocationMarkerType.EnvironmentalSensor
          });
        }
      });

      setMarkers(markers);
    }
  }, [statusData, configData]);

  return (
    <LayersControl.Overlay
      checked
      name="Environmental Sensor"
    >
      <LayerGroup>
        {markers.length > 0 && markers.map((marker) => (
          <LocationMarker key={marker.key} heading={marker.heading} position={marker.position}
            icon={marker.icon} tooltip={marker.tooltip}
            popupData={marker.popupData} type={marker.type} />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

export default EnvironmentalSensorLayer;
