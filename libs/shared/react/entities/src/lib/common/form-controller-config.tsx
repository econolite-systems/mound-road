// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputOption } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';


/* eslint-disable-next-line */
export interface FormControllerConfigProps {
  subType: string;
};

export const controllerSchema = object({
  subType: string()
});

export function FormControllerConfig(props: FormControllerConfigProps) {
  const { control } = useFormContext();

  const signalTypeOptions: Array<FormInputOption> = [
    { label: "ASC/3", value: "Asc3" },
    { label: "Cobalt", value: "Cobalt" },
    { label: "EOS", value: "Eos" },
    { label: "ESS", value: "Ess" }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputDropdown name="subType" label="Type" options={signalTypeOptions} control={control} defaultValue={props.subType ?? "Asc3"} />
    </Box>
  );
}

export default FormControllerConfig;
