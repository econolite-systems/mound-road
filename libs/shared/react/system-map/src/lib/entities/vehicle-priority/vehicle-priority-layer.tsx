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
import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../location-marker';
import VehiclePriorityIcon from '../../icons/vehicle-priority-icon';
import { useSignalR } from '@econolite/signalr';
import BusIcon from '../../icons/bus-icon';

export interface SignalStatus {
  id: string
  type: string
  name: string
  latitude: number
  longitude: number
  status: string
  prs: Array<PriorityStatus>
  tag: string
  stop: boolean
};

export interface PriorityStatus {
  priorityRequestStatus: number
  requestId: number
  strategyNumber: number
  vehicleClassType: number
  vehicleClassLevel: number
  vehicleId: string
}

export interface VehicleLocationStatus {
  id: string
  type: string
  name: string
  latitude: number
  longitude: number
  direction: number
  speed: number
  tag: string
  stop: boolean
};

export function VehiclePriorityLayer() {
  const [markers, setMarkers] = useState<LocationMarkerProps[]>([]);

  const [signalStatus, setSignalStatus] = useState<SignalStatus[]>([]);
  const [vehicleLocationStatus, setVehicleLocationStatus] = useState<VehicleLocationStatus[]>([]);

  useSignalR(
    "signalStatusUpdate",
    (json) => {
      const message: SignalStatus = JSON.parse(json);
      const index = signalStatus.findIndex(msg => msg.id === message.id);
      if (index >= 0) {
        signalStatus[index] = message;
        setSignalStatus([...signalStatus]);
      }
      else {
        setSignalStatus([...signalStatus, message]);
      }
      
      //console.log(signalStatus);
    },
    [signalStatus],
  );

  useSignalR(
    "vehicleLocationStatus",
    (json) => {
      const message: VehicleLocationStatus = JSON.parse(json);
      const index = vehicleLocationStatus.findIndex(msg => msg.id === message.id);
      if (index >= 0) {
        vehicleLocationStatus[index] = message;
        setVehicleLocationStatus([...vehicleLocationStatus]);
      }
      else {
        setVehicleLocationStatus([...vehicleLocationStatus, message]);
      }
      
      //console.log(vehicleLocationStatus);
    },
    [vehicleLocationStatus],
  );

//   useEffect(() => {
//     signalStatus.forEach(function (entity) {
//       if (entity.latitude && entity.longitude) {
//         const center = [entity.latitude,entity.longitude] as LatLngExpression;

//         let colorClass = '';
//         switch(entity.status){
//           case "Online":
//             colorClass = '';
//             break;
//           case "Priority":
//             colorClass = 'signal-priority';
//         }

//         let sensorIcon = VehiclePriorityIcon({ className: colorClass });

//         if (entity.type === 'Signal') 
//         {
//           sensorIcon = VehiclePriorityIcon({className: colorClass})
//         }
        
//         const statusPopupData = [
//           { name: 'Status', value: entity.status },
//           { name: 'Prs', value: entity.prs[0].priorityRequestStatus === 4 ? "Active" : "Not Active" },
//           { name: 'Strategy', value: entity.prs[0].strategyNumber }
//         ]
//         const marker = {
//           key: entity.id,
//           id: entity.id,
//           position: center, heading: entity.name, popupData: null,
//           tooltip: `${entity.type} - ${entity.name}`, icon: sensorIcon, type: LocationType.Vehicle
//         }
//         const index = markers.findIndex(msg => msg.id === entity.id);
//         if(index >= 0) {
//           markers[index] = marker;
//         } else {
//           markers.push(marker);
//         }
//       }
//     });

//     setMarkers([...markers]);
// }, [signalStatus]);

useEffect(() => {
  vehicleLocationStatus.forEach(function (entity) {
    if (entity.latitude && entity.longitude) {
      const center = [entity.latitude,entity.longitude] as LatLngExpression;

      const colorClass = "purple";
      let sensorIcon = VehiclePriorityIcon({ className: colorClass });

      if (entity.type === 'bus') 
      {
        sensorIcon = BusIcon({className: colorClass, isAlert: false, isBoarding: false})
      }
      
      const statusPopupData = [
        { name: 'Direction', value: entity.direction },
        { name: 'Speed', value: entity.speed.toFixed(0) + " mph" }
      ]
      const marker = {
        key: entity.id,
        id: entity.id,
        position: center, heading: entity.name, popupData: statusPopupData,
        tooltip: `${entity.type} - ${entity.name}`, icon: sensorIcon, type: LocationMarkerType.Vehicle
      }
      const index = markers.findIndex(msg => msg.id === entity.id);
      if(index >= 0 && !entity.stop) {
        markers[index] = marker;
      } else if (index >= 0 && entity.stop){
        markers.splice(index, 1);
      } else if (!entity.stop) {
        markers.push(marker);
      }
    }
  });

  setMarkers([...markers]);
}, [vehicleLocationStatus]);

  return (
    <LayersControl.Overlay
      checked
      name="Vehicle Priority"
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

export default VehiclePriorityLayer;
