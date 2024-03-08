// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { useConfirmModal } from '@econolite/modal';
import {
  DeleteActionConfirmModal,
  editDeleteActionColumn,
  linkColumn,
  locationColumn,
  nameColumn,
  numberColumn
} from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';

/* eslint-disable-next-line */
export interface DeviceManagerListProps {
  data: Array<any>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChannelClick: (id: string) => void;
}

export function DeviceManagerList({
  data,
  onEdit,
  onDelete,
  onChannelClick,
}: DeviceManagerListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName } = useConfirmModal();

  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  const deleteType = useCallback(
    (id: GridRowId, name: string) => {
      setType('Device Manager');
      setId(id);
      setName(name);
    },
    [setType, setId, setName]
  );

  //add the channel count column to the data for the grid.
  let gridData = [];
  if (data && data.length) {
    gridData = data?.map((item) => ({
      ...item,
      channelCount: item.channels === null ? 0 : item.channels?.length
    }));
  }

  // define columns
  const columns: GridColDef[] = useMemo(
    () => [
      nameColumn(),
      numberColumn(),
      locationColumn(),
      linkColumn({ headerName: "Channels", field: "channelCount", onClick: (id) => onChannelClick(id as string) }),
      editDeleteActionColumn({ onEdit: (id) => onEdit(id as string), onDelete: deleteType }, isContributor, isAdministrator),
    ],
    [deleteType, onEdit, onChannelClick]
  );

  return (
    <>
      <Box>
        <DataGrid autoHeight rows={gridData} columns={columns} />
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

export default DeviceManagerList;
