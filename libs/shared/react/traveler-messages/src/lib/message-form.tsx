// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputText, FormInputDropdownMulti, FormInputNumber } from '@econolite/react/forms';
import { ItisCodeType, TimRequest } from '@econolite/shared/data-access/api-tim';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import FormGeometryPoint from './form-geometry-point';
import { set } from 'date-fns';

export interface MessageFormProps {
  transmitModes: { label: string, value: string }[];
  targets: { label: string, value: string }[]
  itisCodesTypes: ItisCodeType[];
}

function MessageForm({ transmitModes, targets, itisCodesTypes }: MessageFormProps) {
  const [itisCode, setItisCode] = useState<string>();
  const [hasDuration, setHasDuration] = useState<boolean>(false);
  const [requireMap, setRequireMap] = useState<boolean>(true);
  const [messageTypes, setMessageTypes] = useState<{ label: string, value: string }[]>([]);
  const [targetType, setTargetType] = useState<string>()
  const { control, setValue, watch } = useFormContext();

  const itisCodeOptions = itisCodesTypes.map((code) => {
    return {label: code.label, value: code.value?.toString()}
  });

  const targetOptions = [
    {label: "Devices downstream", value:"downstream"},
    {label: "Devices upstream", value:"upstream"},
    {label: "Devices in radius around source", value:"radius"},
    {label: "Devices", value:"target"}
  ]

  const style = { sx:{
      minWidth: '13rem'
    }
  }

  const selectedItisCode = watch('itisCode', itisCodeOptions[0].value);

  if (selectedItisCode != itisCode) {
    setItisCode(selectedItisCode);
    const found = itisCodesTypes?.find((code) => code.value === selectedItisCode);

    if (found && found.messageTypes) {
      const types = found.messageTypes?.map((type) => {
        return {label: type, value: type}
      });
      setHasDuration(found.fireOnce ?? false)
      setMessageTypes(types ?? []);
      setValue(`messageType`, types[0].value);
    }
  }

  const selectedTargetType = watch('targetType', targetOptions[0].value);


  if (selectedTargetType !== targetType) {
    setTargetType(selectedTargetType);
    if (selectedTargetType === 'downstream') {
      setValue(`parameters`, []);
      setValue(`target`, []);
      setRequireMap(true);
    }
    if (selectedTargetType === 'upstream') {
      setValue(`parameters`, []);
      setValue(`target`, []);
      setRequireMap(true);
    }
    if (selectedTargetType === 'radius') {
      setValue(`parameters`, []);
      setValue(`target`, []);
      setRequireMap(true);
    }
    if (selectedTargetType === 'target') {
      setValue(`parameters`, []);
      setValue(`target`, []);
      setRequireMap(false);
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormInputDropdown inputParams={style} name={`itisCode`} label="ITIS Code" options={itisCodeOptions} control={control} defaultValue={itisCodeOptions[0].value} />
        <FormInputDropdown inputParams={style} name={`messageType`} label="Message Type" options={messageTypes} control={control} defaultValue={messageTypes[0]?.value ?? ""} />
        <FormInputDropdown inputParams={style} name={`transmitMode`} label="Transmit Mode" options={transmitModes} control={control} defaultValue={transmitModes[0].value} />
        { hasDuration &&
          <>
            <FormInputDropdown inputParams={style} name={`durationType`} label="Duration Type" options={[{label: "Minutes", value: "Minutes"}, {label: "Hours", value: "Hours"}, {label: "Days", value: "Days"}, {label: "Weeks", value: "Weeks"}]} control={control} defaultValue={"Minutes"} />
            <FormInputNumber inputParams={style} name={`duration`} label="Duration" control={control} defaultValue={5} />
          </>
        }
        <FormInputDropdown inputParams={style} name={`targetType`} label="Target" options={targetOptions} control={control} defaultValue={targetOptions[0].value} />
        { selectedTargetType === 'downstream' &&
          <FormInputText inputParams={style} name={`parameters.0`} label="Downstream" control={control} defaultValue={"1"} />
        }
        { selectedTargetType === 'upstream' &&
          <FormInputText inputParams={style} name={`parameters.0`} label="Upstream" control={control} defaultValue={"1"} />
        }
        { selectedTargetType === 'radius' &&
          <FormInputText inputParams={style} name={`parameters.0`} label="Radius (miles)" control={control} defaultValue={"5"} />
        }
        { selectedTargetType === 'target' &&
          <FormInputDropdownMulti
          name={`target`}
          label="Target Intersections"
          options={targets}
          control={control}
          inputParams={style}
          defaultValue={[]}/>
        }

        { requireMap &&
          <FormGeometryPoint center={[42.53194, -83.04888]} point={[0,0]} />
        }
      </Box>
    </>
        
  );
}

export default MessageForm
