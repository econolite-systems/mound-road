// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputSwitch, FormInputText, FormInputTime, FormInputOption } from '@econolite/react/forms';
import { PriorityRequestVehicleClassType } from '@econolite/shared/data-access/api-vehicle-priority';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string, boolean, date, ref } from 'yup';

export interface ScheduleTime {
  timeValue: Date;
}

export interface PriorityRequestVehicleFormData {
  id?: string | null | undefined;
  type?: string | null | undefined;
  allowed?: boolean | null | undefined;
  startTime?: Date | null | undefined;
  endTime?: Date | null | undefined;
}

/* eslint-disable-next-line */
export interface PriorityRequestVehicleProps {
  id?: string | null | undefined;
  type?: string | null | undefined;
  allowed?: boolean | null | undefined;
  startTime?: Date | null | undefined;
  endTime?: Date | null | undefined;
  types?: PriorityRequestVehicleClassType[];
}

export const priorityRequestVehicleSchema = object({
  id: string().required().optional().default(''),
  type: string().required().default('none'),
  allowed: boolean().required().default(false),
  startTime: date(),
  endTime: date().min(ref('startTime'))
});

export function PriorityRequestVehicle(
  props: PriorityRequestVehicleProps
) {
  //console.log(props.types);
  const { control } = useFormContext();
  const options: Array<FormInputOption> = props.types?.map((v) => { return { label: v.type, value: v.type } as FormInputOption }) ?? []

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="id" control={control} label="Vehicle Id" defaultValue={props.id ?? "Vehicle"} />
      <FormInputDropdown name="type" label="Type" options={options} control={control} defaultValue={props.type ?? ""} />
      <FormInputSwitch name="allowed" label="Allowed" control={control} defaultValue={props.allowed ?? false} />
      <FormInputTime name="startTime" label="Start Time" control={control} />
      <FormInputTime name="endTime" label="End Time" control={control} />
    </Box>
  );
}

export default PriorityRequestVehicle;
