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
import { GeoJsonPointFeature } from '@econolite/shared/data-access/api-configuration';
import { set } from 'date-fns';

/* eslint-disable-next-line */
export interface FormGeometryPointProps {
  center: number[];
  point: number[];
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

const coodinatesToFeatureCollection = (coordinate?: number[] | null) => {
  const geometry = {
    type: "Point",
    coordinates: coordinate
  }
  const collection = {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      id: "geometry",
      geometry: geometry
    }]
  } as FeatureCollection;

  if (!(geometry && geometry.coordinates && geometry.coordinates[0] !== 0)) {
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

  return collection;
};

export function FormGeometryPoint(props: FormGeometryPointProps) {
  const [ latitude, setLatitude ] = useState(props.center[0]);
  const [ longitude, setLongitude ] = useState(props.center[1]);
  const [ feature, setFeature ] = useState(coodinatesToFeatureCollection(props.point));
  const { setValue } = useFormContext();

  useEffect(() => {
    const f = feature.features[0] as Feature;
    if (f && f.geometry)
    {
      const geometry = f.geometry as GeoJsonPointFeature;
      if (geometry && geometry.coordinates && geometry.coordinates[0] !== 0 && geometry.coordinates.length >= 2) {
        setValue("longitude", geometry.coordinates[0]);
        setValue("latitude", geometry.coordinates[1]);
      }
    }
  }, [feature]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <Box sx={{height: '400px'}}>
        <MapEditGeometry addType={'Point'} updateFeatures={setFeature} features={feature} backgroundFeatures={coodinatesToFeatureCollection(null)} center={[latitude, longitude]} zoom={14}/>
      </Box>
    </Box>
  );
}

export default FormGeometryPoint;
