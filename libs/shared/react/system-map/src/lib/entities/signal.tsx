// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Polygon as PolygonLeaflet, LatLngBoundsExpression } from 'leaflet';
import react, { useRef, useMemo } from 'react';
import { PolygonProps, Polygon, useMap } from 'react-leaflet'
export function Intersection(props: JSX.IntrinsicAttributes & PolygonProps & react.RefAttributes<PolygonLeaflet<any>>): JSX.Element {
  const intRef = useRef(null)
  const map = useMap();
  const eventHandlers = useMemo(
    () => ({
      click(ev: { target: { getBounds: () => LatLngBoundsExpression; }; }) {

        map.flyToBounds(ev.target.getBounds());
        console.log('intersection clicked')
        console.log(ev.target)
      },
    }),
    [],
  )

  return <Polygon ref={intRef} {...props} eventHandlers={eventHandlers} />
}
