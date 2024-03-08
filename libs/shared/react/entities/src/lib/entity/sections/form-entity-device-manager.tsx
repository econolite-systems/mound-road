// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';

/* eslint-disable-next-line */
export interface FormEntityDeviceManagerProps {
  deviceManagers?: FormData[];
  channels?: FormData[];
  deviceManangerUpdate: (id: string) => void;
  deviceManager?: string | null | undefined;
  channel?: string | null | undefined;
}

export const deviceManagerChannelSelectorSchema = object({
  deviceManager: string(),
  channel: string()
});

export function FormEntityDeviceManager(props: FormEntityDeviceManagerProps) {
  const { control, watch } = useFormContext();

  const selectedDeviceManager = watch('deviceManager');

  useEffect(() => {
    props.deviceManangerUpdate(selectedDeviceManager)
  }, [selectedDeviceManager])
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputDropdown
        name='deviceManager'
        label='Device Manager'
        options={props.deviceManagers ?? []}
        control={control}
        defaultValue={props.deviceManager ?? ""}
      />
      <FormInputDropdown
        name='channel'
        label='Channel'
        options={props.channels ?? []}
        control={control}
        defaultValue={props.channel ?? ""}
      />
    </Box>
  );
}

export default FormEntityDeviceManager;
