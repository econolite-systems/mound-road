// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    GridRowParams,
    GridActionsCellItem,
    GridRowId,
  } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

export interface IMessageActionColumn {
  messageField?: string;
  locationField?: string;
  onEdit?: (id: GridRowId) => void;
  onDelete?: (id: GridRowId) => void;
}

export function editDeleteActionColumn({ messageField, locationField, onEdit, onDelete }: IMessageActionColumn ) {
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();
  const edit = onEdit ? (id: string | number) => () => onEdit(id) : null;
  const deleteRow = onDelete ? (id: string | number) => () => onDelete(id) : null;
  return (params: GridRowParams) => {
    const actions: JSX.Element[] = [];

    if ( edit && isContributor ) {
      actions.push(
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={edit(params.id)}
        />
      );
    }

    if ( deleteRow !== null && isAdministrator ) {
      actions.push(
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteRow(params.id)}
        />,
      );
    }

    return actions;
  }
}
