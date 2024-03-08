// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { number, object, string } from 'yup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { PhaseModel } from '@econolite/shared/data-access/api-configuration';

/* eslint-disable-next-line */
export interface FormEntityBearingProps {
  parentName: string;
  bearing?: string;
}

export const entityBearingSchema = object({
  bearing: string().oneOf(['NB', 'EB', 'SB', 'WB', 'NEB', 'SEB', 'SWB', 'NWB']),
});

export function FormEntityBearing(props: FormEntityBearingProps) {
  const methods = useFormContext();

  return (
    <FormInputDropdown
      name={`${props.parentName}.bearing`}
      label="Bearing"
      options={[
        { label: 'NB', value: 'NB' },
        { label: 'EB', value: 'EB' },
        { label: 'SB', value: 'SB' },
        { label: 'WB', value: 'WB' },
        { label: 'NEB', value: 'NEB' },
        { label: 'SEB', value: 'SEB' },
        { label: 'SWB', value: 'SWB' },
        { label: 'NWB', value: 'NWB' },
      ]}
      control={methods.control}
    />
  );
}

export default FormEntityBearing;
