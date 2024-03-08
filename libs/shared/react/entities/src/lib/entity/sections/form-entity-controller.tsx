// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputOption } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityControllerProps {
  controllerType: string | null | undefined;
};

export const controllerSchema = object({
  controllerType: string().oneOf(["Asc3", "Cobalt", "Eos", "Ess"]).required()
});

export function FormEntityController(props: FormEntityControllerProps) {
  const { control } = useFormContext();

  const signalTypeOptions: Array<FormInputOption> = [
    { label: "ASC/3", value: "Asc3" },
    { label: "Cobalt", value: "Cobalt" },
    { label: "EOS", value: "Eos" },
    { label: "ESS", value: "Ess" }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputDropdown name="controllerType" label="Type" options={signalTypeOptions} control={control} defaultValue={props.controllerType ?? "Ess"} />
    </Box>
  );
}

export default FormEntityController;
