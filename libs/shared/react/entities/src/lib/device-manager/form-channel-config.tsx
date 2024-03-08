// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber, FormInputText, ipv4, ipv4No0s, FormInputDropdown, FormInputOption } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string, number } from 'yup';

/* eslint-disable-next-line */
export interface FormChannelConfigProps {
  name?: string | null,
  channelType?: string | null,
  primaryPollRate?: number,
  deviceTimeout?: number,
  sourceIPAddress?: string | null,
  sourcePort?: number,
  destinationIPAddress?: string | null,
  destinationPort?: number,
};

const alphaNumRegEx = /^[A-z 0-9]*$/;
export const channelSchema = object({
  name: string().matches(alphaNumRegEx, 'special characters are not allowed').required(),
  channelType: string().required(),
  primaryPollRate: number().min(0).max(100000).required(),
  deviceTimeout: number().min(0).max(10000).required(),
  sourceIPAddress: ipv4.required(),
  sourcePort: number().min(0).max(65535).required(),
  destinationIPAddress: string().when('channelType', {
    is: "SerialOverUdp",
    then: ipv4No0s.required()
  }),
  destinationPort: number().min(0).max(65535).required(),
});

export function FormChannelConfig(props: FormChannelConfigProps) {
  const { control, watch } = useFormContext();
  const selectedChannelType = watch('channelType');
  const [isDestinationDisabled, setIsDestinationDisabled] = useState(false);

  const channelTypeOptions: Array<FormInputOption> = [
    { label: "Udp", value: "Udp" },
    { label: "Serial over Udp", value: "SerialOverUdp" },
    { label: "Shared Udp", value: "SharedUdp" }
  ]
  /*Not using at this time
   const channelProtocolOptions: Array<FormOption> = [
     { label: "NTCIP", value: "NTCIP" },
     { label: "NTCIP SNMPv3", value: "NTCIP_SNMPv3" }
   ]

   const timeFormatOptions: Array<FormOption> = [
     { label: "Default", value: "TimeDefault" },
     { label: "UTC", value: "TimeUTC" },
     { label: "Local", value: "TimeLocal" },
     { label: "ACT", value: "TimeACT" }
   ]*/

  useEffect(() => {
    //show/hide the destination fields
    if (selectedChannelType === "SerialOverUdp") {
      setIsDestinationDisabled(false);
    } else {
      setIsDestinationDisabled(true);
    }
  },
    [selectedChannelType]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="name" control={control} label="Name" defaultValue={props.name ?? ""} />
      <FormInputDropdown name="channelType" label="Type" options={channelTypeOptions} control={control} defaultValue={props.channelType ?? "Udp"} />
      <FormInputNumber name="primaryPollRate" control={control} label="Primary Poll Rate" defaultValue={props.primaryPollRate ?? 1000} />
      <FormInputNumber name="deviceTimeout" control={control} label="Device Timeout" defaultValue={props.deviceTimeout ?? 1000} />
      <FormInputText name="sourceIPAddress" control={control} label="Source IP Address" defaultValue={props.sourceIPAddress ?? "0.0.0.0"} />
      <FormInputNumber name="sourcePort" control={control} label="Source Port" defaultValue={props.sourcePort ?? 0} />
      {!isDestinationDisabled &&
        <FormInputText name="destinationIPAddress" control={control} label="Destination IP Address" defaultValue={props.destinationIPAddress ?? "0.0.0.0"} />
      }
      {!isDestinationDisabled &&
        <FormInputNumber name="destinationPort" control={control} label="Destination Port" defaultValue={props.destinationPort ?? 0} />
      }
    </Box>
  );
}

export default FormChannelConfig;
