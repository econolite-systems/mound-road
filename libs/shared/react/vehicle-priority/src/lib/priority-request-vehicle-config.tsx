// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import { Theme, useTheme } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';
import {
  useGetScpVehicleClassQuery,
  usePutScpVehicleClassMutation,
  PriorityRequestVehicle,
  PriorityRequestVehicleConfiguration,
  PriorityRequestVehicleClassType
} from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicles from './priority-request-vehicles';
import PriorityRequestVehicleDialog from './priority-request-vehicle-dialog';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

/* eslint-disable-next-line */
export interface PriorityRequestVehicleConfigProps {}

export function PriorityRequestVehicleConfig(
  props: PriorityRequestVehicleConfigProps
) {
  const [types, setTypes] = useState<PriorityRequestVehicleClassType[]>([])
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [current, setCurrent] = useState<PriorityRequestVehicle>({ id: '', type: '', allowed: false});
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
  
  useEffect(() => {
    if(data) {
      const available = data?.priorityRequestVehicleClassType ?? [];
      setTypes(available);
    }
  }, [data]);

  const add = useCallback(() => {
    setCurrent({ id: "" });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    const toEdit = data?.vehicles?.find((v) => v.id === id) ?? {};
    setCurrent(toEdit);
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [data, setCurrent, setOpenForm, setIsAdd]);

  const deleteItem = useCallback((id: string) => {
    const types = data?.vehicles?.filter((v) => v.id !== id) ?? [];
    const update = {...data, vehicles: types};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());;
  }, [data]);

  const addItem = useCallback((dataType: PriorityRequestVehicle) => {
    setCurrent({ id: "" });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    const types = data?.vehicles ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, vehicles: [...types, dataType]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());
  }, [data, setOpenForm]);

  const editItem = useCallback((dataType: PriorityRequestVehicle) => {
    const old = {...current};
    setCurrent({ id: "" });
    setOpenForm(false);
    setOpen(false);
    const types = data?.vehicles?.map((v) => v.id === old.id ? dataType : v) ?? [];
    const intersections = data?.priorityRequestVehicleIntersections?.map((i) => { 
      const vehicles = i.vehicles?.map((v) => v.name === old.id ? {name: dataType.id} : v);
      return { ...i, vehicles: vehicles};
    }) ?? []
    const update: PriorityRequestVehicleConfiguration = {...data, vehicles: [...types], priorityRequestVehicleIntersections: [...intersections]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());

  }, [data, current, setCurrent, setOpenForm]);

  return (
    <Box sx={{ width: '100%'}}>
      <Box>
        <Box sx={{ py: 3 }}>
          <Typography variant='h2'>Priority Request Vehicles</Typography>
        </Box>
        <Box sx={(theme:Theme) => ({height: 'calc(100vh - 280px)'})}>
          {!data &&
            <p>No Data</p>
          }
          {data &&
            <PriorityRequestVehicles data={data?.vehicles as any[]} onEdit={edit} onDelete={deleteItem}></PriorityRequestVehicles>
          }
          {((open && current && current.id !== "") || (open && isAdd)) &&
            <PriorityRequestVehicleDialog data={current} types={types} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} add={addItem} edit={editItem} />
          }
          {data &&
          <Zoom
            key={0}
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

export default PriorityRequestVehicleConfig;
