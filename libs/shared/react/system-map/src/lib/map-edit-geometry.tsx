// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LayersControl,
  MapContainer,
  TileLayer,
  GeoJSON,
  FeatureGroup,
  useMap,
  LayerGroup,
} from 'react-leaflet';
import { createLayerGroupHybrid } from './helpers/create-layer';
import DrawGeometry from './draw-geometry';
import { FeatureCollection } from 'geojson';
import L, { LatLng } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import useMapConfig from './hooks/use-map-config';

function ZoomTo(props: { zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (props.zoom) {
      map.setZoom(props.zoom);
    }
  }, []);

  return null;
}

export interface MapEditGeometryProps {
  features?: FeatureCollection;
  backgroundFeatures?: FeatureCollection;
  updateFeatures?: (features: FeatureCollection) => void;
  center: [number, number];
  zoom?: number;
  addType?: string;
}

function DisplayPosition({
  map,
  center,
  zoom,
}: {
  map: any;
  center: [number, number];
  zoom: number;
}) {
  const [position, setPosition] = useState(center);

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    const center = map.getCenter();
    setPosition([center.lat, center.lng]);
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position[0].toFixed(7)}, longitude: {position[1].toFixed(7)} ,
      zoom: {map.getZoom()}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

const EmptyFeatureCollection = () => {
  return {
    type: 'FeatureCollection',
    features: [],
  } as FeatureCollection;
};

const PointFeatureCollection = () => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'testId',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [-83.0472891, 42.5207944],
        },
      },
    ],
  };
};

export function MapEditGeometry({
  features,
  backgroundFeatures,
  updateFeatures,
  center,
  zoom = 19,
  addType = '',
}: MapEditGeometryProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [editLayer, setEditLayer] = useState<
    L.Polyline | L.Polygon | L.Marker | L.Circle | null
  >(null);
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection>(
    features ?? EmptyFeatureCollection()
  );
  const [geoJsonDataResult, setGeoJsonDataResult] = useState<FeatureCollection>(
    EmptyFeatureCollection()
  );
  const [geoJson, setGeoJson] = useState<FeatureCollection>(
    EmptyFeatureCollection()
  );
  const [toRemove, setToRemove] = useState<FeatureCollection>();
  const [drawType, setDrawType] = useState<string>(addType);
  const [editing, setEditing] = useState<boolean>(false);
  const [editOptions, setEditOptions] = useState<any>({
    edit: false,
    remove: false,
  });

  var backgroundStyle = {
    color: '#ff7800',
    opacity: 0.1,
  };

  const { selectedMap } = useMapConfig('Mound Rd');
  // Linestring center default is [0,0]
  // Polygon center default is [1,1]
  if (selectedMap && (center[0] === 0 && center[1] === 0) || (center[0] === 1 && center[1] == 1)) {
    center = selectedMap?.center as [number, number];
    zoom = selectedMap?.zoom as number;
  }

  useEffect(() => {
    if (map && geoJsonData) {
      const currentFeatures = [...geoJsonDataResult.features];
      geoJsonData.features.forEach((feature) => {
        const index = currentFeatures.findIndex((f) => f.id === feature.id);
        if (index !== -1) {
          currentFeatures[index] = feature;
        } else {
          currentFeatures.push(feature);
        }
      });

      const data = EmptyFeatureCollection();
      data.features = currentFeatures;
      updateFeatures && updateFeatures(data);

      L.geoJSON(geoJsonData).eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          
          layer.addEventListener('click', (event) => {
            setEditLayer(layer);
          });
          if (layer?.feature?.properties.radius && map) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius,
            }).addTo(map);
          } else {
            map?.eachLayer((l) => {
              if (
                l instanceof L.Polyline ||
                l instanceof L.Polygon ||
                l instanceof L.Marker
              ) {
                if (l?.feature?.id === layer?.feature?.id) {
                  l.removeEventListener('click');
                  map?.removeLayer(l);
                }
              }
            });
            map?.addLayer(layer);
          }
        }
      });
    }
  }, [map, geoJsonData]);

  useEffect(() => {
    if (editOptions.edit) {
      console.log('editing');
      updateGeoJson(geoJson);
    }
    if (editLayer === null) return;
    const featureCollection = EmptyFeatureCollection();
    const json = { ...editLayer.toGeoJSON() };
    featureCollection.features.push(json);
    setGeoJson(featureCollection);
    setEditOptions({
      edit: {},
      remove: {},
    });
    //setDrawType('');
    map?.removeLayer(editLayer);
    setEditing(true);
  }, [editLayer]);

  const updateGeoJson = (geojson: FeatureCollection) => {
    setEditOptions({
      edit: false,
      remove: false,
    });
    if (geojson && geojson.features.length > 0) {
      const data = EmptyFeatureCollection();
      const feature = { ...geojson.features[0] };
      feature.id = feature.id ?? uuidv4();
      data.features.push(feature);

      setGeoJsonData(data);
      const newData = EmptyFeatureCollection();
      setGeoJson(newData);
    }
  };

  useEffect(() => {
    if (geoJson && geoJson.features.length > 0) {
      const data = EmptyFeatureCollection();
      const feature = { ...geoJson.features[0] };
      setEditOptions({
        edit: false,
        remove: false,
      });
      const currentFeatures = [...geoJsonDataResult.features];
      const index = currentFeatures.findIndex((f) => f.id === feature.id);
      if (index === -1) return;
      currentFeatures.splice(index, 1);
      data.features = currentFeatures;
      updateFeatures && updateFeatures(data);

      const newData = EmptyFeatureCollection();
      setGeoJson(newData);
    }
  }, [toRemove]);

  useEffect(() => {
    console.log(center, zoom);
  }, [center, zoom]);

  return (
    <>
      {/* {(map && center && zoom) ? <DisplayPosition map={map} center={center} zoom={zoom} /> : null} */}
      {center && zoom && (
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={true}
          ref={setMap}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Hybrid">
              {createLayerGroupHybrid()}
            </LayersControl.BaseLayer>
            {backgroundFeatures && (
              <LayersControl.Overlay name="Geofence">
                <LayerGroup>
                  <GeoJSON
                    data={backgroundFeatures}
                    style={backgroundStyle}
                    interactive={false}
                  />
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>
          <DrawGeometry
            editOptions={editOptions}
            drawType={drawType}
            geoJson={geoJson}
            setGeoJson={updateGeoJson}
            setDelete={setToRemove}
          />
          
          <ZoomTo zoom={zoom} />
        </MapContainer>
      )}
    </>
  );
}

export default MapEditGeometry;
