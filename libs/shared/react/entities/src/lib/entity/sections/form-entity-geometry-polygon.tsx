// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { array, number, object, string } from 'yup';
import { FeatureCollection, Feature } from 'geojson';
import { MapEditGeometry } from '@econolite/system-map';
import { GeoJsonPolygonFeature, GeoJsonPointFeature } from '@econolite/shared/data-access/api-configuration';
import { set } from 'date-fns';

/* eslint-disable-next-line */
export interface FormEntityGeometryPolygonProps {
  center: number[];
  geometry?: GeoJsonPolygonFeature;
};

export const pointSchema = object({
  type: string(),
  coordinates: array().of(number())
});

export const geometrySchema = object({
  type: string(),
  point: pointSchema
});

export const pointGeometrySchema = object({
  geometry: geometrySchema
});

const coodinatesToFeatureCollection = (geometry?: GeoJsonPolygonFeature | null) => {
  if (!(geometry && geometry.coordinates && geometry.coordinates[0] && geometry.coordinates[0][0] && geometry.coordinates[0][0][0] !== 0)) {
    return {
      type: "FeatureCollection",
      features: []
    } as FeatureCollection;
  }
  return {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      id: "geometry",
      properties: geometry?.properties ?? { },
      geometry: geometry
    }]
  } as FeatureCollection;
};

export function FormEntityGeometryPolygon(props: FormEntityGeometryPolygonProps) {
  const [ addCoordinates, setAddCoordinates ] = useState(
    props.geometry &&
    props.geometry.coordinates &&
    props.geometry.coordinates[0][0] &&
    props.geometry.coordinates[0][0][0] !== 0 ? true : false);
  const [ latitude, setLatitude ] = useState(props.center[0]);
  const [ longitude, setLongitude ] = useState(props.center[1]);
  const [ feature, setFeature ] = useState(coodinatesToFeatureCollection(props.geometry));
  const [ center, setCenter ] = useState([latitude, longitude]); // TODO: set center to first coordinate in props.geometry.coordinates
  const { control, watch, setValue } = useFormContext();

  const handleAddCoordinates = () => {
    setValue("geometry.type", "Polygon")
    setValue("geometry.polygon.type", "Polygon")
    if (props.geometry?.properties?.intersection ||
        props.geometry?.properties?.destination ||
        props.geometry?.properties?.speedLimit ||
        props.geometry?.properties?.bearing ||
        props.geometry?.properties?.phases) {
    setValue("geometry.polygon.properties", props.geometry?.properties)
  }
    setValue("geometry.polygon.coordinates", props.geometry?.coordinates)
    setAddCoordinates(true);
  }

  const handleRemoveCoordinates = () => {
    setValue("geometry.polygon.coordinates", [[[0,0], [1,1], [2,2], [0,0]]]);
    setAddCoordinates(false);
  }

  useEffect(() => {
    const f = feature.features[0] as Feature;
    if (f && f.geometry)
    {
      const geometry = f.geometry as GeoJsonPolygonFeature;
      if (geometry.coordinates && geometry.coordinates[0] && geometry.coordinates[0][0] && geometry.coordinates[0][0][0] !== 0) {
        setValue("geometry.polygon.coordinates", geometry.coordinates);
      }
      if (props.geometry?.properties?.intersection ||
          props.geometry?.properties?.destination ||
          props.geometry?.properties?.speedLimit ||
          props.geometry?.properties?.bearing ||
          props.geometry?.properties?.phases) {
      setValue("geometry.polygon.properties", props.geometry?.properties)
    }
    }
    
  }, [feature]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      { (addCoordinates) && 
      (
        <>
          <Button onClick={handleRemoveCoordinates}>Remove Geometry</Button>
        </>
      )}
      { !addCoordinates && (
        <Button onClick={handleAddCoordinates}>Add Geometry</Button>
      )}
      { (addCoordinates && center && feature) && (
        <Box sx={{height: '800px'}}>
        <MapEditGeometry addType={'Polygon'} updateFeatures={setFeature} features={feature} center={[latitude, longitude]} zoom={19}/>
        </Box>
      )}
    </Box>
  );
}

export default FormEntityGeometryPolygon;
