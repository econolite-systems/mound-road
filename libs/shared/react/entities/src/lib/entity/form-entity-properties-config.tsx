// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNode, EntityType, EntityTypeSection, GeoJsonLineStringFeature, GeoJsonPointFeature, GeoJsonPolygonFeature } from '@econolite/shared/data-access/api-configuration';
import { Label } from '@mui/icons-material';
import FormEntityActiveDays from './sections/form-entity-active-days';
import FormEntityCommunication from './sections/form-entity-communication';
import FormEntityController from './sections/form-entity-controller';
import FormEntityFtpCredentials from './sections/form-entity-ftp-credentials';
import FormEntityDeviceManager from './sections/form-entity-device-manager';
import FormEntityCommon from './sections/form-entity-common';
import FormEntityIdMapping from './sections/form-entity-id-mapping';
import FormEntityPrimarySecondaryStreet from './sections/form-entity-primary-secondary-street';
import FormDeviceManagerChannelSelector from '../common/form-device-manager-channel-selector';
import FormEntityGeometryPoint from './sections/form-entity-geometry-point';
import FormEntitySnmpV3 from './sections/form-entity-snmpv3';
import FormEntityGeometryLineString from './sections/form-entity-geometry-linestring';
import { useEffect } from 'react';
import FormEntityGeometryPolygon from './sections/form-entity-geometry-polygon';
import FormEntityPlans from './sections/form-entity-plans';
import FormEntityBearing from './sections/form-entity-bearing';
import FormEntitySpeedLimit from './sections/form-entity-speedlimit';



/* eslint-disable-next-line */
export interface FormEntityPropertiesConfigProps {
  center: number[];
  entityType: EntityType
  entity: EntityNode
}

export function FormEntityPropertiesConfig(
  props: FormEntityPropertiesConfigProps
) {

  useEffect(() => {
    console.log(props.center);
  }, []);

  const deviceManangerUpdate = (id: string) => { console.log(id) };

  function getForm(form: EntityTypeSection, entity: EntityNode) {
    let username = false;
    let password = false;

    switch (form.id) {
      case "6326ed66-30bf-401c-9301-9775144cf25e":
        return (<FormEntityActiveDays {...entity} />);
      case "0d55dde1-cfe2-441b-9351-0d4405a69a25":
        return (<FormEntityCommunication {...entity} />);
      case "6c74ca50-69ca-4aa1-bfb8-1fbecbb53b88":
        return (<FormEntityController controllerType={entity?.controllerType ?? ''} />);
      case "09e717e0-c78d-46ef-ace9-1710733bc32b":
        return (<FormDeviceManagerChannelSelector {...entity} />);
      // return (<FormEntityDeviceManager deviceManangerUpdate={deviceManangerUpdate} deviceManagers={[]} channels={[]} {...entity} />)
      case "e01326f7-5693-4c3c-964b-4ee57923be6d":
        return (<FormEntityCommon {...entity} />);
      case "1b5e2856-06af-48e3-aaeb-88ec7019fc66":
        if (form.sections?.find(v => v.id === "215f0bbe-8e17-4564-83cf-ad758b40bfeb")?.enabled) {
          username = true;
        }
        if (form.sections?.find(v => v.id === "e5f340aa-f50c-4b71-a06f-ad0a3fcaf688")?.enabled) {
          password = true;
        }
        return (<FormEntityFtpCredentials isShowPassword={password} isShowUser={username} />);
      case "a9af811d-8632-4797-9120-3aa447870edd":
        return (<FormEntityIdMapping {...entity} />);
      case "e1f5b5a5-6733-4f13-ab25-f7a2f290bd15":
        return (<FormEntityPrimarySecondaryStreet {...entity} />);
      case "2830f4dd-9dc4-492f-804a-070c44f49fac":
        return (<FormEntitySnmpV3 {...entity} />);
      case "e0ea298f-d473-4cb4-b96d-33bf09191550":
        if (props.entity.geometry && props.entity.geometry.point) {
          return (<FormEntityPlans parentName={`geometry.point.properties`} {...props.entity.geometry?.point?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.lineString) {
          return (<FormEntityPlans parentName={`geometry.lineString.properties`} {...props.entity.geometry?.lineString?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.polygon) {
          return (<FormEntityPlans parentName={`geometry.polygon.properties`} {...props.entity.geometry?.polygon?.properties} />);
        }
        break;
      case "446f023a-5d1b-4ed8-a926-b7fa16a1d519":
        if (props.entity.geometry && props.entity.geometry.point) {
          return (<FormEntityBearing parentName={`geometry.point.properties`} {...props.entity.geometry?.point?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.lineString) {
          return (<FormEntityBearing parentName={`geometry.lineString.properties`} {...props.entity.geometry?.lineString?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.polygon) {
          return (<FormEntityBearing parentName={`geometry.polygon.properties`} {...props.entity.geometry?.polygon?.properties} />);
        }
        break;
      case "37a322ec-ba02-4f67-b4b4-8823593900d3":
        if (props.entity.geometry && props.entity.geometry.point) {
          return (<FormEntitySpeedLimit parentName={`geometry.point.properties`} {...props.entity.geometry?.point?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.lineString) {
          return (<FormEntitySpeedLimit parentName={`geometry.lineString.properties`} {...props.entity.geometry?.lineString?.properties} />);
        }
        if (props.entity.geometry && props.entity.geometry.polygon) {
          return (<FormEntitySpeedLimit parentName={`geometry.polygon.properties`} {...props.entity.geometry?.polygon?.properties} />);
        }
        break;
      }
        return (null);
    };

    const getPoint = () => {
      if (props.entity.geometry && props.entity.geometry.point && props.entity.geometry.point.coordinates) {
        return <FormEntityGeometryPoint center={props.center} geometry={props.entity.geometry.point} geofence={props.entity.geoFence} />;
      } else {
        return <FormEntityGeometryPoint center={props.center} geometry={props.entity.geometry?.point ?? undefined} />;
      }
    };

    const getLineString = () => {
      if (props.entity.geometry && props.entity.geometry.lineString && props.entity.geometry.lineString.coordinates) {
        return <FormEntityGeometryLineString center={props.center} geometry={props.entity.geometry.lineString} geofence={props.entity.geoFence} />;
      } else {
        return <FormEntityGeometryLineString center={props.center} geometry={props.entity.geometry?.lineString ?? undefined} />;
      }
    };

    const getPolygon = () => {
      if (props.entity.geometry && props.entity.geometry.polygon && props.entity.geometry.polygon.coordinates) {
        return <FormEntityGeometryPolygon center={props.center} geometry={props.entity.geometry.polygon} />;
      } else {
        return <FormEntityGeometryPolygon center={props.center} geometry={props.entity.geometry?.polygon ?? undefined}/>;
      }
    };
    return (
      <>
        {props.entityType.sections?.map((s) => (
          s.enabled ? getForm(s, props.entity) : null
        )
        )}
        {props.entityType.spatialType === 'Point' && (
          getPoint()
        )}
        {props.entityType.spatialType === 'LineString' && (
          getLineString()
        )}
        {props.entityType.spatialType === 'Polygon' && (
          getPolygon()
        )}
      </>
    );
  }

export default FormEntityPropertiesConfig;
