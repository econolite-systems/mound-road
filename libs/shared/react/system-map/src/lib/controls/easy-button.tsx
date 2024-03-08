// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import 'leaflet-easybutton/src/easy-button';
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-easybutton/src/easy-button.css';
import L, { ControlOptions } from 'leaflet';
import 'material-icons/iconfont/material-icons.css';
import './easy-button-icons.css'


export interface EasyButtonProps extends ControlOptions {
  title?: string,
  icon: string,
  onClick: (btn: L.Control.EasyButton, map: L.Map) => void
}

export const EasyButtonControl = createControlComponent<L.Control.EasyButton, EasyButtonProps>(
  function createControl(props) {
    return L.easyButton(props.icon, props.onClick, props.title);
  }
);
