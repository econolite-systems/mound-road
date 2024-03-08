// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import {
  FormInputAutoComplete,
  FormInputDropdown,
  FormInputDropdownMulti,
  FormInputSwitch,
  FormInputText,
} from '@econolite/react/forms';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { convertPropertyToDefaultInput, defaultFormData, isEventEqual, triggerSchema } from './utils/trigger-helpers';
import { TriggerFormInput, TriggerEvent, TriggerTarget } from './utils/trigger-props';
import TriggerEventProperties from './trigger-event-properties';
import './styles/trigger-modal.scss';

export interface TriggerModalProps {
  isAdd: boolean;
  isShowing: boolean;
  isLoading: boolean;
  isError: boolean;
  events: TriggerEvent[];
  types: string[];
  targets: TriggerTarget[];
  initialData: TriggerFormInput;
  onClose: () => void;
  onSave: (data: TriggerFormInput ) => void;
}

export function TriggerModal(props: TriggerModalProps) {
  const methods = useForm<TriggerFormInput>({ resolver: yupResolver(triggerSchema) });
  const { handleSubmit, reset, watch, control } = methods;

  useEffect(() => {
    if (!props.isShowing) return;
    reset(props.isAdd ? defaultFormData : props.initialData);
  }, [props.isShowing, props.isAdd, props.initialData, reset]);

  const typeOptions = useMemo(() => props.types.map(
    type => ({ label: type, value: type })
  ), [props.types]);
  const targetOptions = useMemo(() => props.targets.map(
    ({ id, name }) => ({ label: name, value: id })
  ), [props.targets]);

  const selectedEvent = watch('event');
  const eventProperties = selectedEvent?.properties ?? [];
  const itiscodes = selectedEvent?.itiscodes ?? [];
  const defaultPropertyValues = isEventEqual(selectedEvent, props.initialData.event)
    ? props.initialData.properties
    : eventProperties.map(convertPropertyToDefaultInput);

  const actions = (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={handleSubmit(props.onSave)}
      disabled={props.isLoading}
    >
      Save
    </Button>
  );

  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title={`${props.isAdd ? 'Add' : 'Edit'} Trigger`}
        open={props.isShowing}
        handleClose={props.onClose}
        actions={actions}
      >
        <div className="trigger-modal">
          {props.isError &&
            <Alert severity="error">Something went wrong. Please refresh and try again.</Alert>}
          <FormInputSwitch
            name="enabled"
            label="Enabled"
            control={control}
            inputParams={{ className: "enable-switch" }} />
          <FormInputText
            name="name"
            label="Name"
            control={control}
            inputParams={{ autoFocus: true, className: "name-input" }} />
          <FormInputAutoComplete
            name="event"
            label="Event"
            options={props.events}
            control={control}
            inputParams={{
              className: "event-input",
              groupBy: (op: TriggerEvent) => op.entity,
              getOptionLabel: (op: TriggerEvent) =>  op.name,
              size: "small"
            }} />
          <TriggerEventProperties
            eventProperties={eventProperties}
            defaultValues={defaultPropertyValues} />
          <FormInputDropdown
            name="type"
            label="Type"
            options={typeOptions}
            control={control}
            inputParams={{ className: "type-input", size: "small", disabled: true }} />
          <FormInputDropdownMulti
            name="targets"
            label="Target Intersections"
            options={targetOptions}
            control={control}
            inputParams={{ className: "targets-input", size: "small" }} />
          <FormInputDropdown
            name="itis"
            label="ITIS Code"
            options={itiscodes}
            control={control}
            inputParams={{ className: "targets-input", size: "small", disabled: false }} />
        </div>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default TriggerModal;
