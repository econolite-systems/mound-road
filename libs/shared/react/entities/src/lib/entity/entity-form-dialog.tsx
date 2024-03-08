// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNode, EntityType, EntityTypeId, EntityTypeSection, GeoJsonGeometry, GeoJsonLineStringFeature, GeoJsonPointFeature, GeoJsonPolygonFeature, GeoJsonProperties, GeoSpatialType, useGetEntitiesByIdQuery } from '@econolite/shared/data-access/api-configuration';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { entityCommonSchema } from './sections/form-entity-common';
import { activeDaysSchema } from './sections/form-entity-active-days';
import { entityCommunicationsSchema } from './sections/form-entity-communication';
import { deviceManagerChannelSelectorSchema } from './sections/form-entity-device-manager';
import { controllerSchema } from './sections/form-entity-controller';
import { ftpCredentialsSchema, ftpPasswordCredentialsSchema, ftpUserNameCredentialsSchema } from './sections/form-entity-ftp-credentials';
import { idMappingSchema } from './sections/form-entity-id-mapping';
import { primarySecondaryStreetSchema } from './sections/form-entity-primary-secondary-street';
import { DialogSlideIn } from '@econolite/dialogs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormEntityConfig from './form-entity-config';
import { AnyObjectSchema, AnySchema, lazy, object } from 'yup';
import { pointGeometrySchema } from './sections/form-entity-geometry-point';
import { entitySpeedLimitLineStringSchema, entitySpeedLimitPointSchema, entitySpeedLimitPolygonSchema } from './sections/form-entity-speedlimit';
import { entityPlansLineStringSchema, entityPlansPointSchema, entityPlansPolygonSchema } from './sections/form-entity-plans';
import { entitySnmpV3Schema } from './sections/form-entity-snmpv3';
//import { entitySnmpV3Schema } from './sections/form-entity-snmpv3';

/* eslint-disable-next-line */
export interface EntityFormDialogProps {
  data?: string;
  open: boolean;
  handleClose: () => void;
  addEntity?: (entity: EntityNode) => void;
  editEntity?: (entity: EntityNode) => void;
  isAdd: boolean;
  entityTypes: EntityType[];
  entityTypeId?: EntityTypeId;
  parentId?: string;
}

export function getSchema(entityTypes: EntityType[], entityTypeId?: string, )
{
  const result = object({});
  const entityType = entityTypes.find(t => t.id === entityTypeId);
  if (entityType)
    return buildSchemaByType(entityType);
  return result;
}

export const buildSchemaByType = (entityType: EntityType) => {
  const schemas: AnyObjectSchema[] = [];
  const sections = entityType.sections?.filter(s => s.enabled);
  if (sections)
  {
    for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const schema = getSchemaFromSection(section, entityType.spatialType ?? "None");
    schemas.push(schema);
    }
  }

  schemas.push(getSchemaFromGeometryType(entityType.spatialType ?? "None"));
  const result = merge(schemas);
  return result;
};

export function getSchemaFromGeometryType(geometryType: GeoSpatialType) {
  if (geometryType === 'Point')
  {
    return pointGeometrySchema;
  }
  return object();
}

export function getSchemaFromSection(section: EntityTypeSection, geometryType?: GeoSpatialType) {
  switch (section.id) {
    case "6326ed66-30bf-401c-9301-9775144cf25e":
      return activeDaysSchema;
    case "0d55dde1-cfe2-441b-9351-0d4405a69a25":
      return entityCommunicationsSchema;
    case "6c74ca50-69ca-4aa1-bfb8-1fbecbb53b88":
      return controllerSchema;
    case "09e717e0-c78d-46ef-ace9-1710733bc32b":
      return deviceManagerChannelSelectorSchema;
    case "e01326f7-5693-4c3c-964b-4ee57923be6d":
      return entityCommonSchema;
    case "1b5e2856-06af-48e3-aaeb-88ec7019fc66":
      {
        const schema = ftpCredentialsSchema;
        if (section.sections?.find(v => v.id === "215f0bbe-8e17-4564-83cf-ad758b40bfeb")?.enabled) {
          schema.concat(ftpUserNameCredentialsSchema);
        }
        if (section.sections?.find(v => v.id === "e5f340aa-f50c-4b71-a06f-ad0a3fcaf688")?.enabled) {
          schema.concat(ftpPasswordCredentialsSchema);
        }
        return schema;
      }
    case "a9af811d-8632-4797-9120-3aa447870edd":
      return idMappingSchema;
    case "e1f5b5a5-6733-4f13-ab25-f7a2f290bd15":
      return primarySecondaryStreetSchema;
    case "37a322ec-ba02-4f67-b4b4-8823593900d3":
      switch (geometryType) {
        case "Point":
          return entitySpeedLimitPointSchema;
        case "LineString":
          return entitySpeedLimitLineStringSchema;
        case "Polygon":
          return entitySpeedLimitPolygonSchema;
      }
      return entitySpeedLimitLineStringSchema;
    case "e0ea298f-d473-4cb4-b96d-33bf09191550":
      switch (geometryType) {
        case "Point":
          return entityPlansPointSchema;
        case "LineString":
          return entityPlansLineStringSchema;
        case "Polygon":
          return entityPlansPolygonSchema;
      }
      return entityPlansLineStringSchema;
    case "2830f4dd-9dc4-492f-804a-070c44f49fac":
      return entitySnmpV3Schema;
  }

  return object();
}

export function merge(schemas: AnyObjectSchema[]) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
}

export function CreateDefaultEntity(entityType: EntityType, parentId?: string) {
  let defaultEntity = {
    type: {
      id: entityType.id,
      name: entityType.name
    },
    parent: parentId ?? '',
    parents: [parentId ?? ''],
    description: '',
    name: ''
  } as EntityNode;

  if (entityType.spatialType === "Point") {
    defaultEntity = {
      ...defaultEntity,
      geometry: {
        type: "Point",
        point: {
          type: "Point",
          coordinates: [0, 0],
          properties: {} as GeoJsonProperties
        } as GeoJsonPointFeature
      } as GeoJsonGeometry
    };
  } else if (entityType.spatialType === "LineString") {
    defaultEntity = {
      ...defaultEntity,
      geometry: {
        type: "LineString",
        lineString: {
          type: "LineString",
          coordinates: [[0,0], [0,0]],
          properties: {} as GeoJsonProperties
        } as GeoJsonLineStringFeature
      } as GeoJsonGeometry
    };
  } else if (entityType.spatialType === "Polygon") {
    defaultEntity = {
      ...defaultEntity,
      geometry: {
        type: "Polygon",
        polygon: {
          type: "Polygon",
          coordinates: [[[0,0], [1,1], [2,2], [0,0]]],
          properties: {} as GeoJsonProperties
        } as GeoJsonPolygonFeature
      } as GeoJsonGeometry
    };
  }

  return defaultEntity;
}

export function EntityFormDialog(props: EntityFormDialogProps) {
  const [currentEntity, setCurrentEntity] = useState<EntityNode>();
  const { data, isLoading, isFetching, refetch } = useGetEntitiesByIdQuery(
    { id: props.data ?? '' },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const { data: parentData, isLoading: isLoadingParent, isFetching: isFetchingParent, refetch: refetchParent } = useGetEntitiesByIdQuery(
    { id: props.parentId ?? '' },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const schema = getSchema( props.entityTypes, props.entityTypeId?.id );
  const methods = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (props.isAdd) {
      const entityType = props.entityTypes.find(t => t.id === props.entityTypeId?.id);
      const defaultEntity = CreateDefaultEntity(entityType ?? {} as EntityType, props.parentId);
      setCurrentEntity(defaultEntity);
      //reset the form data
      methods.reset({ ...defaultEntity });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {
      setCurrentEntity(data);
      const fieldData = {
        ...data
      };
      methods.reset({ ...fieldData });
    }
  }, [data, props.isAdd]);

  const onSubmit = (fields: FieldValues) => {
    if (props.addEntity && props.isAdd) {
      methods.reset({});
      props.addEntity({...data, ...fields} as EntityNode);
    } else if (props.editEntity) {
      methods.reset({});
      props.editEntity({...data, ...fields} as EntityNode);
    }
  };

  const onClose = () => {
    refetch();
    refetchParent();
    methods.reset(schema.cast({}));
    props.handleClose();
  };

  const actions = () => (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={methods.handleSubmit(onSubmit)}
    >
      save
    </Button>
  );
  
  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title={currentEntity?.type?.name ?? "Entity"}
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {(currentEntity && (parentData || currentEntity.parent === "00000000-0000-0000-0000-000000000000")) && (
                <FormEntityConfig parent={parentData} entity={currentEntity} entityTypes={props.entityTypes} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default EntityFormDialog;
