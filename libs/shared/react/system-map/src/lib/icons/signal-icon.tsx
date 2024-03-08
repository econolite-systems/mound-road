// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import TrafficIcon from '@mui/icons-material/Traffic';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface SignalIconProps {
  className: string
}
export function SignalIcon(props: SignalIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<TrafficIcon />);
  const signalIcon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [25, 25],
    //html: iconMarkup,
  });
  return signalIcon;
}

export default SignalIcon;
