// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputText, FormInputPassword } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormFtpCredentialsConfigProps {
  username?: string | null | undefined;
  password?: string | null | undefined;
  snmpCommunityName?: string | null | undefined;
  isShowUser?: boolean | null | undefined;
  isShowPassword?: boolean | null | undefined;
};

export const ftpCredentialsSchema = object({
  username: string(),
  password: string(),
  snmpCommunityName: string(),
});

export function FormFtpCredentialsConfig(props: FormFtpCredentialsConfigProps) {
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      {props.isShowUser &&
        <FormInputText name="username" control={control} label="Username" defaultValue={props.username ?? "admin"} />
      }
      {props.isShowPassword &&
        <FormInputPassword name="password" control={control} label="Password" defaultValue={props.password ?? ""} />
      }
      <FormInputText name="snmpCommunityName" control={control} label="Snmp Community Name" defaultValue={props.snmpCommunityName ?? "administrator"} />
    </Box>
  );
}

export default FormFtpCredentialsConfig;
