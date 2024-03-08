// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  PathProps,
  LeafletContextInterface,
  createPathComponent
} from '@react-leaflet/core'
import { createElementObject } from '../helpers/element'
import { extendContext } from '../helpers/context'
import L, { LatLngExpression } from 'leaflet'
import { ReactNode, useEffect, useRef } from 'react'
import { PathWithChildrenProps } from '../helpers/generic';
import { PolylineProps } from 'react-leaflet';

export interface ApproachProps extends PolylineProps,PathWithChildrenProps {
  center: LatLngExpression,
  size: number
}

function create(props: ApproachProps, context: LeafletContextInterface) {
  const square = new L.Polyline(props.positions)
  return createElementObject(
    square,
    extendContext(context, { overlayContainer: square })
  )
}

function update(instance:L.Polyline, props:ApproachProps , prevProps:ApproachProps) {
  if (props.positions !== prevProps.positions) {
    instance.setLatLngs(props.positions)
  }
}

export const Approach = createPathComponent<L.Polyline, ApproachProps>(create, update)
