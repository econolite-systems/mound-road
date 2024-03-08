// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber, FormInputText, FormInputOption, ipv4 } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityCommunicationProps {
  ipAddress?: string | null | undefined;
  port?: number | null | undefined;
  sshPort?: number | null | undefined;
  sshHostKey?: string | null | undefined;
  commMode?: string | null | undefined;
  filteredCommBad?: number | null | undefined;
  filteredCommMarginal?: number | null | undefined;
  filteredCommWeightingFactor?: number | null | undefined;
  isShowSSHPort?: boolean | null | undefined;
  isShowSSHKey?: boolean | null | undefined;
};

export const entityCommunicationsSchema = object({
  ipAddress: ipv4.required(),
  port: number().min(0).max(65535).required().label('Port'),
  sshPort: number().min(0).max(65535).optional().label('SSH Port'),
  sshHostKey: string().optional().label('SSH Host Key'),
  commMode: string().oneOf(["Online", "Offline", "Standby"]).required().label('Mode'),
  filteredCommBad: number().min(0).max(100).optional().label('Filtered comm bad'),
  filteredCommMarginal: number().min(0).max(100).optional().label('Filtered comm marginal'),
  filteredCommWeightingFactor: number().min(0).max(100).optional().label('Filtered comm weighting factor'),
});

export function FormEntityCommunication(props: FormEntityCommunicationProps) {
  const { control } = useFormContext();

  const commModeOptions: Array<FormInputOption> = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
    { label: "Standby", value: "Standby" }
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
      <FormInputDropdown name="commMode" label="Mode" options={commModeOptions} control={control} defaultValue={props.commMode ?? "Online"} />
      <FormInputNumber name="filteredCommBad" control={control} label="Filtered Comm Bad" defaultValue={props.filteredCommBad ?? 3} />
      <FormInputNumber name="filteredCommMarginal" control={control} label="Filtered Comm Marginal" defaultValue={props.filteredCommMarginal ?? 3} />
      <FormInputNumber name="filteredCommWeightingFactor" control={control} label="Filtered Comm Weighting Factor" defaultValue={props.filteredCommWeightingFactor ?? 3} />
    </Box>
  );
}

export default FormEntityCommunication;
