// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityIdMappingProps {
  idMapping?: number | null | undefined;
};

export const idMappingSchema = object({
  idMapping: number().required().label('Id')
});

export function FormEntityIdMapping(props: FormEntityIdMappingProps) {
  const { control } = useFormContext();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputNumber name="idMapping" control={control} label="Id" defaultValue={props.idMapping ?? 101} />
    </Box>
  )
}

export default FormEntityIdMapping;
