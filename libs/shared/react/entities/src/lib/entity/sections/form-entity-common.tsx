// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityCommonProps {
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export const entityCommonSchema = object({
  entityTypeId: string(),
  name: string().min(1).max(25).required().label('Name'),
  description: string().max(60).label('Description')
});

export function FormEntityCommon(props: FormEntityCommonProps) {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="name" control={control} label="Name" defaultValue={props.name ?? null} />
      <FormInputText name="description" control={control} label="Description" defaultValue={props.description ?? null} />
    </Box>
  )
}

export default FormEntityCommon;
