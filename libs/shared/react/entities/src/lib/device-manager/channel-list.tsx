// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useConfirmModal } from '@econolite/modal';
import {
  DeleteActionConfirmModal,
  deviceTimeoutColumn,
  editDeleteActionColumn,
  nameColumn,
  channelTypeColumn,
  primaryPollRateColumn,
} from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

/* eslint-disable-next-line */
export interface ChannelListProps {
  data: Array<any>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChannelList({
  data,
  onEdit,
  onDelete,
}: ChannelListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName } = useConfirmModal();
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  const deleteType = useCallback(
    (id: GridRowId, name: string) => {
      setType('Channel');
      setId(id);
      setName(name);
    },
    [setType, setId, setName]
  );

  // define columns
  const columns: GridColDef[] = useMemo(
    () => [
      nameColumn(),
      channelTypeColumn(),
      primaryPollRateColumn(),
      deviceTimeoutColumn(),
      editDeleteActionColumn({ onEdit: (id) => onEdit(id as string), onDelete: deleteType }, isContributor, isAdministrator),
    ],
    [deleteType, onEdit]
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

export default ChannelList;
