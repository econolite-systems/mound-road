// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import { FormInputWithOptionsProps, FormInputOption } from './form-input-props';

export const FormInputDropdown = ({
  name,
  control,
  label,
  defaultValue,
  options,
  formParams,
  inputParams,
  onChangeOverride
}: FormInputWithOptionsProps) => {
  const generateSingleOptions = () => {
    return options.map((option: FormInputOption) => {
      return (
        <MenuItem key={option.key ? option.key : option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  const handleOnChangeOverride = (event: SelectChangeEvent) => {
    if (onChangeOverride) {
      onChangeOverride(event);
    }
    [onChangeOverride]
  };

  return (

    <Controller
      defaultValue={defaultValue}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl error={!!error} size={"small"} {...inputParams}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} onChange={(event) => { handleOnChangeOverride(event); onChange(event); }} value={value} fullWidth>
            {generateSingleOptions()}
          </Select>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
      {...formParams}
    />

  );
};

export default FormInputDropdown;
