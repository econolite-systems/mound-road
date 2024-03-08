// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useConfirmModal } from '@econolite/modal';
import {
  DeleteActionConfirmModal,
  nameColumn,
  editDeleteActionColumn,
} from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

export interface ActionSetListProps {
  data?: Array<any>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ActionSetList({
  data = [],
  onEdit,
  onDelete
}: ActionSetListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName } = useConfirmModal();
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  const deleteTrigger = useCallback(
    (id: GridRowId, name: string) => {
      setType('Action Set');
      setId(id);
      setName(name);
    },
    [setType, setId, setName]
  );

  // define columns
  const columns: GridColDef[] = useMemo(
    () => [
      nameColumn(),
      editDeleteActionColumn({
        onEdit: (id) => onEdit(id as string),
        onDelete: deleteTrigger,
      }, isContributor, isAdministrator),
    ],
    [onEdit, deleteTrigger]
  );

  return (
    <>
      <DataGrid sx={{ height: '100%' }} rows={data} columns={columns} />
      <DeleteActionConfirmModal
        isShowing={isShowing}
        toggle={toggle}
        id={id}
        setId={setId}
        type={type}
        setType={setType}
        name={name}
        setName={setName}
        onDelete={onDelete}
      />
    </>
  );
}

export default ActionSetList;
