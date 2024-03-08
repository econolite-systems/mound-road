// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { LatLngExpression, Icon, DivIcon } from "leaflet";
import {
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import { EnvironmentalSensorMapPopup } from "./environmental-sensor/environmental-sensor-map-popup";
import { PavementConditionSensorPopup } from "./pavement-condition-sensor/pavement-condition-sensor-popup";
import VehiclePriorityPopup from './vehicle-priority/vehicle-priority-popup';
import WrongWayDriverPopup from "./wrong-way-driver/wrong-way-driver-popup";
import { SignalStatusPopup } from './signals/signal-status-popup';
import Box from '@mui/material/Box';
import { useState } from 'react';

export enum LocationMarkerType {
  EnvironmentalSensor,
  Signal,
  PavementConditionSensor,
  Vehicle,
  WrongWayDriver
}

export interface LocationMarkerProps {
  heading: string | null | undefined
  position: LatLngExpression
  icon: Icon | DivIcon | undefined
  tooltip: string | null | undefined
  popupData?: any
  type: LocationMarkerType
  id?: string | null | undefined;
  key: string
};

export function LocationMarker(props: LocationMarkerProps) {
  const [open, setOpen] = useState(true);
  const map = useMapEvents({
    popupopen() {
      setOpen(true);
    },
    popupclose() {
      setOpen(false);
    }
  });

  return <Marker position={props.position} icon={props.icon}>
    {(props.popupData) &&
      <Popup>
        {(props.heading) &&
          <h4>{props.heading}</h4>
        }
        {(props.type === LocationMarkerType.EnvironmentalSensor && open) &&
          <EnvironmentalSensorMapPopup data={props.popupData as any[]} />
        }
        {(props.type === LocationMarkerType.PavementConditionSensor && open) &&
          <PavementConditionSensorPopup data={props.popupData as any[]} />
        }
        {(props.type === LocationMarkerType.Vehicle && open) &&
          <VehiclePriorityPopup data={props.popupData as any[]} />
        }
        {(props.type === LocationMarkerType.WrongWayDriver && open) &&
          <WrongWayDriverPopup data={props.popupData as any[]} />
        }
        {(props.type === LocationMarkerType.Signal && open) &&
          <Box sx={{ width: 525 }}><SignalStatusPopup id={props.popupData as string} /></Box>
        }
      </Popup>
    }
    {(props.tooltip) &&
      <Tooltip>{props.tooltip}</Tooltip>
    }
  </Marker>
}
