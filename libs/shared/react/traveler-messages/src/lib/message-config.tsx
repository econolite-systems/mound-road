// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Box, CircularProgress, Fab, Theme, Typography, Zoom, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { TimRequest, useDeleteTimByIdMutation, useGetTimItisCodesQuery, useGetTimStatusQuery, usePostTimSendRequestMutation, usePutTimCancelByIdMutation } from '@econolite/shared/data-access/api-tim';
import MessageModal, { MessageLocation } from './message-modal';
import { useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { is } from 'date-fns/locale';
import MessagesList from './messages-list';
import { v4 as uuidv4 } from 'uuid';
import { IsAdministrator, IsContributor } from '@econolite/shared-react-auth';
import { get } from 'http';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export function MessageConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();
  const { data: timStatus, isLoading: isTimStatusLoading, error: timStatusError, isError: isTimStatusError, refetch: timStatusRefetch } = useGetTimStatusQuery(
    undefined,
    {
      pollingInterval: 30000
    }
  );
  const { data: itisCodeTypes, isLoading: isItisCodeTypesLoading, error: itisCodeTypesError, isError: isItisCodeTypesError, refetch: itisCodeTypesRefetch } = useGetTimItisCodesQuery();
  const { data: intersections, isLoading: isIntersectionsLoading, error: intersectionsError, isError: isIntersectionsError, refetch: intersectionsRefetch } = useGetEntitiesTypesByTypeQuery({ type: "Intersection" });
  const [sendTimRequest] = usePostTimSendRequestMutation();
  const [deleteTimRequest] = useDeleteTimByIdMutation();
  const [cancelTimRequest] = usePutTimCancelByIdMutation();
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const openAddModal = () => {
    setIsAdd(true);
    setIsOpen(true);
  };

  const save = (message: TimRequest) => {
    message.id = uuidv4();
    sendTimRequest({ timRequest: message })
      .then((payload) => {
        timStatusRefetch();
        setIsOpen(false);
      })
      .catch(console.error);
  };
  const deleteTim = (id: string) => {
    deleteTimRequest({ id })
      .then((payload) => {
        timStatusRefetch();
      })
      .catch(console.error);
  }
  const cancelTim = (id: string) => {
    cancelTimRequest({ id })
    .then(() => {
      timStatusRefetch();
    })
    .catch(console.error);
  }

  const closeModal = () => setIsOpen(false);
  const isLoading = isTimStatusLoading || isItisCodeTypesLoading || isIntersectionsLoading;
  const isError = isTimStatusError || isItisCodeTypesError || isIntersectionsError;
  return (
    <>
      {isLoading &&
        <Box sx={(theme: Theme) => ({ minHeight: 'calc(100vh - 140px)', display: 'grid', justifyContent: 'center', alignContent: 'center' })}>
          <CircularProgress color='inherit' />
        </Box>
      }
      {(timStatus && timStatus.length > 0) &&
        <Box sx={(theme: Theme) => ({ height: 'calc(100vh - 140px)' })}>
          <MessagesList
            isContributor={isContributor}
            isAdministrator={isAdministrator}
            data={timStatus}
            onCancel={cancelTim}
            onDelete={deleteTim}
          />
        </Box>
      }
      {(timStatus && timStatus.length === 0) &&
        <Box sx={(theme: Theme) => ({ minHeight: 'calc(100vh - 80px)', display: 'grid', justifyContent: 'center', alignContent: 'center' })}>
          <Typography variant='h1' color={'gray'}>No Messages</Typography>
        </Box>
      }
      <MessageModal
        isShowing={isOpen}
        isLoading={isLoading}
        isError={isError}
        onClose={closeModal}
        onSave={save}
        itisCodeTypes={itisCodeTypes ?? []}
        locations={intersections?.map(i => ({ id: i.id, name: i.name } as MessageLocation)) ?? []}
      />
      <Zoom key={1} timeout={transitionDuration} in unmountOnExit>
        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={openAddModal} disabled={isLoading}>
          <AddIcon />
        </Fab>
      </Zoom>
    </>
  )
}

export default MessageConfig
