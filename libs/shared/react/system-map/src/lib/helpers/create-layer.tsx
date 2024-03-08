// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { LayerGroup, TileLayer, WMSTileLayer } from 'react-leaflet';

export const createGoogleMapLayer = (type: 's'|'m'|'h', minZoom: number, maxZoom: number, zIndex: number) => {
  const url = "https://{s}.google.com/vt/lyrs="+type+"&x={x}&y={y}&z={z}"; 
  return <TileLayer
    url={url}
    attribution='&copy; Google'
    minZoom={minZoom}
    maxZoom={maxZoom}
    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
    zIndex={zIndex}
  />
};

export const createLayerGroupHybrid = () => {
  return <LayerGroup>
    {createGoogleMapLayer('s', 16, 21, 9)}
    {createGoogleMapLayer('h', 16, 21, 10)}
    {createGoogleMapLayer('m', 0, 16, 11)}
  </LayerGroup>
}

export const createWmsLayer = (url: string, layers: string, minZoom: number, maxZoom: number, zIndex: number, opacity: number = 1.0) => {
  return <WMSTileLayer
    url={url}
    layers={layers}
    minZoom={minZoom}
    maxZoom={maxZoom}
    zIndex={zIndex}
    format={'image/jpeg'}
    //tileSize={1024}
    //opacity={opacity}
  />
};
