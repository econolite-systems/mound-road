// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputPassword, FormInputText } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityFtpCredentialsProps {
  username?: string | null | undefined;
  password?: string | null | undefined;
  snmpCommunityName?: string | null | undefined;
  isShowUser?: boolean | null | undefined;
  isShowPassword?: boolean | null | undefined;
};

export const ftpCredentialsSchema = object({
  snmpCommunityName: string().required().label('Snmp Community Name')
});

export const ftpUserNameCredentialsSchema = object({
  username: string().required().label('Username')
});

export const ftpPasswordCredentialsSchema = object({
  password: string().required().label('Password')
});

export function FormEntityFtpCredentials(props: FormEntityFtpCredentialsProps) {
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

export default FormEntityFtpCredentials;
