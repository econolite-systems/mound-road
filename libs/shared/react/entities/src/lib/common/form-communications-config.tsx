// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber, FormInputText, FormInputOption, ipv4 } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string, number } from 'yup';

/* eslint-disable-next-line */
export interface FormCommunicationsConfigProps {
  ipAddress?: string | null | undefined;
  port?: number | null | undefined;
  sshPort?: number | null | undefined;
  sshHostKey?: string | null | undefined;
  commMode?: number | null | undefined;
  filteredCommBad?: number | null | undefined;
  filteredCommMarginal?: number | null | undefined;
  filteredCommWeightingFactor?: number | null | undefined;
  isShowSSHPort?: boolean | null | undefined;
  isShowSSHKey?: boolean | null | undefined;
};

export const communicationsSchema = object({
  ipAddress: ipv4.required(),
  port: number().min(0).max(65535).required(),
  sshPort: number().min(0).max(65535),
  sshHostKey: string().optional(),
  commMode: number().min(0).max(2).required(),
  filteredCommBad: number().min(0).max(100).optional(),
  filteredCommMarginal: number().min(0).max(100).optional(),
  filteredCommWeightingFactor: number().min(0).max(100).optional(),
});

export function FormCommunicationsConfig(props: FormCommunicationsConfigProps) {
  const { control } = useFormContext();

  const commModeOptions: Array<FormInputOption> = [
    { label: "Online", value: "0" },
    { label: "Offline", value: "1" },
    { label: "Standby", value: "2" }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="ipAddress" control={control} label="IP Address" defaultValue={props.ipAddress ?? "0.0.0.0"} />
      <FormInputNumber name="port" control={control} label="Port" defaultValue={props.port ?? 161} />
      {props.isShowSSHPort &&
        <FormInputNumber name="sshPort" control={control} label="SSH Port" defaultValue={props.sshPort ?? 22} />
      }
      {props.isShowSSHKey &&
        <FormInputText name="sshHostKey" control={control} label="SSH Host Key" defaultValue={props.sshHostKey ?? ""} />
      }
      <FormInputDropdown name="commMode" label="Mode" options={commModeOptions} control={control} defaultValue={props.commMode ?? 0} />
      <FormInputNumber name="filteredCommBad" control={control} label="Filtered Comm Bad" defaultValue={props.filteredCommBad ?? 3} />
      <FormInputNumber name="filteredCommMarginal" control={control} label="Filtered Comm Marginal" defaultValue={props.filteredCommMarginal ?? 3} />
      <FormInputNumber name="filteredCommWeightingFactor" control={control} label="Filtered Comm Weighting Factor" defaultValue={props.filteredCommWeightingFactor ?? 3} />
    </Box>
  );
}

export default FormCommunicationsConfig;
