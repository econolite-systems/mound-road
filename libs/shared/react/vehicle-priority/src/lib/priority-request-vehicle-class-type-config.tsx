// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import { Theme, useTheme } from '@mui/material/styles';
import { useCallback, useRef, useState } from 'react';
import {
  useGetScpVehicleClassQuery,
  usePutScpVehicleClassMutation,
  PriorityRequestVehicleClassType,
  PriorityRequestVehicleConfiguration
} from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicleClassTypes from './priority-request-vehicle-class-types';
import PriorityRequestVehicleClassTypeDialog from './priority-request-vehicle-class-type-dialog';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassTypeConfigProps {}

export function PriorityRequestVehicleClassTypeConfig(
  props: PriorityRequestVehicleClassTypeConfigProps
) {
  const dialogRef = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [current, setCurrent] = useState<PriorityRequestVehicleClassType>({ id: 0, type: ''});
  const { data, isLoading, isError, refetch } = useGetScpVehicleClassQuery();
  const [ editClass ] = usePutScpVehicleClassMutation();
  const theme = useTheme();

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const add = useCallback(() => {
    setCurrent({ id: 0 });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    const toEdit = data?.priorityRequestVehicleClassType?.find((v) => v.id === parseInt(id)) ?? {};
    setCurrent(toEdit);
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [data, setCurrent, setOpenForm, setIsAdd]);

  const deleteItem = useCallback((id: string) => {
    const name = data?.priorityRequestVehicleClassType?.find((v) => v.id === parseInt(id));
    const types = data?.priorityRequestVehicleClassType?.filter((v) => v.id !== parseInt(id)) ?? [];
    const levels = data?.priorityRequestVehicleClassLevel?.filter((v) => v.type !== name?.type) ?? [];
    const vehicles = data?.vehicles?.map((v) => v.type === name?.type ? {id: v.id, type: "none", allowed: v.allowed} : v)
    const update = {...data, priorityRequestVehicleClassType: types, priorityRequestVehicleClassLevel: levels, vehicles: vehicles};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());;
  }, [data]);

  const addItem = useCallback((dataType: PriorityRequestVehicleClassType) => {
    setCurrent({ id: 0 });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    const types = data?.priorityRequestVehicleClassType ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleClassType: [...types, dataType]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());
  }, [data, setOpenForm]);

  const editItem = useCallback((dataType: PriorityRequestVehicleClassType) => {
    const old = {...current};
    setCurrent({ id: 0 });
    setOpenForm(false);
    setOpen(false);
    const types = data?.priorityRequestVehicleClassType?.map((v) => v.id === old.id ? dataType : v) ?? [];
    const levels = data?.priorityRequestVehicleClassLevel?.map((v) => v.type === old.type ? {id: v.id, type: dataType.type} : v) ?? [];
    const vehicles = data?.vehicles?.map((v) => v.type === old.type ? {id: v.id, type: dataType.type, allowed: v.allowed} : v) ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleClassType: types, priorityRequestVehicleClassLevel: levels, vehicles: vehicles};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());

  }, [data, current, setCurrent, setOpenForm]);

  return (
    <Box sx={{ width: '100%'}}>
      <Box>
        <Box sx={{ py: 3 }}>
          <Typography variant='h2'>Priority Request Vehicle Class Types</Typography>
        </Box>
        <Box sx={(theme:Theme) => ({height: 'calc(100vh - 280px)'})}>
          {!data &&
            <p>No Data</p>
          }
          {data &&
            <PriorityRequestVehicleClassTypes data={data?.priorityRequestVehicleClassType as any[]} onEdit={edit} onDelete={deleteItem}></PriorityRequestVehicleClassTypes>
          }
          {((open && current && current.id !== 0) || (open && isAdd)) &&
            <PriorityRequestVehicleClassTypeDialog data={current} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} add={addItem} edit={editItem} />
          }
          {data &&
            <Zoom
              key={2}
              in={true}
              timeout={transitionDuration}
              unmountOnExit
            >
              <Fab sx={fabStyle} aria-label='Add' color="primary" onClick={add}>
                <AddIcon />
              </Fab>
            </Zoom>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default PriorityRequestVehicleClassTypeConfig;
