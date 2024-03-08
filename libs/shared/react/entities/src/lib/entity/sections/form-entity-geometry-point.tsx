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
import { GeoJsonPointFeature, GeoJsonPolygonFeature } from '@econolite/shared/data-access/api-configuration';
import { set } from 'date-fns';

/* eslint-disable-next-line */
export interface FormEntityGeometryPointProps {
  center: number[];
  geometry?: GeoJsonPointFeature;
  geofence?: GeoJsonPolygonFeature;
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

const coodinatesToFeatureCollection = (geometry?: GeoJsonPointFeature | null, geofence?: GeoJsonPolygonFeature | null) => {
  const collection = {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      id: "geometry",
      properties: geometry?.properties ?? { },
      geometry: geometry
    }]
  } as FeatureCollection;

  if (!(geometry && geometry.coordinates && geometry.coordinates[0] !== 0) && !geofence) {
    return {
      type: "FeatureCollection",
      features: []
    } as FeatureCollection;
  }

  if (geometry && geometry.coordinates && geometry.coordinates[0] !== 0) {
    collection.features.push({
      type: "Feature",
      id: "geometry",
      properties: { },
      geometry: geometry
    } as Feature);
  }

  if (geofence) {
    collection.features.push({
      type: "Feature",
      id: "geofence",
      properties: { },
      geometry: geofence
    } as Feature);
  }

  return collection;
};

export function FormEntityGeometryPoint(props: FormEntityGeometryPointProps) {
  const [ addCoordinates, setAddCoordinates ] = useState(props.geometry && props.geometry.coordinates && props.geometry.coordinates[0] !== 0 && props.geometry.coordinates.length >= 2 ? true : false);
  const [ latitude, setLatitude ] = useState(props.center[0]);
  const [ longitude, setLongitude ] = useState(props.center[1]);
  const [ feature, setFeature ] = useState(coodinatesToFeatureCollection(props.geometry));
  const { control, watch, setValue } = useFormContext();

  const handleAddCoordinates = () => {
    setValue("geometry.type", "LineString")
    setValue("geometry.point.type", "Point")
    if (props.geometry?.properties?.speedLimit || props.geometry?.properties?.bearing || props.geometry?.properties?.phases)
    {
      setValue("geometry.lineString.properties", props.geometry?.properties)
    }
    setValue("geometry.point.coordinates", props.geometry?.coordinates)
    setAddCoordinates(true);
  }

  const handleRemoveCoordinates = () => {
    setValue("geometry.point.coordinates", [0, 0]);
    setAddCoordinates(false);
  }

  useEffect(() => {
    const f = feature.features[0] as Feature;
    if (f && f.geometry)
    {
      const geometry = f.geometry as GeoJsonPointFeature;
      if (geometry && geometry.coordinates && geometry.coordinates[0] !== 0 && geometry.coordinates.length >= 2) {
        setValue("geometry.point.coordinates[0]", geometry.coordinates[0]);
        setValue("geometry.point.coordinates[1]", geometry.coordinates[1]);
      }

      if (props.geometry?.properties?.intersection ||
          props.geometry?.properties?.destination ||
          props.geometry?.properties?.speedLimit ||
          props.geometry?.properties?.bearing ||
          props.geometry?.properties?.phases) {
        setValue("geometry.lineString.properties", props.geometry?.properties)
      }
    }
  }, [feature]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      { (addCoordinates) && 
      (
        <>
          <Button onClick={handleRemoveCoordinates}>Remove Coordinate</Button>
        </>
      )}
      { !addCoordinates && (
        <Button onClick={handleAddCoordinates}>Add Coordinate</Button>
      )}
      { addCoordinates && (
        <Box sx={{height: '400px'}}>
        <MapEditGeometry addType={'Point'} updateFeatures={setFeature} features={feature} backgroundFeatures={coodinatesToFeatureCollection(null, props.geofence)} center={[latitude, longitude]} zoom={19}/>
        </Box>
      )}
    </Box>
  );
}

export default FormEntityGeometryPoint;
