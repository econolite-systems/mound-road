// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';

export const FormInputSwitch= ({name, control, label, defaultValue, formParams, inputParams}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ 
        field: {onChange, value},
        fieldState: { error },
        formState,
      }) => (
        <FormControl error={!!error} {...inputParams}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Switch
            id={name}
            checked={value}
            onChange={onChange}
          />
        </FormControl>
      )}
      {...formParams}
    />
  );
}

export default FormInputSwitch
