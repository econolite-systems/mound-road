// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useConfirmModal } from '@econolite/modal';
import {
  DeleteActionConfirmModal,
  dateTimeColumn,
  stringColumn,
  cancelDeleteActionColumn,
} from '@econolite/data-grid';
import { TimStatus } from '@econolite/shared/data-access/api-tim';

/* eslint-disable-next-line */
export interface MessagesListProps {
  isContributor: boolean;
  isAdministrator: boolean;
  data: Array<TimStatus>;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MessagesList({
  isContributor,
  isAdministrator,
  data,
  onCancel,
  onDelete
}: MessagesListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName } = useConfirmModal();

  const deleteMessage = useCallback(
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
      dateTimeColumn({ field: 'deliveryTime', headerName: 'Start Time', flex: 1 }),
      stringColumn({ field: 'status', headerName: 'Status', flex: 1 }),
      stringColumn({ field: 'intersection', headerName: 'Location', flex: 1 }),
      stringColumn({ field: 'message', headerName: 'Message', flex: 1 }),
      cancelDeleteActionColumn({
        nameField: 'message',
        onCancel: (id) => onCancel(id as string),
        onDelete: deleteMessage,
      }, isContributor, isAdministrator),
    ],
    [deleteMessage, onCancel]
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

export default MessagesList;
