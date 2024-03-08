// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormInputText } from '@econolite/react/forms';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { DialogSlideDown } from '@econolite/dialogs';

const inputSchema = object(
  {
    username: string().optional()
  }
);

export interface ReportsRevokedCredentialsFilterData {
  username: string
}

export interface ReportsRevokedCredentialsFilterProps {
  data?: Array<any>;
  filterData: (data: ReportsRevokedCredentialsFilterData) => void
  open: boolean;
  onClose: () => void,
}

export function ReportsRevokedCredentialsFilter(props: ReportsRevokedCredentialsFilterProps) {
  const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
  const methods = useForm(input);
  const onSubmit = (data: FieldValues) => { props.filterData(data as ReportsRevokedCredentialsFilterData) };
  const action = () => <Button color='inherit' variant='text' type='submit'
    onClick={methods.handleSubmit(onSubmit)}>Submit</Button>;
  return (
    <FormProvider {...methods}>
      <DialogSlideDown
        title='Select Username'
        open={props.open}
        actions={action()}
        handleClose={props.onClose}>
        <form>
          <Box sx={{ paddingTop: '10px', display: 'flex', flexDirection: 'row', width: '50vw', columnGap: 2, mb: 1 }}>
            <FormInputText
              name='username'
              label='User Name'
              control={methods.control}
            />
          </Box>
        </form>
      </DialogSlideDown>
    </FormProvider>
  );
}
