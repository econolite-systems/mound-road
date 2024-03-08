// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const FormInputDate = ({ name, control, label, defaultValue, formParams, inputParams }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <DatePicker
            sx={{ minWidth: "150px", maxWidth: "25vw" }}
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField error={!!error} helperText={error ? error.message : null} size={"small"} {...params} />}
            {...inputParams}
          />
        )}
        {...formParams}
      />
    </LocalizationProvider>
  );
};

export default FormInputDate;
