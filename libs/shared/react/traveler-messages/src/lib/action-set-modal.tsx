// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import {
  FormInputDropdown,
  FormInputOption,
  FormInputText,
  SortableItem
} from '@econolite/react/forms';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { actionSetSchema, defaultActionSetFormData } from './utils/trigger-helpers';
import { ActionSetWithAction, StatementActionData, TriggerEvent, TriggerTarget } from './utils/trigger-props';
import './styles/trigger-modal.scss';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { v4 as uuidv4 } from 'uuid';
import StatementForm from './statement-form';
import ActionForm from './action-form';
import { ItisCodeType } from '@econolite/shared/data-access/api-tim';

export interface ActionSetModalProps {
  isAdd: boolean;
  isShowing: boolean;
  isLoading: boolean;
  isError: boolean;
  events: TriggerEvent[];
  types: string[];
  targets: TriggerTarget[];
  initialData: ActionSetWithAction;
  itisCodesTypes?: ItisCodeType[];
  onClose: () => void;
  onSave: (data: ActionSetWithAction) => void;
}

export function ActionSetModal(props: ActionSetModalProps) {
  const methods = useForm<ActionSetWithAction>({ resolver: yupResolver(actionSetSchema) });
  const { handleSubmit, reset, watch, control, formState: { errors } } = methods;

  useEffect(() => {
    if (!props.isShowing) return;
    reset(props.isAdd ? defaultActionSetFormData : props.initialData);
  }, [props.isShowing, props.isAdd, props.initialData, reset]);

  const targetOptions = useMemo(() => props.targets.map(
    ({ id, name }) => ({ label: name, value: id } as FormInputOption)
  ), [props.targets]);

  const onError = (errors: any, e: any) => console.log(errors, e);

  const actions = (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={handleSubmit(props.onSave, onError)}
      disabled={props.isLoading}
    >
      Save
    </Button>
  );

  const {
    fields: conditionals,
    append: appendConditional,
    remove: removeConditional,
  } = useFieldArray({
    control,
    name: 'conditionals',
  });

  const {
    fields: statements,
    append,
    remove,
    swap,
  } = useFieldArray({
    control,
    name: 'statements',
  });

  const {
    fields: statementActions,
    append: appendAction,
    remove: removeAction,
    swap: swapAction,
  } = useFieldArray({
    control,
    name: 'statementActions',
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = statements.findIndex(
        (item) => item.id === active.id.toString()
      );
      const overIndex = statements.findIndex(
        (item) => item.id === over.id.toString()
      );
      if (overIndex >= 0 && activeIndex >= 0) {
        swap(overIndex, activeIndex);
      }
    }
  }

  function handleDragEndActions(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = statementActions.findIndex(
        (item) => item.id === active.id.toString()
      );
      const overIndex = statementActions.findIndex(
        (item) => item.id === over.id.toString()
      );
      if (overIndex >= 0 && activeIndex >= 0) {
        swapAction(overIndex, activeIndex);
      }
    }
  }

  function addStatement() {
    const statement = {
      id: uuidv4(),
      type: 'EnvironmentalSensor',
      property: {
        name: '',
        isEnabled: true,
        level: 'event',
        comparator: '=',
        value: '',
      },
      entities: [],
      schedule: {
        type: 'immediate',
        times: 0,
        in: {
          minutes: 0,
          seconds: 0,
        },
      },
    }
    const condition = { condition: 'and' }

    append(statement);
    appendConditional(condition);
  }

  function addAction() {
    const action = {
      id: uuidv4(),
      actionType: 'send-tim-message',
      info: '',
      targetType: '',
      parameter: []
    }

    appendAction(action);
  }

  function removeStatement(index: number) {
    if (index === statements.length - 1 && index > 0) {
      removeConditional(index - 1);
    } else {
      removeConditional(index);
    }
    remove(index);
  }

  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title={`${props.isAdd ? 'Add' : 'Edit'} Action`}
        open={props.isShowing}
        handleClose={props.onClose}
        actions={actions}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormInputText name={'name'} label='Name' control={control} />
          <Box>
            <Typography variant='h4'>Statements</Typography>
            <hr />
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={statements}
                strategy={verticalListSortingStrategy}
              >
                {statements.map((statement, index) => (
                  <>
                    <SortableItem key={statement.id} id={statement?.id ?? ''}>
                      <StatementForm key={statement.id} parentName={`statements.${index}`} />
                      <IconButton sx={{ width: 8, height: 8 }} aria-label='remove action' size='large' onClick={() => removeStatement(index)}><DeleteIcon /></IconButton>
                    </SortableItem>
                    {conditionals[index] && (
                      <FormInputDropdown
                        name={`conditionals.${index}.condition`}
                        options={[
                          { label: 'And', value: 'and' },
                          { label: 'Or', value: 'or' },
                          { label: 'Not', value: 'not' },
                        ]}
                        control={methods.control}
                      />
                    )}
                  </>
                ))}
                <Button variant='contained' onClick={addStatement}><AddIcon /></Button>
              </SortableContext>
            </DndContext>
          </Box>
          <Box>
            <Typography variant='h4'>Actions</Typography>
            <hr />
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndActions}
            >
              <SortableContext
                items={statementActions}
                strategy={verticalListSortingStrategy}
              >
                {statementActions.map((statement, index) => (
                  <SortableItem key={statement.id} id={statement?.id ?? ''} disabled>
                    <ActionForm parentName={`statementActions.${index}`} itisCodesTypes={props.itisCodesTypes} targets={targetOptions} />
                    <IconButton sx={{ width: 8, height: 8 }} aria-label='remove action' size='large' onClick={() => removeAction(index)}><DeleteIcon /></IconButton>
                  </SortableItem>
                ))}
                <Button variant='contained' onClick={addAction}><AddIcon /></Button>
              </SortableContext>
            </DndContext>
          </Box>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default ActionSetModal;
