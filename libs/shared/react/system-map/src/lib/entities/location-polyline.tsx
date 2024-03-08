// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { LatLngExpression, Icon, DivIcon } from "leaflet";
import {
  Polyline,
  Popup,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';
import { SlowdownPopup } from "./slowdown/slowdown-popup";
import { useState } from 'react';

export enum LocationPolylineType {
  Slowdown
}

export interface LocationPolylineProps {
  heading: string | null | undefined
  position: LatLngExpression
  icon: Icon | DivIcon | undefined
  tooltip: string | null | undefined
  popupData?: any
  type: LocationPolylineType
  id?: string | null | undefined;
  key: string
  coordinates: LatLngExpression[]
  color: string
};

export function LocationPolyline(props: LocationPolylineProps) {
  const [open, setOpen] = useState(true);
  const map = useMapEvents({
    popupopen() {
      setOpen(true);
    },
    popupclose() {
      setOpen(false);
    }
  });

  return <Polyline pathOptions={{ color: props.color }} positions={props.coordinates ?? []} >
    {(props.popupData) &&
      <Popup>
        {(props.heading) &&
          <h4>{props.heading}</h4>
        }
        {(props.type === LocationPolylineType.Slowdown && open) &&
          <SlowdownPopup data={props.popupData as any[]} />
        }
      </Popup>
    }
    {(props.tooltip) &&
      <Tooltip>{props.tooltip}</Tooltip>
    }
  </Polyline>
}
