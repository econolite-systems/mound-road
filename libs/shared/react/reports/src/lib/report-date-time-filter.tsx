// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormInputDate } from '@econolite/react/forms';
import { DialogSlideDown } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { date, object } from 'yup';
import { GetTodayDate, GetYesterdayDate } from '@econolite/shared-react-date-time-formatting';

const inputSchema = object(
    {
        startDate: date().required("Start date is required").default(GetYesterdayDate()),
        endDate: date().required("End date is required").default(GetTodayDate())
    }
);

export interface DateRangeFilterData {
    startDate: string,
    endDate: string
}

export interface dateRangeFilterProps {
    data?: Array<any>;
    filterData: (data: DateRangeFilterData) => void
    open: boolean;
    onClose: () => void,
}

export function DateRangeFilter(props: dateRangeFilterProps) {

    const input = { resolver: yupResolver(inputSchema), defaultValues: inputSchema.cast({}) };
    const methods = useForm(input);
    const onSubmit = (data: FieldValues) => { props.filterData(data as DateRangeFilterData) };
    const action = () => <Button color='inherit' variant='text' type='submit'
        onClick={methods.handleSubmit(onSubmit)}>Submit</Button>;
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
                    </Box>
                    </form>
                </DialogSlideDown>
            </FormProvider>

    );
}
