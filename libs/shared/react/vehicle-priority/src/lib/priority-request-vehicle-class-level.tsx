// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputText, FormInputOption } from '@econolite/react/forms';
import { PriorityRequestVehicleClassType } from '@econolite/shared/data-access/api-vehicle-priority';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string, number } from 'yup';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassLevelProps {
  id?: number | null | undefined;
  type?: string | null | undefined;
  types?: PriorityRequestVehicleClassType[];
}

export const priorityRequestVehicleClassLevelSchema = object({
  id: number().min(0).max(10).optional().default(10),
  type: string().required().default('none')
});

export function PriorityRequestVehicleClassLevel(
  props: PriorityRequestVehicleClassLevelProps
) {
  const { control } = useFormContext();
  const options: Array<FormInputOption> = props.types?.map((v) => { return { label: v.type, value: v.type } as FormInputOption }) ?? []
  // [
  //   { label: "Eos", value: "Eos" }
  // ]
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="id" control={control} label="Priority" defaultValue={props.id ?? 0} />
      <FormInputDropdown name="type" label="type" options={options} control={control} defaultValue={props.type ?? ""} />
    </Box>
  );
}

export default PriorityRequestVehicleClassLevel;
