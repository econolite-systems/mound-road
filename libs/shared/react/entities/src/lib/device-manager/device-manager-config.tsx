// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { useCallback, useRef, useState } from 'react'
import DeviceManagerList from './device-manager-list';
import { DeviceManagerState } from '@econolite/entities-state';
import DeviceManagerFormDialog from './device-manager-form-dialog';
import {
  useGetDeviceManagersQuery,
  usePostDeviceManagersMutation,
  usePutDeviceManagersMutation,
  useDeleteDeviceManagersByIdMutation,
  DeleteDeviceManagersByIdApiArg,
  DmConfigUpdate,
  DmConfigAdd
} from '@econolite/shared/data-access/api-configuration';
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { Path } from 'leaflet';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

function ToDeviceManagerAdd(deviceManager: DeviceManagerState): DmConfigAdd {
  return {
    dmId: deviceManager.dmId,
    name: deviceManager.name,
    location: deviceManager.location,
    port: deviceManager.port,
    channels: deviceManager.channels,//shouldn't have channels yet
  }
}

function ToDeviceManagerUpdate(deviceManager: DeviceManagerState): DmConfigUpdate {
  return {
    id: deviceManager.id,
    dmId: deviceManager.dmId,
    name: deviceManager.name,
    location: deviceManager.location,
    port: deviceManager.port,
    channels: deviceManager.channels,//be careful not to step on these
  }
}


export function DeviceManagerConfig() {
  const dialogRef = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentDeviceManager, setCurrentDeviceManager] = useState({ id: "" });
  const { data, isLoading, refetch, isError } = useGetDeviceManagersQuery();
  const [deleteDeviceManager] = useDeleteDeviceManagersByIdMutation();
  const [addDeviceManager] = usePostDeviceManagersMutation();
  const [editDeviceManager] = usePutDeviceManagersMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const add = useCallback(() => {
    setCurrentDeviceManager({ id: "" });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    setCurrentDeviceManager({ id: id });
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [setCurrentDeviceManager, setOpenForm, setIsAdd]);

  const deleteItem = useCallback(async (id: string) => {
    const results = await deleteDeviceManager({ id: id } as DeleteDeviceManagersByIdApiArg);
    if (results) refetch();
  }, []);

  const addItem = useCallback((data: DeviceManagerState) => {
    setCurrentDeviceManager({ id: "" });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    addDeviceManager({ dmConfigAdd: ToDeviceManagerAdd(data) }).then(() => refetch());
  }, [setOpenForm]);

  const editItem = useCallback((data: DeviceManagerState) => {
    setCurrentDeviceManager({ id: "" });
    setOpenForm(false);
    setOpen(false);
    editDeviceManager({ dmConfigUpdate: ToDeviceManagerUpdate(data) }).then(() => refetch());
  }, [setCurrentDeviceManager, setOpenForm]);

  const channelClick = useCallback(async (id: string) => {
    //redirect to the channels route
    const path = './channels/' + id;
    navigate(path);
  }, []);

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Device Managers</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <DeviceManagerList data={data as any[]} onEdit={edit} onDelete={deleteItem} onChannelClick={channelClick}></DeviceManagerList>
          {((open && currentDeviceManager && currentDeviceManager.id !== '') || (open && isAdd)) &&
            <DeviceManagerFormDialog data={currentDeviceManager.id} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} addDeviceManager={addItem} editDeviceManager={editItem} />
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
    </>
  )
}

export default DeviceManagerConfig

