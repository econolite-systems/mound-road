// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber, FormInputText } from '@econolite/react/forms';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const BOOLEAN_OPTIONS = ['True', 'False'];

export function useFormInputsByType({ parentName, type, defaultValue, style, options }: { parentName: string, type?: string, defaultValue?: any, style?: any, options?: { label: string, value: string }[] }) {
  const [typeInput, setTypeInput] = useState<string | undefined>();
  const [formInput, setFormInput] = useState<JSX.Element | null>(null);
  const [value, setValue] = useState<any>(null);
  const { control } = useFormContext();

  if (typeInput !== type || value !== defaultValue) {
    setTypeInput(type);
    setValue(defaultValue);
    switch (type) {
      case 'boolean':
        setFormInput(
          <FormInputDropdown
            name={`${parentName}.value`}
            options={BOOLEAN_OPTIONS.map(op => ({ label: op, value: op }))}
            control={control}
            defaultValue={defaultValue}
            inputParams={style} />
        );
        break;
      case 'enum':
        setFormInput(
          <FormInputDropdown
            name={`${parentName}.value`}
            options={options ? options : []}
            control={control}
            defaultValue={defaultValue}
            inputParams={style} />
        );
        break;
      case 'number':
        setFormInput(
          <FormInputNumber
            name={`${parentName}.value`}
            control={control}
            defaultValue={defaultValue}
            inputParams={style} />
        );
        break;
      default:
        setFormInput(
          <FormInputText
            name={`${parentName}.value`}
            control={control}
            defaultValue={defaultValue}
            inputParams={style} />
        );
        break;
    }
  }

  return { formInput }
}

export default useFormInputsByType;
