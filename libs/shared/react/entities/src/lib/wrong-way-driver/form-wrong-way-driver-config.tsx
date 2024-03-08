// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object } from 'yup';

/* eslint-disable-next-line */
export interface FormWrongWayDriverProps {
  activeDays?: number | null | undefined;
}

export const formWrongWayDriverSchema = object({
  activeDays: number().optional().min(1).max(365).default(1)
});

function FormWrongWayDriverConfig({activeDays}: FormWrongWayDriverProps) {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 2 }}>
      <FormInputNumber
            name="activeDays"
            label="Number of Days an Incident will be Active"
            defaultValue={activeDays}
            control={control}
          />
    </Box>
  );
}

export default FormWrongWayDriverConfig;
