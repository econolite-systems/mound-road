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
  import { WrongWayDriverStatusMessageDocument, useGetWrongWayDriverStatusActiveQuery } from '@econolite/shared/data-access/api-reports';
  import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../../entities/location-marker';
  import WrongWayDriverIcon from '../../icons/wrong-way-driver-icon';

  export function WrongWayDriverLayer() {

    const { data: wwdData, isLoading, isError, refetch } = useGetWrongWayDriverStatusActiveQuery(
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

      if (wwdData && wwdData.length > 0) {
        const wrongWayDriver = wwdData as WrongWayDriverStatusMessageDocument[];
        wrongWayDriver.forEach(function (wwDriver, index) {
          if (wwDriver.latitude && wwDriver.longitude) {
            const center = [wwDriver.latitude, wwDriver.longitude] as LatLngExpression;

            const colorClass = "red";

            const wwdIcon = WrongWayDriverIcon({ className: colorClass });

            markers.push({
              key: wwDriver.location ?? `wwd${index}`,
              position: center, heading: "Wrong Way Driver", popupData: wwDriver,
              tooltip: wwDriver.location, icon: wwdIcon, type: LocationMarkerType.WrongWayDriver
            });
          }
        });
      }
      setMarkers(markers);
    }, [wwdData]);

    return (
      <LayersControl.Overlay
        checked
        name="Wrong Way Driver"
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

  export default WrongWayDriverLayer;
