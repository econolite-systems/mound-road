// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormInputProps {
  name: string;
  control: any;
  label?: string;
  setValue?: any;
  type?: string;
  defaultValue?: any;
  formParams?: any;
  inputParams?: any;
  onChangeOverride?: any;
}

export interface FormInputRangeProps extends FormInputProps {
  min?: number;
  max?: number;
  step?: number;
}

export interface FormInputWithOptionsProps extends FormInputProps {
  options: Array<FormInputOption> | Array<any>;
}

export interface FormInputOption {
  label: string;
  key?: string | number;
  value?: any;
}
