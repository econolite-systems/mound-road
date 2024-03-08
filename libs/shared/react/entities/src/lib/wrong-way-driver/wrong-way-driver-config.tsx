// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { WrongWayDriverEntityState } from '@econolite/entities-state';
import {
  WrongWayDriverConfigDto,
  useGetWrongWayDriverQuery,
  usePutWrongWayDriverMutation,
  usePostWrongWayDriverMutation,
  WrongWayDriverConfigAdd,
  WrongWayDriverConfigUpdate
} from '@econolite/shared/data-access/api-configuration';
import { FormInputNumber } from '@econolite/react/forms';
import {
  useFormContext,
  FieldValues,
  FormProvider,
  useForm
} from 'react-hook-form';
import { number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormWrongWayDriverConfig from './form-wrong-way-driver-config';
import { Form } from 'react-router-dom';

export const wrongWayDriverSchema = object({
  activeDays: number().min(0).max(255).required(),
});

export function toWrongWayDriverAdd(wrongWayDriver: WrongWayDriverEntityState): WrongWayDriverConfigAdd {
  return {
    activeDays: wrongWayDriver.activeDays,
  }
}

export function toWrongWayDriverUpdate(wrongWayDriver: WrongWayDriverEntityState): WrongWayDriverConfigUpdate {
  return {
    id: wrongWayDriver.id,
    activeDays: wrongWayDriver.activeDays,
  }
}

export function WrongWayDriverConfig() {
  const methods = useForm({ resolver: yupResolver(wrongWayDriverSchema) });
  const { data, isLoading, refetch, isError } = useGetWrongWayDriverQuery();
  const [addWrongWayDriver] = usePostWrongWayDriverMutation();
  const [editWrongWayDriver] = usePutWrongWayDriverMutation();

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  const onSubmit = (values: FieldValues) => {
    if (!data) return; 
    if (data.id === "") {
      addWrongWayDriver({ wrongWayDriverConfigAdd: toWrongWayDriverAdd(values) }).then(() => refetch());
    } else {
      values['id'] = data.id;
      editWrongWayDriver({ wrongWayDriverConfigUpdate: toWrongWayDriverUpdate(values) }).then(() => refetch());
    }
  };

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Wrong Way Driver</Typography>
      </Box>
      <FormProvider {...methods}>
        {data && 
        <Box sx={{ width: '100%' }}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormWrongWayDriverConfig activeDays={data.activeDays}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          </form>
        </Box>}
      </FormProvider>
    </>
  )
}

export default WrongWayDriverConfig
