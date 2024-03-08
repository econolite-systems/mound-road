// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNode, EntityNodeProjection, PostTreeChildrenApiArg, PostTreeApiArg, useGetTreeByInstanceIdChildrenQuery, useGetTreeQuery, usePostTreeChildrenMutation, PostActionSetApiResponse, PostTreeChildrenApiResponse, useGetEntityTypeQuery, EntityType, useDeleteEntitiesByIdMutation, usePostEntitiesMutation, usePutEntitiesMutation, DeleteEntitiesByIdApiArg, EntityTypeId, usePutTreeByInstanceIdMoveUpMutation, usePutTreeByInstanceIdMoveDownMutation } from '@econolite/shared/data-access/api-configuration';
import EntityTree from './entity-tree';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import EntityFormDialog from '../entity/entity-form-dialog';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';
import { set } from 'date-fns';

/* eslint-disable-next-line */
export interface TreeProps {}

export function Tree(props: TreeProps) {
  const [reload, setReload] = useState(false);
  const [updateNode, setUpdateNode] = useState<()=>void>(() => {console.log('No Update')});
  const [currentEntityId, setCurrentEntityId] = useState<string>('');
  const [currentEntityTypeId, setCurrentEntityTypeId] = useState<EntityTypeId>();
  const [currentParentId, setCurrentParentId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentTreeNodes, setCurrentTreeNodes] = useState<EntityNode[]>([]);
  const { data: entityTypes, isLoading: isLoadingTypes, isError: isErrorTypes, refetch: refetchTypes } = useGetEntityTypeQuery();
  const {data, isLoading, isError, refetch} = useGetTreeQuery();
  const [ getTreeChildren ] = usePostTreeChildrenMutation();
  const [deleteEntity] = useDeleteEntitiesByIdMutation();
  const [addEntity] = usePostEntitiesMutation();
  const [editEntity] = usePutEntitiesMutation();
  const [moveEntityUp] = usePutTreeByInstanceIdMoveUpMutation();
  const [moveEntityDown] = usePutTreeByInstanceIdMoveDownMutation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  const handleClickOpen = (id: string) => {
    setCurrentEntityId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentEntityId('');
    setOpen(false);
  };
  
  // if ( isError ) {
  //   refetch();
  // }

  // if ( isErrorTypes ) {
  //   refetchTypes();
  // }

  //const {query, data: children, refetch: fetchChildren, originalArgs} = useGetTreeByInstanceIdChildrenQuery({instanceId: ""})
  const loadChildren = (nodeId: string) => {
    const treeChildren = getTreeChildren({
      instanceRequest: {instanceId: nodeId}
    } as PostTreeChildrenApiArg);
    return treeChildren
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const add = useCallback((type: EntityType, parentId: string) => {
    setCurrentEntityId("");
    setCurrentEntityTypeId({id: type.id, name: type.name});
    setCurrentParentId(parentId);
    setReload(false);
    setIsAdd(true);
    setOpen(true);
  }, [setOpen, setIsAdd]);

  const edit = useCallback((id: string, parentId: string, type: EntityType) => {
    setCurrentEntityId(id);
    setCurrentParentId(parentId);
    setCurrentEntityTypeId({id: type.id, name: type.name});
    setReload(false);
    setIsAdd(false);
    setOpen(true);
  }, [setCurrentEntityId, setOpen, setIsAdd]);

  const deleteItem = useCallback(async (id: string) => {
    const results = await deleteEntity({ id: id } as DeleteEntitiesByIdApiArg);
    if (results){
      setReload(true);
      refetchTypes();
      refetch();
    }
  }, []);

  const addItem = useCallback(async (data: EntityNode) => {
    setCurrentEntityId("");
    setOpen(false);
    setIsAdd(false);
    const results = await addEntity({ entityNode: data });
    if (results){
      setReload(true);
      refetchTypes();
      refetch();
    }
  }, [setOpen]);

  const editItem = useCallback(async (data: EntityNode) => {
    setCurrentEntityId("");
    setOpen(false);
    const results = await editEntity({ entityNode: data });
    if (results){
      setReload(true);
      refetchTypes();
      refetch();
    }
  }, [setCurrentEntityId, setOpen]);

  const moveUp = useCallback(async (data: string) => {
    const results = await moveEntityUp({instanceId: data});
    if (results){
      console.log(results);
      setReload(true);
      refetchTypes();
      refetch();
    }
  }, [setReload]);

  const moveDown = useCallback(async (data: string) => {
    const results = await moveEntityDown({instanceId: data});
    if (results){
      setReload(true);
      refetchTypes();
      refetch();
    }
  }, []);

  useEffect(() => {
    if (reload){
      refetch();
      refetchTypes();
      setReload(false);
    }
  }, [reload, refetch, refetchTypes, setReload, updateNode]);
  return (
    <>
    <Box sx={{height: '100%'}}>
    {(data && entityTypes) && (
      (isAdministrator && <EntityTree  reload={reload} entities={data} loadChildren={loadChildren} moveUp={moveUp} moveDown={moveDown} add={add} edit={edit} remove={deleteItem} entityTypes={entityTypes as EntityType[]}/>) ||
      (isContributor && <EntityTree reload={reload} entities={data} loadChildren={loadChildren} moveUp={moveUp} moveDown={moveDown} add={add} edit={edit} entityTypes={entityTypes as EntityType[]}/>) ||
      (<EntityTree reload={reload} entities={data} loadChildren={loadChildren} entityTypes={entityTypes as EntityType[]}/>)
    )}
    </Box>
    {((open && currentEntityId && entityTypes) || (open && isAdd)) &&
      <EntityFormDialog parentId={currentParentId} entityTypeId={currentEntityTypeId} data={currentEntityId} isAdd={isAdd} open={open} handleClose={handleClose} addEntity={addItem} editEntity={editItem} entityTypes={entityTypes as EntityType[]}/>
    }
    </>
  );
}

export default Tree;
