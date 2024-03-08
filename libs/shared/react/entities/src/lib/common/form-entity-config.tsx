// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

export interface FormEntityConfigProps {
  name?: string | null | undefined;
  description?: string | null | undefined;
}

export const entitySchema = object({
  name: string().required().default(''),
  description: string().required().default(''),
});

export function FormEntityConfig(props: FormEntityConfigProps) {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="name" control={control} label="Name" defaultValue={props.name ?? ""} />
      <FormInputText name="description" control={control} label="Description" defaultValue={props.description ?? ""} />
    </Box>
  )
}

export default FormEntityConfig
