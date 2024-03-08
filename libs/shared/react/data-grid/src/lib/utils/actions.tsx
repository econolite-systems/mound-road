// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GridRowParams,
  GridActionsCellItem,
  GridRowId,
  GridColumnHeaderParams,
  GridActionsCellItemProps,
} from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export interface IActionColumn {
  nameField?: string;
  onCancel?: (id: GridRowId) => void;
  onEdit?: (id: GridRowId) => void;
  onDelete?: (id: GridRowId, name: string) => void;
}

export interface IAddActionColumn extends IActionColumn {
  onAdd?: () => void;
}

export function getEditDeleteActions({ nameField, onEdit, onDelete }: IActionColumn, isContributor: boolean, isAdministrator: boolean) {
  const edit = onEdit ? (id: string | number) => () => onEdit(id) : null;
  const deleteRow = onDelete ? (id: string | number, name: string) => () => onDelete(id, name) : null;
  const name = nameField ?? 'name';
  return (params: GridRowParams) => {
    const actions: React.ReactElement<GridActionsCellItemProps, string | React.JSXElementConstructor<any>>[] = [];

    if ( edit && isContributor ) {
      actions.push(
        <GridActionsCellItem
          icon={<EditIcon />}
          title="Edit"
          label="Edit"
          onClick={edit(params.id)}
        />
      );
    }

    if ( deleteRow !== null && isAdministrator ) {
      actions.push(
        <GridActionsCellItem
            icon={<DeleteIcon />}
            title="Delete"
            label="Delete"
            onClick={deleteRow(params.id, params.row[name])}
        />,
      );
    }

    return actions;
  }
}

export function getCancelDeleteActions({ nameField, onCancel, onDelete }: IActionColumn, isContributor: boolean, isAdministrator: boolean) {
  const cancel = onCancel ? (id: string | number) => () => onCancel(id) : null;
  const deleteRow = onDelete ? (id: string | number, name: string) => () => onDelete(id, name) : null;
  const name = nameField ?? 'name';
  return (params: GridRowParams) => {
    const actions: React.ReactElement<GridActionsCellItemProps, string | React.JSXElementConstructor<any>>[] = [];

    if ( cancel && isContributor ) {
      actions.push(
        <GridActionsCellItem
          icon={<CancelIcon />}
          title="Cancel"
          label="Cancel"
          onClick={cancel(params.id)}
        />
      );
    }

    if ( deleteRow !== null && isAdministrator ) {
      actions.push(
        <GridActionsCellItem
            icon={<DeleteIcon />}
            title="Delete"
            label="Delete"
            onClick={deleteRow(params.id, params.row[name])}
        />,
      );
    }

    return actions;
  }
}

export function getAddColumnHeader({ onAdd }: IAddActionColumn, isContributor: boolean) {
  return (params: GridColumnHeaderParams) => (
    isContributor?<IconButton aria-label="add" title="Add" size="large" onClick={onAdd}>
      <AddIcon />
    </IconButton>:''
  );
}
