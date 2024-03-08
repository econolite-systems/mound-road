// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';

export const FormInputTime = ({ name, control, label, defaultValue }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: {onChange, value},
          fieldState: { error },
        }) => (
          <TimePicker
          label={label}
          value={value}
          onChange={onChange}
          slotProps={{ textField: { helperText: error?.message } }}
        />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormInputTime;
