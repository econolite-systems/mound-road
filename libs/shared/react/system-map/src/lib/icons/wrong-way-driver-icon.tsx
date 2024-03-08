// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import CarCrashIcon from '@mui/icons-material/CarCrash';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface WrongWayDriverIconProps {
  className: string
}
export function WrongWayDriverIcon(props: WrongWayDriverIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<CarCrashIcon />);
  const wwdIcon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [25, 25],
    html: iconMarkup,
  });
  return wwdIcon;
}

export default WrongWayDriverIcon;
