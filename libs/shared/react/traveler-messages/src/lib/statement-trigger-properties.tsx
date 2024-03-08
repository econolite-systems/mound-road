// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown } from '@econolite/react/forms';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePropertyTriggerEvents } from './hooks/use-triggers';
import StatementTriggerPropertiesInputs from './statement-trigger-properties-inputs';
import { StatementInputProperty } from './utils/trigger-props';

function StatementTriggerProperties({ parentName, selectedEvent }: { parentName: string, selectedEvent: string }) {
  const [propertyInput, setPropertyInput] = useState<StatementInputProperty | null>()
  const { control, watch } = useFormContext();
  const fields = usePropertyTriggerEvents();

  const selectedEventName = watch(`${parentName}.name`);

  let eventOptions: any[] = [];

  if (selectedEvent) {
    const selectEventIndex = fields.findIndex(field => selectedEvent === field.type);
    if (selectEventIndex >= 0) {
      eventOptions = fields[selectEventIndex].properties.map((field) => {
        return { label: field.label, value: field.value }
      })
    } else {
      eventOptions = [];
    }
  }

  if (selectedEventName) {
    const selectEventIndex = fields.findIndex(field => selectedEvent === field.type);
    if (selectEventIndex >= 0) {
      eventOptions = fields[selectEventIndex].properties;
      if (eventOptions.length >= 1) {
        const selectedEventNameIndex = eventOptions.findIndex(option => option.value === selectedEventName);
        if (selectedEventNameIndex >= 0) {
          const input = eventOptions[selectedEventNameIndex];
          if (propertyInput !== input) {
            setPropertyInput(input);
          }
        }
      }
    }
  }

  const style = {
    sx: {
      minWidth: '13rem'
    }
  }

  return (
    <>
      <FormInputDropdown name={`${parentName}.name`} label='Input' control={control} inputParams={style} options={eventOptions} />
      <StatementTriggerPropertiesInputs parentName={`${parentName}`} property={propertyInput} />
    </>
  )
}

export default StatementTriggerProperties
