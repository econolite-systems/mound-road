// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import SensorsIcon from '@mui/icons-material/Sensors';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface EnvironmentalStatusIconProps {
  className: string
}
export function EnvironmentalSensorIcon(props: EnvironmentalStatusIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<SensorsIcon />);
  const sensorIcon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [25, 25],
    html: iconMarkup,
  });
  return sensorIcon;
}

export default EnvironmentalSensorIcon;
