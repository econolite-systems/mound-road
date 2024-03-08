// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface TrafficSlowdownIconProps {
  className: string
}

export function TrafficSlowdownIcon(props: TrafficSlowdownIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<HourglassEmptyIcon />);
  const sensorIcon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [25, 25],
    html: iconMarkup,
  });
  return sensorIcon;
}

export default TrafficSlowdownIcon;
