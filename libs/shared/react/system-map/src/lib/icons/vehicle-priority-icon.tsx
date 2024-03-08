// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import SignalIcon from '@mui/icons-material/Brightness1';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface VehiclePriorityIconProps {
  className: string
}
export function VehiclePriorityIcon(props: VehiclePriorityIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<SignalIcon />);
  const icon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [24, 24],
    //html: iconMarkup,
  });
  return icon;
}

export default VehiclePriorityIcon;
