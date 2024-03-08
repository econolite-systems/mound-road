// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityPrimarySecondaryStreetProps {
  primary?: string | null | undefined;
  secondary?: string | null | undefined;
};

export const primarySecondaryStreetSchema = object({
  primary: string().min(1).max(50).optional().nullable().label('Primary Street'),
  secondary: string().min(1).max(50).optional().nullable().label('Secondary Street')
});
export function FormEntityPrimarySecondaryStreet(
  props: FormEntityPrimarySecondaryStreetProps
) {
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="primary" control={control} label="Primary Street" defaultValue={props.primary ?? null} />
      <FormInputText name="secondary" control={control} label="Secondary Street" defaultValue={props.secondary ?? null} />
    </Box>
  )
}

export default FormEntityPrimarySecondaryStreet;
