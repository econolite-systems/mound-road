// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputNumber, FormInputPassword, FormInputText } from '@econolite/react/forms';
import { useGetAcyclicaQuery, usePutAcyclicaMutation } from '@econolite/shared/data-access/api-configuration';

export const acyclicaConfigSchema = object({
  url: string().required(),
  apiKey: string().required(),
  pollInterval: number().integer().min(1).max(15).required()
});

export function AcyclicaConfig() {

  const methods = useForm({ resolver: yupResolver(acyclicaConfigSchema) });
  const { data, isLoading, refetch, isSuccess, isError } = useGetAcyclicaQuery();
  const [update] = usePutAcyclicaMutation();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const onSubmit = (values: FieldValues) => {
    if (data) {
      update({ acyclicaConfigDto: { id: data.id, url: values['url'], apiKey: values['apiKey'], pollInterval: values['pollInterval'] * 60 } });
    }
  }

  return (
    <>
      {(isLoading) &&
        <div>Loading...</div>
      }
      {(isSuccess && data) &&
        <>
          <Box sx={{ py: 3 }}>
            <Typography variant='h2'>Acyclica Configuration</Typography>
          </Box>
          <FormProvider {...methods}>
            <Box sx={{ width: '100%' }}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, borderColor: 'divider', pb: 2 }}>
                  <FormInputText
                    name='url'
                    label='Url'
                    defaultValue={data.url}
                    control={methods.control} />
                  <FormInputPassword
                    name='apiKey'
                    label='API Key'
                    defaultValue={data.apiKey}
                    control={methods.control} />
                  <FormInputNumber
                    name='pollInterval'
                    label='Poll Interval (Minutes)'
                    defaultValue={Math.floor((data.pollInterval as number) / 60)}
                    control={methods.control} />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </form>
            </Box>
          </FormProvider>
        </>
      }
    </>
  )
}

export default AcyclicaConfig;
