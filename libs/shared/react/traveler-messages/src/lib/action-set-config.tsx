// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useEffect, useMemo, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import * as apis from '@econolite/shared/data-access/api-configuration';
import { ActionSet } from '@econolite/shared/data-access/api-configuration';
import { useTriggerEvents, useTriggerTypes } from './hooks/use-triggers';
import {
  defaultActionSetFormData
} from './utils/trigger-helpers';
import ActionSetList from './action-set-list';
import ActionSetModal from './action-set-modal';
import { ActionSetWithAction, StatementActionData } from './utils/trigger-props';
import { useGetTimItisCodesQuery } from '@econolite/shared/data-access/api-tim';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export function ActionSetConfig() {
  const { events } = useTriggerEvents();
  const { types } = useTriggerTypes();

  const [isActionSetModalOpen, setIsActionSetModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [editData, setEditData] = useState<ActionSetWithAction>(defaultActionSetFormData);
  const [logicStatementData, setLogicStatementData] = useState<ActionSetWithAction[]>([]);

  const { data: actionSets, isLoading: isActionSetsLoading, error: getActionSetError, isError: isActionSetError, refetch: asRefetch } = apis.useGetActionSetQuery();
  const { data: itisCodeTypes, isLoading: isItisCodeTypesLoading, error: itisCodeTypesError, isError: isItisCodeTypesError, refetch: itisCodeTypesRefetch } = useGetTimItisCodesQuery();
  const { data: signals, isLoading: isSignalLoading, error: signalError, isError: isSignalError, refetch: signalRefetch } = apis.useGetEntitiesTypesByTypeQuery({ type: "Intersection" });
  const [addLogicStatement, { isLoading: isAddLoading, error: addError }] = apis.usePostActionSetMutation();
  const [editLogicStatement, { isLoading: isEditLoading, error: editError }] = apis.usePutActionSetMutation();
  const [deleteLogicStatement, { isLoading: isDeleteLoading, error: deleteError }] = apis.useDeleteActionSetByIdMutation();

  useEffect(() => {
    const withActions: ActionSetWithAction[] = actionSets?.map((set) => {
      return {...set, statementActions: set.actions?.map((action) => JSON.parse(action?.action ?? '{}') as StatementActionData)}
    }) as ActionSetWithAction[] ?? [];
    setLogicStatementData(withActions )
  }
  , [actionSets])

  // if (!isActionSetsLoading && isActionSetError && isItisCodeTypesError) {
  //   asRefetch();
  // }

  // if (!isSignalLoading && isSignalError && isItisCodeTypesError) {
  //   signalRefetch();
  // }

  const tableData = useMemo(
    () => logicStatementData,
    [logicStatementData]);

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const save = (actionSetWithAction: ActionSetWithAction) => {
    actionSetWithAction.actions = actionSetWithAction.statementActions.map((action) => {
      return { action: JSON.stringify(action)}
    });
    if (isAdd) {
      addLogicStatement({ actionSet: actionSetWithAction as ActionSet })
        .then((payload) => {
          asRefetch();
          setIsActionSetModalOpen(false);
        })
        .catch(console.error);
    } else {
      editLogicStatement({ actionSet: actionSetWithAction as ActionSet })
        .then((payload) => {
          asRefetch();
          setIsActionSetModalOpen(false);
        })
        .catch(console.error);
    }
  };

  const deleteActionSet = (id: string) => {
    deleteLogicStatement({ id })
      .then(() => {
        asRefetch();
      })
      .catch(console.error);
  };

  const openAddModal = () => {
    setIsAdd(true);
    setIsActionSetModalOpen(true);
    setEditData(defaultActionSetFormData);
  };

  const openEditModal = (id: string) => {
    const logicStatement = logicStatementData?.find(ls => ls.id === id);
    setIsAdd(false);
    setIsActionSetModalOpen(true);
    if(logicStatement) {
      setEditData(logicStatement);
    }
  };

  const closeModal = () => setIsActionSetModalOpen(false);

  const isPageLoading = isActionSetsLoading|| isDeleteLoading || isSignalLoading || isItisCodeTypesLoading;
  const isPageError = !!getActionSetError || !!deleteError || !!signalError || !!itisCodeTypesError;

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Box sx={{ py: 3 }}>
          <Typography variant='h2'>Action Sets</Typography>
        </Box>
        {isPageLoading &&
        <Box sx={(theme:Theme) => ({minHeight: 'calc(100vh - 250px)', display: 'grid', justifyContent: 'center', alignContent: 'center'})}>
          <CircularProgress color='inherit' />
        </Box>
        }
        {(actionSets && actionSets.length === 0) &&
        <Box sx={(theme:Theme) => ({minHeight: 'calc(100vh - 250px)', display: 'grid', justifyContent: 'center', alignContent: 'center'})}>
          <Typography variant='h1' color={'gray'}>No Action Sets</Typography>
        </Box>
        }
        {(actionSets && actionSets.length > 0) &&
          <Box sx={(theme:Theme) => ({height: 'calc(100vh - 280px)'})}>
            <ActionSetList
              data={tableData}
              onEdit={openEditModal}
              onDelete={deleteActionSet}
            />
          </Box>
        }
        <ActionSetModal
          isAdd={isAdd}
          isShowing={isActionSetModalOpen}
          isLoading={isAddLoading || isEditLoading}
          isError={!!addError || !!editError}
          initialData={editData}
          onClose={closeModal}
          onSave={save}
          events={events}
          types={types}
          targets={signals ?? []}
          itisCodesTypes={itisCodeTypes ?? []}
        />
      </Box>
      <Zoom key={1} timeout={transitionDuration} in unmountOnExit>
        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={openAddModal} disabled={isPageLoading}>
          <AddIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}

export default ActionSetConfig;
