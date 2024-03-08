// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputDropdownMulti, FormInputNumber, FormInputText } from '@econolite/react/forms';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';
import { ActionProps } from './action-form';

export const actionTimSchema = object({
  action: string().optional().default(''),
});

function ActionTim({ parentName, actions, action, targets, itisCodesTypes }: ActionProps) {
  const [itisCode, setItisCode] = useState<string>();
  const [targetType, setTargetType] = useState<string>()
  const [hasDuration, setHasDuration] = useState<boolean>(false);
  const [messageTypes, setMessageTypes] = useState<{ label: string, value: string }[]>([]);
  const { control, setValue ,watch } = useFormContext();

  const itisCodeOptions = itisCodesTypes?.map((code) => {
    return {label: code.label, value: code.value?.toString()}
  }) ?? [] as {label: string, value: string}[];

  const selectedItisCode = watch(`${parentName}.info`, itisCodeOptions[0].value);

  if (selectedItisCode != itisCode) {
    setItisCode(selectedItisCode);
    const found = itisCodesTypes?.find((code) => code.value === selectedItisCode);

    if (found && found.messageTypes) {
      const types = found.messageTypes?.map((type) => {
        return {label: type, value: type}
      });
      setHasDuration(found.fireOnce ?? false)
      setMessageTypes(types ?? []);
      setValue(`${parentName}.messageType`, types[0].value);
    }
  }

  const selectedTargetType = watch(`${parentName}.targetType`);

  if (selectedTargetType !== targetType) {
    setTargetType(selectedTargetType);
    if (targetType && targetType === 'downstream') {
      setValue(`${parentName}.parameter`, []);
      setValue(`${parentName}.target`, []);
    }
    if (targetType && targetType === 'upstream') {
      setValue(`${parentName}.parameter`, []);
      setValue(`${parentName}.target`, []);
    }
    if (targetType && targetType === 'radius') {
      setValue(`${parentName}.parameter`, []);
      setValue(`${parentName}.target`, []);
    }
    if (targetType && targetType === 'target') {
      setValue(`${parentName}.parameter`, []);
      setValue(`${parentName}.target`, []);
    }
  }

  const transmitModes = [ {label: "Alternating", value: "Alternating"}, {label: "Continuous", value: "Continuous"},]

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

  return (
    <>
        <Grid container item sx={{alignItems: 'center', gap: 2}}>
          <FormInputDropdown inputParams={style} name={`${parentName}.actionType`} label="Action" options={actions} control={control} defaultValue={action ?? ""} />
          <FormInputDropdown inputParams={style} name={`${parentName}.info`} label="Parameter" options={itisCodeOptions} control={control} defaultValue={itisCodeOptions[0].value} />
          <FormInputDropdown inputParams={style} name={`${parentName}.messageType`} label="Message Type" options={messageTypes} control={control} defaultValue={messageTypes[0]?.value ?? ""} />
          <FormInputDropdown inputParams={style} name={`${parentName}.transmitMode`} label="Transmit Mode" options={transmitModes} control={control} defaultValue={transmitModes[0].value} />
        </Grid>
        { hasDuration &&
          <Grid container item sx={{alignItems: 'center', gap: 2}}>
            <FormInputDropdown inputParams={style} name={`${parentName}.durationType`} label="Duration Type" options={[{label: "Minutes", value: "Minutes"}, {label: "Hours", value: "Hours"}, {label: "Days", value: "Days"}, {label: "Weeks", value: "Weeks"}]} control={control} defaultValue={"Minutes"} />
            <FormInputNumber inputParams={style} name={`${parentName}.duration`} label="Duration" control={control} defaultValue={"5"} />
          </Grid>
        }
        <Grid container item sx={{alignItems: 'center', gap: 2}}>
          <FormInputDropdown inputParams={style} name={`${parentName}.targetType`} label="Target" options={targetOptions} control={control} defaultValue={targetOptions[0].value} />
          { selectedTargetType === 'downstream' &&
            <FormInputNumber inputParams={style} name={`${parentName}.parameter.0`} label="Downstream" control={control} defaultValue={"1"} />
          }
          { selectedTargetType === 'upstream' &&
            <FormInputNumber inputParams={style} name={`${parentName}.parameter.0`} label="Upstream" control={control} defaultValue={"1"} />
          }
          { selectedTargetType === 'radius' &&
            <FormInputNumber inputParams={style} name={`${parentName}.parameter.0`} label="Radius (Miles)" control={control} defaultValue={action ?? "5"} />
          }
          { selectedTargetType === 'target' &&
            <FormInputDropdownMulti
            name={`${parentName}.parameter`}
            label="Target Intersections"
            options={targets}
            control={control}
            inputParams={style}
            defaultValue={[]}/>
          }
        </Grid>
    </>
        
  );
}

export default ActionTim
