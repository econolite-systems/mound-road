// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInputDropdownMulti } from '@econolite/react/forms';

export function useEssMultiSelect({name, label, style}:{name: string, label?: string, style?: any}) {
  const [formInput, setFormInput] = useState<JSX.Element | null>(null);
  const { control } = useFormContext();
  const { data, isLoading, isError } = useGetEntitiesTypesByTypeQuery({ type: 'Environmental Sensor' });

  useEffect(() => {
    if (!isLoading && data && !isError) {
      const options = data.map(ess => ({ label: ess.name, value: ess.id }));
      setFormInput(<FormInputDropdownMulti
              name={name}
              label={label ? label : "Environment Sensors"}
              options={options}
              control={control}
              inputParams={style} />);
    }
  }, [control, data, isError, isLoading, label, name, style])

  return { formInput }
}

export default useEssMultiSelect; 
