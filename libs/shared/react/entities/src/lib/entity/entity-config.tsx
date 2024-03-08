// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DeleteEntitiesByIdApiArg, EntityNode, EntityType, useDeleteEntitiesByIdMutation, useGetEntitiesAllQuery, useGetEntityTypeQuery, usePostEntitiesMutation, usePutEntitiesMutation } from '@econolite/shared/data-access/api-configuration';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import EntityList from './entity-list';
import EntityFormDialog from './entity-form-dialog';
import { useCallback, useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface EntityConfigProps {}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export function EntityConfig(props: EntityConfigProps) {
  const { data: entityTypes, isLoading: isLoadingTypes, isError: isErrorTypes } = useGetEntityTypeQuery();
  const dialogRef = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentEntity, setCurrentEntity] = useState({ id: "" });
  const { data, isLoading, refetch, isError } = useGetEntitiesAllQuery();
  const [deleteEntity] = useDeleteEntitiesByIdMutation();
  const [addEntity] = usePostEntitiesMutation();
  const [editEntity] = usePutEntitiesMutation();
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
    setCurrentEntity({ id: "" });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    setCurrentEntity({ id: id });
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [setCurrentEntity, setOpenForm, setIsAdd]);

  const deleteItem = useCallback(async (id: string) => {
    const results = await deleteEntity({ id: id } as DeleteEntitiesByIdApiArg);
    if (results) refetch();
  }, []);

  const addItem = useCallback((data: EntityNode) => {
    setCurrentEntity({ id: "" });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    addEntity({ entityNode: data }).then(() => refetch());
  }, [setOpenForm]);

  const editItem = useCallback((data: EntityNode) => {
    setCurrentEntity({ id: "" });
    setOpenForm(false);
    setOpen(false);
    editEntity({ entityNode: data }).then(() => refetch());
  }, [setCurrentEntity, setOpenForm]);
  
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Entities</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {data &&
            <EntityList data={data as any[]} onEdit={edit} onDelete={deleteItem}></EntityList>
          }
          {((open && currentEntity && currentEntity.id !== '' && entityTypes) || (open && isAdd)) &&
            <EntityFormDialog data={currentEntity.id} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} addEntity={addItem} editEntity={editItem} entityTypes={entityTypes as EntityType[]}/>
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
  );
}

export default EntityConfig;
