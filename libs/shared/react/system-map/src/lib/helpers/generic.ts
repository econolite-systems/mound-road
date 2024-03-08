// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  PathProps,
  LayerProps
} from '@react-leaflet/core'
import { PropsWithChildren } from './component';

export interface LayerWithChildrenProps extends LayerProps, PropsWithChildren {}
export interface PathWithChildrenProps extends PathProps, PropsWithChildren {}
