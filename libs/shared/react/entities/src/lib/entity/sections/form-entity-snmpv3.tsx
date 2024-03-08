// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber, FormInputPassword, FormInputSwitch, FormInputText, FormInputOption, ipv4 } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { number, object, string, boolean } from 'yup';

/* eslint-disable-next-line */
export interface FormEntitySnmpV3Props {
  ipAddress?: string | null | undefined;
  username?: string | null | undefined;
  password?: string | null | undefined;
  privacyPhase?: string | null | undefined;
  retries?: number | null | undefined;
  timeout?: number | null | undefined;
  pollRate?: number | null | undefined;
  authentication?: string | null | undefined;
  privacy?: string | null | undefined;
  requireStandbyOnSet?: boolean | null | undefined;
};

export const entitySnmpV3Schema = object({
  ipAddress: ipv4,
  username: string().max(32).label('Username'),
  password: string().max(32).label('Password'),
  privacyPhrase: string().max(32).label('Privacy phrase'),
  retries: number().min(0).max(10).label('Retries'),
  timeout: number().min(0).max(300).label('Timeout seconds'),
  pollRate: number().min(60).max(3600).label('Poll rate'),
  authentication: string(),
  privacy: string(),
  requireStandbyOnSet: boolean(),
});

export function FormEntitySnmpV3(props: FormEntitySnmpV3Props) {
  const { control, formState } = useFormContext();

  const authenticationOptions: Array<FormInputOption> = [
    { label: "None", value: "None" },
    { label: "MD5", value: "MD5" },
    { label: "SHA", value: "SHA" },
    { label: "SHA256", value: "SHA256" },
    { label: "SHA384", value: "SHA384" },
    { label: "SHA512", value: "SHA512" }
  ]

  const privacyOptions: Array<FormInputOption> = [
    { label: "None", value: "None" },
    { label: "DES", value: "DES" },
    { label: "AES", value: "AES" },
    { label: "AES192", value: "AES192" },
    { label: "AES256", value: "AES256" }
  ]

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
        <FormInputText name="ipAddress" control={control} label="IP Address" defaultValue={props.ipAddress ?? "0.0.0.0"} />
        <FormInputText name="username" control={control} label="Username" defaultValue={props.username ?? ""} />
        <FormInputPassword name="password" control={control} label="Password" defaultValue={props.password ?? ""} />
        <FormInputPassword name="privacyPhrase" control={control} label="PrivacyPhrase" defaultValue={props.privacyPhase ?? ""} />
        <FormInputDropdown name="authentication" label="Authentication" options={authenticationOptions} control={control} defaultValue={props.authentication ?? "None"} />
        <FormInputDropdown name="privacy" label="Privacy" options={privacyOptions} control={control} defaultValue={props.privacy ?? "None"} />
        <FormInputNumber name="retries" control={control} label="Retries" defaultValue={props.retries ?? 0} />
        <FormInputNumber name="timeout" control={control} label="Timeout (seconds)" defaultValue={props.timeout ?? 10} />
        <FormInputNumber name="pollrate" control={control} label="Pollrate (seconds)" defaultValue={props.pollRate ?? 60} />
        <FormInputSwitch name="requireStandbyOnSet" control={control} label="Require Standby on Set" defaultValue={props.requireStandbyOnSet ?? true} />
      </Box>
      {/* <Box>
      {formState.errors && <span>{formState.errors}</span>}
    </Box> */}
    </>
  );
}

export default FormEntitySnmpV3;
