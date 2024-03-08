// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import { Theme, useTheme } from '@mui/material/styles';
import { useCallback, useRef, useState } from 'react'
import ChannelList from './channel-list';
import { ChannelState } from '@econolite/entities-state';
import ChannelFormDialog from './channel-form-dialog';
import {
  useGetDeviceManagersByIdQuery,
  usePostDeviceManagersByIdChannelMutation,
  usePutDeviceManagersByIdChannelMutation,
  useDeleteDeviceManagersByIdChannelAndChIdMutation,
  DeleteDeviceManagersByIdChannelAndChIdApiArg,
  ChannelUpdate,
  ChannelAdd
} from '@econolite/shared/data-access/api-configuration';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { SettingsInputSvideo } from '@mui/icons-material';
import DevicesIcon from '@mui/icons-material/Devices';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

function ToChannelAdd(channel: ChannelState): ChannelAdd {
  return {
    channelId: channel.channelId,
    name: channel.name,
    channelType: channel.channelType,
    primaryPollRate: channel.primaryPollRate,
    deviceTimeout: channel.deviceTimeout,
    sourceIPAddress: channel.sourceIPAddress,
    sourcePort: channel.sourcePort,
    destinationIPAddress: channel.channelType === "SerialOverUdp" ? channel.destinationIPAddress : "0.0.0.0",
    destinationPort: channel.channelType === "SerialOverUdp" ? channel.destinationPort : 0
  }
}

function ToChannelUpdate(channel: ChannelState): ChannelUpdate {
  return {
    id: channel.id,
    channelId: channel.channelId,
    name: channel.name,
    channelType: channel.channelType,
    primaryPollRate: channel.primaryPollRate,
    deviceTimeout: channel.deviceTimeout,
    sourceIPAddress: channel.sourceIPAddress,
    sourcePort: channel.sourcePort,
    destinationIPAddress: channel.channelType === "SerialOverUdp" ? channel.destinationIPAddress : "0.0.0.0",
    destinationPort: channel.channelType === "SerialOverUdp" ? channel.destinationPort : 0
  }
}

export function ChannelConfig() {

  const props: any = useParams();

  const dialogRef = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetDeviceManagersByIdQuery(
    { id: props.deviceManagerId },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const [currentChannel, setCurrentChannel] = useState({ deviceManagerId: props.deviceManagerId, channelId: "" });
  const [deleteChannel] = useDeleteDeviceManagersByIdChannelAndChIdMutation();
  const [addChannel] = usePostDeviceManagersByIdChannelMutation();
  const [editChannel] = usePutDeviceManagersByIdChannelMutation();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const add = useCallback(() => {
    setCurrentChannel({ deviceManagerId: props.deviceManagerId, channelId: "" });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    setCurrentChannel({ deviceManagerId: props.deviceManagerId, channelId: id });
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [setCurrentChannel, setOpenForm, setIsAdd]);

  const deleteItem = useCallback(async (id: string) => {
    const results = await deleteChannel({ id: props.deviceManagerId, chId: id } as DeleteDeviceManagersByIdChannelAndChIdApiArg);
    if (results) refetch();
  }, []);

  const addItem = useCallback((formData: ChannelState) => {
    //clear the current channelId
    setCurrentChannel({ deviceManagerId: props.deviceManagerId, channelId: "" });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    addChannel({ id: props.deviceManagerId, channelAdd: ToChannelAdd(formData) }).then(() => refetch());
  }, [setOpenForm]);

  const editItem = useCallback((formData: ChannelState) => {
    //clear the current channelId
    setCurrentChannel({ deviceManagerId: props.deviceManagerId, channelId: "" });
    setOpenForm(false);
    setOpen(false);
    editChannel({ id: props.deviceManagerId, channelUpdate: ToChannelUpdate(formData) }).then(() => refetch());
  }, [setCurrentChannel, setOpenForm]);

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', }}>

        <Box sx={( theme:Theme ) => ({ display: 'flex', flexDirection: 'row', rowGap: 1, my: theme.spacing(2) })}>
          <Box sx={( theme:Theme ) => ({ display: 'flex', flexDirection: 'row', gap: 1, borderRight: 1, borderRightColor: theme.palette.divider, pr: theme.spacing(2), pt: theme.spacing(1) })}>
            <DevicesIcon />
            <Box >
              <Typography variant="subtitle1" component="h2">Device Manager</Typography>
              <Typography variant="subtitle1" component="h4" sx={{mt: "-4px"}}><Link component={RouterLink} to="../">{data?.name}</Link></Typography>
            </Box>
          </Box>
          <Box sx={( theme:Theme ) => ({ display: 'flex', flexDirection: 'row', gap: 1, borderRight: 1, borderRightColor: theme.palette.divider, px: theme.spacing(2), pt: theme.spacing(1) })}>
            <SettingsInputSvideo />
            <Box>
            <Typography variant="subtitle1" component="h2">Channels</Typography>
            </Box>
          </Box>
        </Box>

        <ChannelList data={data?.channels as any[]} onEdit={edit} onDelete={deleteItem}></ChannelList>
        {((open && props.deviceManagerId !== '' && currentChannel && currentChannel.channelId !== '') || (open && isAdd)) &&
          <ChannelFormDialog data={currentChannel.channelId} deviceManagerId={props.deviceManagerId}
            isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} addChannel={addItem} editChannel={editItem} />
        }
      </Box>
      <Zoom
        key={1}
        in={true}
        timeout={transitionDuration}
        unmountOnExit
      >
        <Fab sx={fabStyle} aria-label='Add' color="primary" onClick={add}>
          <AddIcon />
        </Fab>
      </Zoom>
    </Box>
  )
}

export default ChannelConfig
