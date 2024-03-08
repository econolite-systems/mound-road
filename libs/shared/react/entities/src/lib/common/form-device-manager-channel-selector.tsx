// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputOption } from '@econolite/react/forms';
import { useGetDeviceManagersQuery } from '@econolite/shared/data-access/api-configuration';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormDeviceManagerChannelSelectorProps {
  deviceManager?: string | null | undefined;
  channel?: string | null | undefined;
}

export const deviceManagerChannelSelectorSchema = object({
  deviceManager: string().optional(),
  channel: string().optional()
});


export function FormDeviceManagerChannelSelector(props: FormDeviceManagerChannelSelectorProps) {
  const [channels, setChannels] = useState<Array<FormInputOption>>([]);
  const [deviceManagers, setDevicedata] = useState<{ value: string, label: string, dmchannels: [] }[]>([]);
  const { data } = useGetDeviceManagersQuery();
  const { control, watch } = useFormContext();

  const selectedDeviceManager = watch('deviceManager');

  //react hook form watch -> field name deviceManager
  useEffect(() => {
    if (!data)
      return;

    if (data && data.length > 0) {
      const allDeviceManagers = data.map(function (managerdata) {
        return { value: managerdata.id, label: managerdata.name, dmchannels: managerdata.channels ?? [] }
      }) as { value: string, label: string, dmchannels: [] }[]
      setDevicedata(allDeviceManagers)

      for (let i = 0; i < allDeviceManagers.length; i++) {
        if (allDeviceManagers[i].value === selectedDeviceManager) {
          const selectedDMChannels = allDeviceManagers[i].dmchannels as { id: string, name: string }[];
          const dropdownBoxChannelsList = selectedDMChannels.map(function (channeldata) {
            return { value: channeldata.id, label: channeldata.name } as FormInputOption
          });
          setChannels(dropdownBoxChannelsList)
        }
      }
    }
  }, [data, selectedDeviceManager]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputDropdown
        name='deviceManager'
        label='Device Manager'
        options={deviceManagers}
        control={control}
        defaultValue={props.deviceManager}
      />
      <FormInputDropdown
        name='channel'
        label='Channel'
        options={channels}
        control={control}
        defaultValue={props.channel}
      />
    </Box>
  );
}

export default FormDeviceManagerChannelSelector;
