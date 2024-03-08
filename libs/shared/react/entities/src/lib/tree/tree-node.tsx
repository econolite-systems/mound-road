// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNodeProjection, EntityType } from '@econolite/shared/data-access/api-configuration';
import TreeItem, { TreeItemProps, treeItemClasses, useTreeItem } from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

/* eslint-disable-next-line */
export interface TreeNodeProps {
  key: string | undefined | null;
  node: EntityNodeProjection;
  entityTypes: EntityType[];
  reload: boolean;
  loadChildren: (nodeId: string) => Promise<any>;
  add?: (type: EntityType, parentId: string) => void;
  edit?: (id: string, parentId: string, type: EntityType) => void;
  remove?: (id: string) => void;
  moveUp?: (id: string) => void;
  moveDown?: (id: string) => void;
}

export function TreeNode({node, entityTypes, reload, loadChildren, add, edit, remove, moveDown, moveUp}: TreeNodeProps) {
  const [loadedChildren, setLoadedChildren] = useState<EntityNodeProjection[]>(node.children ?? [])
  const [entityType, setEntityType] = useState(entityTypes.find(t => t.id === node.type?.id));
  const {expanded} = useTreeItem(node.instanceId ?? "");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    if (edit)
      edit(node.id ?? "", node.parent ?? "", node.type ?? {} as EntityType);
  };

  const handleDelete = () => {
    handleClose();
    if (remove)
      remove(node.id ?? "");
  };

  const handleMoveUp = () => {
    handleClose();
    if (moveUp)
      moveUp(node.instanceId ?? "");
  };

  const handleMoveDown = () => {
    handleClose();
    if (moveDown)
      moveDown(node.instanceId ?? "");
  };

  useEffect(() => {
    if ((expanded || reload ) && ((loadedChildren && loadedChildren.length === 0) || !node.isLeaf)) {
      loadChildren(node.instanceId ?? "").then(n => setLoadedChildren(n.data));
    }
  }, [expanded, reload])
  
  return (
    <StyledTreeItem key={node.instanceId} nodeId={node.instanceId ?? ""} label={<Grid 
      container
      wrap='nowrap'
      direction="row"
      justifyContent="space-between"
      alignItems="center">
        <Typography variant='body1' sx={{whiteSpace: 'nowrap'}}>
        {entityType?.icon && 
        (<Box
        component="img"
        sx={{ width: "16px", height: "16px", marginRight: 1 }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(entityType.icon)}`}
        alt=""/>)}{node.name}</Typography>
        {(add || edit || remove) && <><IconButton 
        aria-label="menu"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {moveUp?<MenuItem onClick={handleMoveUp}>Move Up</MenuItem>:''}
        {moveDown?<MenuItem onClick={handleMoveDown}>Move Down</MenuItem>:''}
        {edit?<MenuItem onClick={handleEdit}>Edit</MenuItem>:''}
        {add?entityType?.children?.map(id => {
          const type = entityTypes.find(t => t.id === id)
          return (
            <MenuItem key={id} onClick={() => {
              add(type as EntityType, node.id ?? '');
              handleClose();
            }
            }>Add {type?.name}</MenuItem>
          )
        }):''}
        {remove?<MenuItem onClick={handleDelete}>Delete</MenuItem>:''}
      </Menu></>}
    </Grid>}>
      {(loadedChildren && loadedChildren.length > 0)
      ? 
      (
        loadedChildren.map((node) => (<TreeNode reload={reload} key={node.instanceId} node={node} loadChildren={loadChildren} add={add} edit={edit} remove={remove} moveDown={moveDown} moveUp={moveUp} entityTypes={entityTypes}/>))
      )
      : !node.isLeaf
        ? <TreeItem key={node.instanceId + "_loading"} nodeId={node.instanceId + "_loading" ?? ""} label={"Loading..."} /> :
        null
      }
    </StyledTreeItem>
  );
}

export default TreeNode;
