// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormInputDate, FormInputDropdownMulti, FormInputOption } from '@econolite/react/forms';
import { DialogSlideDown } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { date, object } from 'yup';
import { useEffect, useState } from 'react';
import { useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { GetTodayDate, GetYesterdayDate } from '@econolite/shared-react-date-time-formatting';

const inputSchema = object(
  {
    startDate: date().required("Start date is required").default(GetYesterdayDate()),
    endDate: date().required("End date is required").default(GetTodayDate())
  }
);

export interface FilterCorridorData {
  corridorId?: string[],
  startDate: string,
  endDate: string
}

export interface reportsCorridorFilterProps {
  data?: Array<any>;
  filterData: (data: FilterCorridorData) => void
  open: boolean;
  onClose: () => void,
}

export function ReportsCorridorFilter(props: reportsCorridorFilterProps) {
  const [corridors, setCorridors] = useState<Array<FormInputOption>>([]);

  const { data, isLoading, isFetching, refetch, isError } = useGetEntitiesTypesByTypeQuery({ type: 'corridor' });;

  useEffect(() => {
    if (!data)
      return;

    const corridorsList = data.map(function (corridor) {
      return { value: corridor.id, label: corridor.name } as FormInputOption
    });

    setCorridors(corridorsList)
  }, [data]);

  const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
  const methods = useForm(input);
  const onSubmit = (data: FieldValues) => { props.filterData(data as FilterCorridorData) };
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
            <FormInputDropdownMulti
              options={corridors}
              defaultValue={[]}
              label='Select Corridor'
              name='corridorId'
              control={methods.control}
              inputParams={style} />
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
          </Box>
        </form>
      </DialogSlideDown>
    </FormProvider>
  );
}
