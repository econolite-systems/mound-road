// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { FormInputWithOptionsProps, FormInputOption } from './form-input-props';

export const FormInputAutoComplete = ({
  name,
  control,
  label,
  defaultValue,
  options,
  formParams,
  inputParams
}: FormInputWithOptionsProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error }
      }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option: FormInputOption) => option.label}
          onChange={(_, data: any) => onChange(data)}
          value={value}
          renderInput={(params) => <TextField {...params} label={label} error={!!error} />}
          {...inputParams}
        />
      )}
      {...formParams}
    />
  );
};

export default FormInputAutoComplete;
