// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useConfirmModal } from '@econolite/modal';
import {
  DeleteActionConfirmModal,
  enabledColumn,
  nameColumn,
  typeColumn,
  editDeleteActionColumn,
  itisColumn,
} from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

export interface TriggersListProps {
  data?: Array<any>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, value: boolean) => void;
}

export function TriggersList({
  data = [],
  onEdit,
  onDelete,
  onToggle,
}: TriggersListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName } = useConfirmModal();
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  const deleteTrigger = useCallback(
    (id: GridRowId, name: string) => {
      setType('Message');
      setId(id);
      setName(name);
    },
    [setType, setId, setName]
  );

  // define columns
  const columns: GridColDef[] = useMemo(
    () => [
      enabledColumn({
        headerName: 'Enabled',
        field: 'enabled',
        onClick: (id, value) => onToggle(id as string, value)
      }),
      nameColumn(),
      typeColumn(),
      itisColumn(),
      editDeleteActionColumn({
        nameField: 'trigger',
        onEdit: (id) => onEdit(id as string),
        onDelete: deleteTrigger,
      }, isContributor, isAdministrator),
    ],
    [onEdit, deleteTrigger, onToggle]
  );

  return (
    <>
      <Box>
        <DataGrid autoHeight rows={data} columns={columns} />
      </Box>
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

export default TriggersList;
