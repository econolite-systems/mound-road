// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityActiveDaysProps {
  activeDays?: number | null | undefined;
};

export const activeDaysSchema = object({
  activeDays: number()
});

export function FormEntityActiveDays(props: FormEntityActiveDaysProps) {
  const methods = useFormContext();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputNumber name="activeDays" control={methods.control} label="Active Days" defaultValue={props.activeDays ?? ""} />
    </Box>
  )
}

export default FormEntityActiveDays;
