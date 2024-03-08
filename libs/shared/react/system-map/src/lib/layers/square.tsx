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

export interface SquareProps extends PathWithChildrenProps {
  center: LatLngExpression,
  size: number
}

function getBounds(props: SquareProps) {
  return L.latLng(props.center).toBounds(props.size)
}

function createSquare(props: SquareProps, context: LeafletContextInterface) {
  const square = new L.Rectangle(getBounds(props))
  return createElementObject(
    square,
    extendContext(context, { overlayContainer: square })
  )
}

function updateSquare(instance:L.Rectangle, props:SquareProps , prevProps:SquareProps) {
  if (props.center !== prevProps.center || props.size !== prevProps.size) {
    instance.setBounds(getBounds(props))
  }
}

export const Square = createPathComponent<L.Rectangle, SquareProps>(createSquare, updateSquare)
