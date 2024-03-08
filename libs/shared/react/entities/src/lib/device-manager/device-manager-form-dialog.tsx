// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { DeviceManagerState } from '@econolite/entities-state';
import { DmConfigDto, useGetDeviceManagersByIdQuery } from '@econolite/shared/data-access/api-configuration';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  useForm
} from 'react-hook-form';
import FormDeviceManagerConfig, { deviceManagerSchema } from './form-device-manager-config';

export interface DeviceManagerFormDialogProps {
  data?: string;
  open: boolean;
  handleClose: () => void;
  addDeviceManager?: (deviceManager: DeviceManagerState) => void;
  editDeviceManager?: (deviceManager: DeviceManagerState) => void;
  isAdd: boolean;
}

export const schema = deviceManagerSchema.concat(deviceManagerSchema);

export function DeviceManagerFormDialog(props: DeviceManagerFormDialogProps) {
  const [currentDeviceManager, setCurrentDeviceManager] = useState<DmConfigDto>();
  const { data, isLoading, isFetching, refetch } = useGetDeviceManagersByIdQuery(
    { id: props.data ?? '' }, //Note:  careful here; if its null it gets all instead of 1
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const methods = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    if (props.isAdd) {
      const defaultDeviceManager = {
        name: '',
        location: '',
        id: 'new',
      };
      setCurrentDeviceManager(defaultDeviceManager);
      //reset the form data
      methods.reset({ ...defaultDeviceManager });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {//don't step on the default data if its an add
      setCurrentDeviceManager(data);
      methods.reset({ ...data });
    }
  }, [data, props.isAdd]);

  const onSubmit = (data: FieldValues) => {
    if (props.addDeviceManager && props.isAdd) {
      methods.reset({});
      props.addDeviceManager(data as DeviceManagerState);
    } else if (props.editDeviceManager) {
      methods.reset({});
      props.editDeviceManager(data as DeviceManagerState);
    }
  };

  const onClose = () => {
    methods.reset(schema.cast({}));
    props.handleClose();
  };

  const actions = () => (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={methods.handleSubmit(onSubmit)}
    >
      save
    </Button>
  );

  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title="Device Manager"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {currentDeviceManager && (
              <FormDeviceManagerConfig {...currentDeviceManager} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default DeviceManagerFormDialog;
