// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface BusIconProps {
  className: string,
  isAlert: boolean,
  isBoarding: boolean
}
export function BusIcon(props: BusIconProps) {
  const iconMarkup = SelectIcon(props);
  const icon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [24, 24],
    html: iconMarkup,
  });
  return icon;
}

function SelectIcon(props: BusIconProps) {
  let iconMarkup = "unknown";

  if (props.isAlert) {
    iconMarkup = ReactDOMServer.renderToString(<BusAlertIcon />);
  } else if (props.isBoarding) {
    iconMarkup = ReactDOMServer.renderToString(<DepartureBoardIcon />);
  } else {
    iconMarkup = ReactDOMServer.renderToString(<DirectionsBusIcon />);
  }
  
  return iconMarkup;
}

export default BusIcon;
