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
import { useGetSpeedStatusAllQuery, SpeedStatusModel } from '@econolite/shared/data-access/api-speed-status';
import { LocationPolyline, LocationPolylineProps, LocationPolylineType } from '../../entities/location-polyline';
import SlowdownIcon from '../../icons/slowdown-icon';
import { amber, green, red } from '@mui/material/colors';

export function SlowdownLayer() {

  const { data: configData, isLoading, isError, refetch } = useGetSpeedStatusAllQuery(
    undefined,
    {
      pollingInterval: 60000
    });
  const [polylines, setPolylines] = useState<LocationPolylineProps[]>([]);

  //if (!isLoading && isError) {
  //  refetch();
  //}

  useEffect(() => {
    const polylines: LocationPolylineProps[] = [];

    //clear and rewrite the polylines
    setPolylines([]);

    if (configData && configData.length > 0) {
      const slowdownConditions = configData as SpeedStatusModel[];
      slowdownConditions.forEach(function (slowdownCondition, index) {
        if (slowdownCondition.latitude && slowdownCondition.longitude) {
          const center = [slowdownCondition.latitude, slowdownCondition.longitude] as LatLngExpression;

          const colorClass = getColorClassFromSegmentSpeed(slowdownCondition.segmentSpeed);
          const slowdownIcon = SlowdownIcon({ className: `slowdown-${colorClass}` });

          polylines.push({
            key: slowdownCondition.location ?? `slowdownIcon${index}`,
            position: center, heading: "Slowdown Condition", popupData: slowdownCondition,
            tooltip: slowdownCondition.location, icon: slowdownIcon, type: LocationPolylineType.Slowdown,
            coordinates: slowdownCondition?.coordinates as LatLngExpression[], color: colorClass
          });
        }
      });
    }
    setPolylines(polylines);
  }, [configData]);
  return (
    <LayersControl.Overlay
      checked
      name="Slowdown Condition"
    >
      <LayerGroup>
        {polylines.length > 0 && polylines.map((polyline) => (
          <LocationPolyline key={polyline.key} heading={polyline.heading} position={polyline.position}
            icon={polyline.icon} tooltip={polyline.tooltip}
            popupData={polyline.popupData} type={polyline.type}
            coordinates={polyline.coordinates} color={polyline.color} />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

function getColorClassFromSegmentSpeed(segmentSpeed: number = 0) {
  let colorClass = green[500].toString();
  if (segmentSpeed <= 35) {
    colorClass = amber[500].toString();
  }
  if (segmentSpeed <= 25) {
    colorClass = red[500].toString();
  }
  return colorClass;
}

export default SlowdownLayer;
