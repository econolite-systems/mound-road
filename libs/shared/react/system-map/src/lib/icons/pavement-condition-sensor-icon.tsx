// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReactDOMServer from 'react-dom/server';
import { divIcon } from 'leaflet';

export interface PavementConditionIconProps {
  className: string
}
export function PavementConditionIcon(props: PavementConditionIconProps) {
  const iconMarkup = ReactDOMServer.renderToString(<WarningAmberIcon />);
  const sensorIcon = divIcon({
    className: props.className,
    iconAnchor: [12, 12],
    popupAnchor: [0, -15],
    iconSize: [25, 25],
    html: iconMarkup,
  });
  return sensorIcon;
}

export default PavementConditionIcon;
