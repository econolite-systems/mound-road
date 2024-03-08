// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { statementScheduleTimeSchema } from './utils/trigger-helpers';

function StatementScheduleProperties({ parentName }: { parentName: string}) {
  const { control } = useFormContext();
  const style = {
    sx: {
      maxWidth: '8rem'
    }
  }
  return (
    <>
      <FormInputNumber name={`${parentName}.minutes`} label='Minutes' control={control} inputParams={style}></FormInputNumber>
      <FormInputNumber name={`${parentName}.seconds`} label='Seconds' control={control} inputParams={style}></FormInputNumber>
    </>
  )
}

export default StatementScheduleProperties
