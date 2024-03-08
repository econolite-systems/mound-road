// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { PavementConditionEntityState } from '@econolite/entities-state';
import {
  PavementConditionConfigDto,
  useGetPavementConditionQuery,
  usePutPavementConditionMutation,
  usePostPavementConditionMutation,
  PavementConditionConfigAdd,
  PavementConditionConfigUpdate
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
import FormWrongWayDriverConfig from '../wrong-way-driver/form-wrong-way-driver-config';

export const pavementConditionSchema = object({
  activeDays: number().min(0).max(255).required(),
});

export function ToPavementConditionAdd(condition: PavementConditionEntityState): PavementConditionConfigAdd {
  return {
    activeDays: condition.activeDays,
  }
}

export function ToPavementConditionUpdate(condition: PavementConditionEntityState): PavementConditionConfigUpdate {
  return {
    id: condition.id,
    activeDays: condition.activeDays,
  }
}

export function PavementConditionConfig() {
  const methods = useForm({ resolver: yupResolver(pavementConditionSchema) });
  //const [currentPavementCondition, setCurrentPavementCondition] = useState<PavementConditionConfigDto>({ activeDays: 7, id: "" });
  const { data, isLoading, refetch, isError } = useGetPavementConditionQuery();
  const [addPavementCondition] = usePostPavementConditionMutation();
  const [editPavementCondition] = usePutPavementConditionMutation();

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  // useEffect(() => {
  //   if (data) {
  //     setCurrentPavementCondition(data);
  //   }
  //   else {
  //     setCurrentPavementCondition({ activeDays: 7, id: "" });
  //   }
  //   methods.reset({ ...data });
  // }, [data]);

  const onSubmit = (values: FieldValues) => {
    if(!data){ return; }
    if (data.id === "") {
      addPavementCondition({ pavementConditionConfigAdd: ToPavementConditionAdd(values) }).then(() => refetch());
    } else {
      values['id'] = data.id;
      editPavementCondition({ pavementConditionConfigUpdate: ToPavementConditionUpdate(values) }).then(() => refetch());
    }
  };

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Pavement Condition</Typography>
      </Box>
      <FormProvider {...methods}>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormWrongWayDriverConfig activeDays={data ? data.activeDays:7}/>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          </form>
        </Box>
      </FormProvider>
    </>
    
  )
}

export default PavementConditionConfig
