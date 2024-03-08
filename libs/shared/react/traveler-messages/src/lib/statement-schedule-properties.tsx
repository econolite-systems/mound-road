// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber } from '@econolite/react/forms';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import StatementScheduleTimeProperties from './statement-schedule-time-properties';

function StatementScheduleProperties({ parentName, statementType }: { parentName: string, statementType: {label: string, value: string}}) {
  const [type, setType] = useState<{label: string, value: string} | null>()
  const { control, setValue, watch } = useFormContext();

  if (type !== statementType) {
    setType(statementType);
    //setValue(`${parentName}.type`, statementType.value);
  }

  const selectedData = watch(`${parentName}.type`);

  const style = {
    sx: {
      maxWidth: '8rem'
    }
  }

  return (
    <>
{
      <FormInputDropdown name={`${parentName}.type`} label='When' control={control} inputParams={style} options={[{label: 'Immediate', value: 'immediate'},{label: 'Recurring', value: 'recurring'}]} />}
      {/* <Typography variant='body1'>{type?.label}</Typography> */}
      { (selectedData !== 'immediate') &&
        <>
          <FormInputNumber name={`${parentName}.times`} label='Times' control={control} inputParams={style}/>
          <StatementScheduleTimeProperties parentName={`${parentName}.in`}/>
        </>
      }
    </>
  )
}

export default StatementScheduleProperties
