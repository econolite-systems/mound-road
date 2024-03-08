// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import * as L from 'leaflet';
import { FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import type { FeatureCollection } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/images/spritesheet.png';
import 'leaflet-draw/dist/images/spritesheet-2x.png';
import 'leaflet-draw/dist/images/spritesheet.png';
import 'leaflet-draw/dist/images/spritesheet-2x.png';
import 'leaflet-draw/dist/images/layers.png';
import 'leaflet-draw/dist/images/layers-2x.png';
import 'leaflet-draw/dist/images/marker-icon.png';
import 'leaflet-draw/dist/images/marker-shadow.png';

interface DrawGeometryProps {
  drawType: string;
  editOptions: any;
  geoJson: FeatureCollection;
  setGeoJson: (geojson: FeatureCollection) => void;
  setDelete: (geojson: FeatureCollection) => void;
}

function DrawGeometry({drawType, editOptions, geoJson, setGeoJson, setDelete }: DrawGeometryProps) {
  const context = useMap();
  const ref = useRef<L.FeatureGroup>(null);
  
  const [drawOptions, setDrawOptions] = useState<any>({
    rectangle: false,
    circle: false,
    polyline: false,
    polygon: false,
    marker: false,
    circlemarker: false,
  });

  useEffect(() => {
    if (ref.current?.getLayers().length != 0) {
      ref.current?.clearLayers();
    }
    if (geoJson) {
      const temp = L.geoJSON(geoJson)
      
      temp.eachLayer((layer) => {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.Polygon ||
          layer instanceof L.Marker
        ) {
          layer.addEventListener('click', (event) => {
            console.log(event);
          });
          if (layer?.feature?.properties.radius && ref.current) {
            new L.Circle(layer.feature.geometry.coordinates.slice().reverse(), {
              radius: layer.feature?.properties.radius,
            }).addTo(ref.current);
          } else {
            ref.current?.addLayer(layer);
          }
        }
      });
    }
  }, [geoJson]);

  useEffect(() => {
    console.log(drawType);
    if (drawType === 'Point') {
      setDrawOptions({
        rectangle: false,
        circle: false,
        polyline: false,
        polygon: false,
        marker: true,
        circlemarker: false,
      });
    } else if (drawType === 'Polyline') {
      setDrawOptions({
        rectangle: false,
        circle: false,
        polyline: true,
        polygon: false,
        marker: false,
        circlemarker: false,
      });
    } else if (drawType === 'Polygon') {
      setDrawOptions({
        rectangle: false,
        circle: false,
        polyline: false,
        polygon: true,
        marker: false,
        circlemarker: false,
      });
    } else if (drawType === 'Circle') {
      setDrawOptions({
        rectangle: false,
        circle: true,
        polyline: false,
        polygon: false,
        marker: false,
        circlemarker: false,
      });
    } else {
      setDrawOptions({
        rectangle: false,
        circle: false,
        polyline: false,
        polygon: false,
        marker: false,
        circlemarker: false,
      });
    }
  }, [drawType]);

  const onCreated = (e: any) => {
    handleChange(e);
  };

  const handleChange = (data: any) => {
    const geo = {...ref.current?.toGeoJSON()} as FeatureCollection;

    if (geo?.type === 'FeatureCollection') {
      setGeoJson(geo);
    }
    const drawnItems = ref.current?.getLayers();
    if (drawnItems) {
      console.log(drawnItems);
      if (Object.keys(drawnItems).length > 1) {
          Object.keys(drawnItems).forEach((layerid, index) => {
              if (index > 0) return;
              const layer = drawnItems[index];
              ref.current?.removeLayer(layer);
          });
          console.log(drawnItems);
      }
    }
  };

  const onDeleted = (e: any) => {
    setDelete(geoJson);
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topleft"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={onDeleted}
        onEditStop={handleChange}
        onDeleteStop={handleChange}
        draw={drawOptions}
        edit={editOptions}
      />
    </FeatureGroup>
  )
}

export default DrawGeometry
