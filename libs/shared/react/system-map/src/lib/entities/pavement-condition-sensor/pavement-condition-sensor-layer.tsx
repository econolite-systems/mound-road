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
import { PavementConditionStatusMessageDocument, useGetPavementConditionStatusActiveQuery, PavementConditionStatusSeverity } from '@econolite/shared/data-access/api-reports';
import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../../entities/location-marker';
import PavementConditionSensorIcon from '../../icons/pavement-condition-sensor-icon';

export function PavementConditionSensorLayer() {

  const { data: pcData, isLoading, isError, refetch } = useGetPavementConditionStatusActiveQuery(
    undefined,
    {
      pollingInterval: 60000
    });
  const [markers, setMarkers] = useState<LocationMarkerProps[]>([]);

  // if (!isLoading && isError)
  // {
  //   refetch();
  // }

  useEffect(() => {
    const markers: LocationMarkerProps[] = [];

    //clear and rewrite the markers
    setMarkers([]);

    if (pcData && pcData.length > 0) {
      const pavementConditions = pcData as PavementConditionStatusMessageDocument[];
      pavementConditions.forEach(function (pcCondition, index) {
        if (pcCondition.latitude && pcCondition.longitude) {
          const center = [pcCondition.latitude, pcCondition.longitude] as LatLngExpression;

          let colorClass = "green";
          switch (pcCondition.severity) {
            case 'High': //PavementConditionStatusSeverity.High
              colorClass = "red";
              break;
            case 'Medium':  //PavementConditionStatusSeverity.Medium
              colorClass = "yellow";
              break;
            default:
              colorClass = "green";
          }
          const sensorIcon = PavementConditionSensorIcon({ className: colorClass });

          markers.push({
            key: pcCondition.location ?? `pc${index}`,
            position: center, heading: "Pavement Condition", popupData: pcCondition,
            tooltip: pcCondition.location, icon: sensorIcon, type: LocationMarkerType.PavementConditionSensor
          });
        }
      });
    }
    setMarkers(markers);
  }, [pcData]);

  return (
    <LayersControl.Overlay
      checked
      name="Pavement Condition"
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

export default PavementConditionSensorLayer;
