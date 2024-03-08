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

export interface FilterData {
  deviceId?: string[],
  startDate: string,
  endDate: string
}

export interface reportfilterProps {
  data?: Array<any>;
  filterData: (data: FilterData) => void
  open: boolean;
  onClose: () => void,
}

export function ReportsEnvironmentalSensorsFilter(props: reportfilterProps) {
  const [entities, setEntities] = useState<Array<FormInputOption>>([]);

  const { data } = useGetEntitiesTypesByTypeQuery({ type: 'Environmental Sensor' });

  useEffect(() => {
    if (!data)
      return;

    const essEntities = data.map((entities) => {
      return { value: entities.id, label: entities.name } as FormInputOption
    });

    setEntities(essEntities)
  }, [data]);

  const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
  const methods = useForm(input);
  const onSubmit = (data: FieldValues) => { props.filterData(data as FilterData) };
  const action = () => <Button color='inherit' variant='contained' type='submit'
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
              options={entities}
              defaultValue={[]}
              label='Select Sensors'
              name='deviceId'
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

export function ReportsRoadSideUnitFilter(props: reportfilterProps) {
  const [entities, setEntities] = useState<Array<FormInputOption>>([]);

  const { data } = useGetEntitiesTypesByTypeQuery({ type: 'Rsu' });

  useEffect(() => {
    if (!data)
      return;

    const rsuEntities = data.map((entities) => {
      return { value: entities.id, label: entities.name } as FormInputOption
    });

    setEntities(rsuEntities)
  }, [data]);

  const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
  const methods = useForm(input);
  const onSubmit = (data: FieldValues) => { props.filterData(data as FilterData) };
  const action = () => <Button color='inherit' variant='contained' type='submit'
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
              options={entities}
              defaultValue={[]}
              label='Select Road Side Units'
              name='deviceIds'
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

