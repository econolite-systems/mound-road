// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputDropdownMulti, FormInputOption, FormInputText } from '@econolite/react/forms';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { object, string } from 'yup';
import { useGetUsersQuery } from '@econolite/shared/data-access/api-reports';
import ActionTim from './action-tim';
import ActionSms from './action-sms';
import { ItisCodeType } from '@econolite/shared/data-access/api-tim';

export interface ActionFormProps {
  parentName: string;
  action?: string | null | undefined;
  itisCodesTypes?: ItisCodeType[];
  targets: Array<FormInputOption>;
}

export interface ActionProps {
  parentName: string;
  actions: { label: string, value: string }[];
  action?: string | null | undefined;
  itisCodesTypes?: ItisCodeType[];
  targets: any[]
}

export const actionFormSchema = object({
  action: string().optional().default(''),
});

function ActionForm({ parentName, action, targets, itisCodesTypes }: ActionFormProps) {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery({});

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const { control, setValue, watch, resetField } = useFormContext();

  const actionTypeOptions = [
    { label: "Send TIM Message", value: "send-tim-message" },
    { label: "Send SMS Message", value: "send-sms-message" },
  ];

  const [actionType, setActionType] = useState<string>();
  const selectedActionType = watch(`${parentName}.actionType`);

  return (
    <Grid container spacing={2}>
      {selectedActionType !== "send-sms-message" &&
        <ActionTim parentName={parentName} actions={actionTypeOptions} action={action} targets={targets} itisCodesTypes={itisCodesTypes} />
      }
      {selectedActionType === "send-sms-message" &&
        <ActionSms parentName={parentName} actions={actionTypeOptions} action={action} targets={targets} />
      }
    </Grid>
  );
}

export default ActionForm
