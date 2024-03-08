// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputDropdownMulti, FormInputText } from '@econolite/react/forms';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';
import { ActionProps } from './action-form';
import { useGetUsersQuery } from '@econolite/shared/data-access/api-reports';

function ActionSms({ parentName, actions, action, targets }: ActionProps) {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery({});
  const { control, setValue ,watch } = useFormContext();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const getVerifiedUsersWithPhoneNumbers = () => {
    if (users && users.length > 0) {
      return users.filter(x => x.username && x.email && x.emailVerified && x.attributes && ("phoneNumber" in x.attributes)).map(({ username, ...rest }) => (
        {
          label: username,
          value: username
        }));
    }
    return [];
  };

  const style = { sx:{
      minWidth: '13rem'
    }
  }

  return (
    <Grid container item sx={{alignItems: 'center', gap: 2}}>
      <FormInputDropdown inputParams={style} name={`${parentName}.actionType`} label="Action" options={actions} control={control} defaultValue={action ?? ""} />
      <FormInputDropdownMulti inputParams={style} name={`${parentName}.parameter`} label="Users" options={getVerifiedUsersWithPhoneNumbers()} control={control} defaultValue={[]} />
    </Grid>
  );
}

export default ActionSms
