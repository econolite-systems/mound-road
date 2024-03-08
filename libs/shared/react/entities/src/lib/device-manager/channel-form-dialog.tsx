// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { ChannelState } from '@econolite/entities-state';
import { ChannelDto, useGetDeviceManagersByIdQuery } from '@econolite/shared/data-access/api-configuration';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  useForm
} from 'react-hook-form';
import FormChannelConfig, { channelSchema } from './form-channel-config';

export interface ChannelFormDialogProps {
  data: string;
  open: boolean;
  handleClose: () => void;
  addChannel?: (channel: ChannelState) => void;
  editChannel?: (channel: ChannelState) => void;
  isAdd: boolean;
  deviceManagerId: string
}

export const schema = channelSchema.concat(channelSchema);

export function ChannelFormDialog(props: ChannelFormDialogProps) {
  const [currentChannel, setCurrentChannel] = useState<ChannelDto>();
  const { data, isLoading, isFetching, refetch } = useGetDeviceManagersByIdQuery(
    { id: props.deviceManagerId }, //Note:  careful here; this doesn't change as new channels are selected plus if its null it gets all instead of 1
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const methods = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    if (props.isAdd) {
      const defaultChannel = {
        name: "",
        primaryPollRate: 1000,
        deviceTimeout: 1000,
        sourceIPAddress: "0.0.0.0",
        sourcePort: 0
      };
      setCurrentChannel(defaultChannel);
      //reset the form data
      methods.reset({ ...defaultChannel });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {//don't step on the default data if its an add
      const channel = data?.channels?.find(e => e.id === props.data);
      setCurrentChannel(channel);
      //reset the form data
      methods.reset({ ...channel });
    }
  }, [data, props.isAdd, props.data]);//data won't change between channels as the dmId stays the same; need to re-run this when the isAdd changes or the channelid,

  const onSubmit = (data: FieldValues) => {
    if (props.addChannel && props.isAdd) {
      methods.reset({});
      props.addChannel(data as ChannelState);
    } else if (props.editChannel) {
      methods.reset({});
      props.editChannel(data as ChannelState);
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
        title="Channel"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {currentChannel && (
              <>
                <FormChannelConfig {...currentChannel} />
              </>
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default ChannelFormDialog;
