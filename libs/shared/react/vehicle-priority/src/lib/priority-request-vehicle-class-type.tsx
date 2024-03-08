// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string, number } from 'yup';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassTypeProps {
  id?: number | null | undefined;
  type?: string | null | undefined;
}

export const priorityRequestVehicleClassTypeSchema = object({
  id: number().min(1).max(10).optional().default(10),
  type: string().required().default('vehicle type')
});

export function PriorityRequestVehicleClassType(
  props: PriorityRequestVehicleClassTypeProps
) {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="id" control={control} label="Id" defaultValue={props.id ?? 0} />
      <FormInputText name="type" control={control} label="Vehicle Type" defaultValue={props.type ?? ""} />
    </Box>
  );
}

export default PriorityRequestVehicleClassType;
