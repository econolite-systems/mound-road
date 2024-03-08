// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown } from '@econolite/react/forms';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePropertyTriggerEvents } from './hooks/use-triggers';
import StatementScheduleProperties from './statement-schedule-properties';
import StatementTriggerProperties from './statement-trigger-properties';
import useEssMultiSelect from './hooks/use-ess-multi-select';
import { SelectChangeEvent } from '@mui/material/Select';

const style = {
  sx: {
    minWidth: '13rem'
  }
}

export interface StatementFormProps {
  parentName: string
}

function StatementForm({ parentName }: StatementFormProps) {
  const [entityTypes, setEntityTypes] = useState<Array<string>>([]);
  const [statementType, setStatementType] = useState({ label: 'Recurring', value: 'recurring' });
  const { control, resetField, watch } = useFormContext();
  const { formInput: essSelect } = useEssMultiSelect({ name: `${parentName}.entities`, style });
  const fields = usePropertyTriggerEvents();

  const options = () => {
    return fields.map((field) => {
      return { label: field.name, value: field.type }
    })
  };

  const selectedEvent = watch(`${parentName}.type`);

  const getStatementType = (statusType: string) => {
    return statusType === 'recurring' ? { label: 'Recurring', value: 'recurring' } : { label: 'Immediate', value: 'immediate' };
  }

  useEffect(() => {
    if (selectedEvent) {
      const selectEventIndex = fields.findIndex(field => selectedEvent === field.type);
      if (selectEventIndex >= 0) {
        const statusType = fields[selectEventIndex].statusType;
        if (fields[selectEventIndex]?.entityTypes !== entityTypes) {
          setEntityTypes(fields[selectEventIndex]?.entityTypes ?? []);
        }
        const selectedStatementType = getStatementType(statusType);
        if (selectedStatementType.value !== statementType.value) {
          setStatementType(selectedStatementType);
        }
      }
    }
  }, [entityTypes, fields, selectedEvent, statementType.value])

  const handleOnChangeOverride = (event: SelectChangeEvent) => {
    resetField(`${parentName}.property.name`);
    resetField(`${parentName}.property.comparator`);
    resetField(`${parentName}.property.value`);
  }

  return (
    <Grid container spacing={2}>
      <Grid container item sx={{ alignItems: 'center', gap: 1 }}>
        <FormInputDropdown name={`${parentName}.type`} label='Type' control={control} inputParams={style} options={options()} onChangeOverride={handleOnChangeOverride} />
        {(entityTypes.find((value) => value === 'ess')) &&
          essSelect}
      </Grid>
      <Grid container item sx={{ alignItems: 'center', gap: 1 }}>
        <StatementTriggerProperties parentName={`${parentName}.property`} selectedEvent={selectedEvent} />
      </Grid>
      <Grid container item sx={{ alignItems: 'center', gap: 1 }}>
        <StatementScheduleProperties parentName={`${parentName}.schedule`} statementType={statementType} />
      </Grid>
    </Grid>
  )
}

export default StatementForm
