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
  PriorityRequestVehicleClassLevel,
  PriorityRequestVehicleConfiguration,
  PriorityRequestVehicleClassType
} from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicleClassLevels from './priority-request-vehicle-class-levels';
import PriorityRequestVehicleClassLevelDialog from './priority-request-vehicle-class-level-dialog';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassLevelConfigProps {}

export function PriorityRequestVehicleClassLevelConfig(
  props: PriorityRequestVehicleClassLevelConfigProps
) {
  const [types, setTypes] = useState<PriorityRequestVehicleClassType[]>([])
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [current, setCurrent] = useState<PriorityRequestVehicleClassLevel>({ id: 0, type: ''});
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
      const taken = data?.priorityRequestVehicleClassLevel?.map((v)=> v.type) ?? [];
      const available = data?.priorityRequestVehicleClassType?.filter((v)=> !taken.includes(v.type)) ?? [];
      setTypes(available);
    }
  }, [data]);

  const add = useCallback(() => {
    setCurrent({ id: 0 });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    const toEdit = data?.priorityRequestVehicleClassLevel?.find((v) => v.id === parseInt(id)) ?? {};
    setCurrent(toEdit);
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [data, setCurrent, setOpenForm, setIsAdd]);

  const deleteItem = useCallback((id: string) => {
    const types = data?.priorityRequestVehicleClassLevel?.filter((v) => v.id !== parseInt(id)) ?? [];
    const update = {...data, priorityRequestVehicleClassLevel: types};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());;
  }, [data]);

  const addItem = useCallback((dataType: PriorityRequestVehicleClassLevel) => {
    setCurrent({ id: 0 });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    const types = data?.priorityRequestVehicleClassLevel ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleClassLevel: [...types, dataType]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());
  }, [data, setOpenForm]);

  const editItem = useCallback((dataType: PriorityRequestVehicleClassLevel) => {
    const old = {...current};
    setCurrent({ id: 0 });
    setOpenForm(false);
    setOpen(false);
    const types = data?.priorityRequestVehicleClassLevel?.map((v) => v.id === old.id ? dataType : v) ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleClassLevel: [...types]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());

  }, [data, current, setCurrent, setOpenForm]);

  return (
    <Box sx={{width: '100%'}}>
      <Box>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Priority Request Vehicle Class Levels</Typography>
      </Box>
      <Box sx={(theme:Theme) => ({height: 'calc(100vh - 280px)'})}>
        {!data &&
          <p>No Data</p>
        }
        {data &&
          <PriorityRequestVehicleClassLevels data={data?.priorityRequestVehicleClassLevel as any[]} onEdit={edit} onDelete={deleteItem}></PriorityRequestVehicleClassLevels>
        }
        {((open && current && current.id !== 0) || (open && isAdd)) &&
          <PriorityRequestVehicleClassLevelDialog data={current} types={types} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} add={addItem} edit={editItem} />
        }
        {data &&
          <Zoom
            key={3}
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

export default PriorityRequestVehicleClassLevelConfig;
