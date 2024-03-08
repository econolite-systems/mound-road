// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { EntityNode, EntityNodeProjection, EntityType } from '@econolite/shared/data-access/api-configuration';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { useSpring, animated } from '@react-spring/web';
import TreeNode from './tree-node';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface EntityTreeProps {
  entities?: Array<EntityNodeProjection> | undefined;
  entityTypes: EntityType[];
  reload: boolean;
  loadChildren: (nodeId: string) => Promise<any>;
  add?: (type: EntityType, parentId: string) => void;
  edit?: (id: string, parentId: string, type: EntityType) => void;
  remove?: (id: string) => void;
  moveUp?: (id: string) => void;
  moveDown?: (id: string) => void;
}

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export function EntityTree({entities, entityTypes, reload, loadChildren, add, edit, remove, moveUp, moveDown}: EntityTreeProps) {
  const [defaultExpanded, setDefaultExpanded] = useState<string[]>();
  const [expanded, setExpanded] = useState<string[]>();
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  useEffect(() => {
    const data = window.sessionStorage.getItem('TREE_STATE');
    (data && data !== null) ? setDefaultExpanded(JSON.parse(data)) : setDefaultExpanded([]);
  }, [reload]);
  useEffect(() => {
    if (expanded) {
      window.sessionStorage.setItem('TREE_STATE', JSON.stringify(expanded));
    }
  }, [expanded]);

  const renderTree = () => {
    return defaultExpanded ? (
      <TreeView
        aria-label="Entity Tree"
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
        defaultExpanded={defaultExpanded}
        //expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}
      >
        { entities?.map((nodes) => (<TreeNode reload={reload} key={nodes.instanceId} node={nodes} entityTypes={entityTypes} loadChildren={loadChildren} moveUp={moveUp} moveDown={moveDown} add={add} edit={edit} remove={remove}/>)) }
      </TreeView>
    ) : null;
  };

  return (
    renderTree()
  );
}

export default EntityTree;
