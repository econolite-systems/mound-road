// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';
import TextField from '@mui/material/TextField'

export const FormInputNumber= ({name, control, label, defaultValue, formParams, inputParams}: FormInputProps) => {
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
        <TextField
          id={name}
          label={label}
          type="number"
          size={"small"}
          value={value}
          onChange={onChange}
          variant='outlined'
          error={!!error}
          helperText={error ? error.message : null}
          {...inputParams}
        />
      )}
      {...formParams}
    />
  );
}

export default FormInputNumber
