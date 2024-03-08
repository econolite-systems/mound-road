// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber, FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormDeviceManagerConfigProps {
  name?: string | null;
  dmId?: number;
  location?: string | null;
}

const alphaNumRegEx = /^[A-z 0-9]*$/;
export const deviceManagerSchema = object({
  dmId: number().min(0).integer("Please enter an integer").required(),
  name: string().matches(alphaNumRegEx, 'special characters are not allowed').required(),
  location: string().matches(alphaNumRegEx, 'special characters are not allowed').required(),
});

export function FormDeviceManagerConfig(props: FormDeviceManagerConfigProps) {
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="name" control={control} label="Name" defaultValue={props.name} />
      <FormInputNumber name="dmId" control={control} label="Number" defaultValue={props.dmId ?? 0} />
      <FormInputText name="location" control={control} label="Location" defaultValue={props.location} />
    </Box>
  );
}

export default FormDeviceManagerConfig;
