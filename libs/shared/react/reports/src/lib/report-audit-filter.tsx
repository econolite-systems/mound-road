// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormInputDate, FormInputDropdownMulti, FormInputOption } from '@econolite/react/forms';
import { DialogSlideDown } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, object } from "yup";
import { useEffect, useState } from 'react';
import { useGetAuditReportGetAuditEventTypesQuery, useGetUsersQuery } from '@econolite/shared/data-access/api-reports';
import { GetTodayDate, GetYesterdayDate } from '@econolite/shared-react-date-time-formatting';

const inputSchema = object(
  {
    startDate: date().required("Start date is required").default(GetYesterdayDate()),
    endDate: date().required("End date is required").default(GetTodayDate())
  }
);

export interface ReportsAuditFilterData {
  startDate: string,
  endDate: string,
  eventTypes?: string[],
  usernames?: string[]
}

export interface ReportsAuditFilterProps {
  data?: Array<any>;
  filterData: (data: ReportsAuditFilterData) => void
  open: boolean;
  onClose: () => void,
}

export function ReportsAuditFilter(props: ReportsAuditFilterProps) {
  const [eventTypes, setEventTypes] = useState<Array<FormInputOption>>([]);

  const { data: events } = useGetAuditReportGetAuditEventTypesQuery();

  useEffect(() => {
    if (!events)
      return;

    const items = Object.entries(events).map(([k, v]) => {
      return { value: k, label: v.name } as FormInputOption
    });

    setEventTypes(items);
  }, [events]);

  const [usernames, setUsernames] = useState<Array<FormInputOption>>([]);

  const { data: users } = useGetUsersQuery({ locked: false });

  useEffect(() => {
    if (!users)
      return;

    const items = users.map((u) => {
      return { value: u.username, label: u.username } as FormInputOption
    });

    setUsernames(items);
  }, [users]);

  const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
  const methods = useForm(input);
  const onSubmit = (data: FieldValues) => { props.filterData(data as ReportsAuditFilterData) };
  const action = () => <Button color='inherit' variant='text' type='submit'
    onClick={methods.handleSubmit(onSubmit)}>Submit</Button>;
  const style = { sx: { minWidth: '250px', maxWidth: '25vw' } };
  return (
    <FormProvider {...methods}>
      <DialogSlideDown
        title='Select Dates'
        open={props.open}
        actions={action()}
        handleClose={props.onClose}>
        <form>
          <Box sx={{ paddingTop: '10px', display: 'flex', flexDirection: 'row', width: '50vw', columnGap: 2, mb: 1 }}>
            <FormInputDate
              name='startDate'
              label='Start Date'
              control={methods.control}
            />
            <FormInputDate
              name='endDate'
              label='End Date'
              control={methods.control}
            />
            <FormInputDropdownMulti
              options={eventTypes}
              defaultValue={[]}
              name='eventTypes'
              label='Event Type'
              control={methods.control}
              inputParams={style}
            />
            <FormInputDropdownMulti
              options={usernames}
              defaultValue={[]}
              name='usernames'
              label='Username'
              control={methods.control}
              inputParams={style}
            />
          </Box>
        </form>
      </DialogSlideDown>
    </FormProvider>
  );
}
