// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import { Controller } from 'react-hook-form';
import { FormInputRangeProps } from './form-input-props';

export const FormInputSlider = ({
  name,
  control,
  setValue,
  defaultValue,
  label,
  min,
  max,
  step,
  formParams,
  inputParams
}: FormInputRangeProps) => {
  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field:{ value, onChange }, fieldState: { error }, formState }) => (
          <Slider
            value={value}
            onChange={onChange}
            valueLabelDisplay="auto"
            min={min ?? 0}
            max={max ?? 100}
            step={step ?? 1}
            {...inputParams}
          />
        )}
        {...formParams}
      />
    </>
  );
};

export default FormInputSlider;
