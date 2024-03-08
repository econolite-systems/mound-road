// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller } from 'react-hook-form';
import { FormInputWithOptionsProps, FormInputOption } from './form-input-props';

export const FormInputRadio = ({
  name,
  control,
  label,
  defaultValue,
  options,
  formParams,
  inputParams
}: FormInputWithOptionsProps) => {
  const generateRadioOptions = () => {
    return options.map((singleOption: FormInputOption) => (
      <FormControlLabel
        key={singleOption.key ? singleOption.key : singleOption.value}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl error={!!error} component="fieldset" {...inputParams}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
          <FormHelperText>{error ? error.message : null}</FormHelperText>
        </FormControl>
      )}
      {...formParams}
    />
  );
};

export default FormInputRadio;
