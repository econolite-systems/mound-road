// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNode, EntityType, EntityTypeId, GeoJsonLineStringFeature, GeoJsonPointFeature, GeoJsonPolygonFeature } from '@econolite/shared/data-access/api-configuration';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormEntityPropertiesConfig from './form-entity-properties-config';
import { Polygon, Position } from '@turf/helpers';
import center from '@turf/center-of-mass';

const getCenterFromGeometry = (geometry?: GeoJsonPointFeature | GeoJsonLineStringFeature | GeoJsonPolygonFeature | null) => {
  let result = [42.53194, -83.04888] as number[];

  if (geometry && geometry.type === "Point") {
    const point = geometry as GeoJsonPointFeature;
    if (point.coordinates && point.coordinates[0] && point.coordinates[1])
    {
      const lat = point.coordinates[1];
      const lon = point.coordinates[0];
      result = [lat, lon] as number[];
    }
  }
  if (geometry && geometry.type === "LineString") {
    const lineString = geometry as GeoJsonLineStringFeature;
    if (lineString.coordinates && lineString.coordinates[0])
    {
      result = [lineString.coordinates[0][1] as number, lineString.coordinates[0][0] as number] as number[];
    }
  }
  if (geometry && geometry.type === "Polygon" && geometry.coordinates && geometry.coordinates[0]) {
    const polygon = geometry as GeoJsonPolygonFeature;
    if (polygon.coordinates && polygon.coordinates)
    {
      var feature = {type: "Polygon", coordinates: polygon.coordinates.map(p1 => p1.map(p2 => p2 as Position))} as Polygon;
      var centroid = center(feature);
      const lat = centroid.geometry?.coordinates[1];
      const lon = centroid.geometry?.coordinates[0];
      result = [lat, lon] as number[];
    }
  }
  return result;
};

function getSpatialType(entity: EntityNode, entityTypes: EntityType[]) {
  const entityType = entityTypes.find(e => e.id === entity.type?.id);
  const spatialType = entityType?.spatialType ?? 'None';
  return spatialType;
}

function getGeometry(entity: EntityNode, entityTypes: EntityType[]) {
  let geometry: GeoJsonPointFeature | GeoJsonLineStringFeature | GeoJsonPolygonFeature | null = null;
  const spatialType = getSpatialType(entity, entityTypes);

  switch (spatialType) {
    case "Point":
      geometry = entity.geometry?.point as GeoJsonPointFeature;
      break;
    case "LineString":
      geometry = entity.geometry?.lineString as GeoJsonLineStringFeature;
      break;
    case "Polygon":
      geometry = entity.geometry?.polygon as GeoJsonPolygonFeature;
      break;
  }
  return geometry;
}
/* eslint-disable-next-line */
export interface FormEntityConfigProps {
  parent?: EntityNode,
  entity: EntityNode,
  entityTypes: EntityType[]
}

export function FormEntityConfig(props: FormEntityConfigProps) {
  const [entityTypes, setEntityTypes] = useState<EntityType[]>(props.entityTypes);
  const [currentEntityType, setCurrentEntityType] = useState<EntityType | undefined | null>(entityTypes.find(e => e.id === props.entity.type?.id));
  const [center, setCenter] = useState<number[]>();
  const { control, watch } = useFormContext();

  useEffect(() => {
    console.log(props.parent);
    if(props.parent)
    {
      let geometry: GeoJsonPointFeature | GeoJsonLineStringFeature | GeoJsonPolygonFeature | null = getGeometry(props.parent, props.entityTypes);
      if (!geometry){
        geometry = getGeometry(props.entity, props.entityTypes);
      }
      setCenter(getCenterFromGeometry(geometry));
    } else if(props.entity) {
      let geometry: GeoJsonPointFeature | GeoJsonLineStringFeature | GeoJsonPolygonFeature | null = getGeometry(props.entity, props.entityTypes);
      setCenter(getCenterFromGeometry(geometry));
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      {(currentEntityType && center && props.entity) &&
      (
        <FormEntityPropertiesConfig center={center} entity={props.entity} entityType={currentEntityType} />
      )
      }
    </Box>
  );
}

export default FormEntityConfig;
