// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputPassword, FormInputText } from '@econolite/react/forms';
import { useGetTwilioQuery, usePutTwilioMutation } from '@econolite/shared/data-access/api-configuration';

export const twilioConfigSchema = object({
  accountSid: string().required(),
  authToken: string().required(),
  senderPhone: string().required()
});

export function TwilioConfig() {

  const methods = useForm({ resolver: yupResolver(twilioConfigSchema) });
  const { data, isLoading, refetch, isSuccess, isError } = useGetTwilioQuery();
  const [update] = usePutTwilioMutation();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const onSubmit = (values: FieldValues) => {
    if (data) {
      update({ twilioConfigDto: { id: data.id, accountSid: values['accountSid'], authToken: values['authToken'], senderPhone: values['senderPhone'] } });
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
            <Typography variant='h2'>Twilio Configuration</Typography>
          </Box>
          <FormProvider {...methods}>
            <Box sx={{ width: '100%' }}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, borderColor: 'divider', pb: 2 }}>
                  <FormInputText
                    name='accountSid'
                    label='Account SID'
                    defaultValue={data.accountSid}
                    control={methods.control} />
                  <FormInputPassword
                    name='authToken'
                    label='Authorization Token'
                    defaultValue={data.authToken}
                    control={methods.control} />
                  <FormInputText
                    name='senderPhone'
                    label='Sender Phone'
                    defaultValue={data.senderPhone}
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

export default TwilioConfig;
