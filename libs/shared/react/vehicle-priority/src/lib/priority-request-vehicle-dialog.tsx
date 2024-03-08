// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PriorityRequestVehicle as Vehicle, PriorityRequestVehicleClassType } from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicle, { PriorityRequestVehicleFormData, priorityRequestVehicleSchema as schema, ScheduleTime } from './priority-request-vehicle';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleDialogProps {
  data?: Vehicle;
  types?: PriorityRequestVehicleClassType[]
  open: boolean;
  handleClose: () => void;
  add?: (entity: Vehicle) => void;
  edit?: (entity: Vehicle) => void;
  isAdd: boolean;
}

export function PriorityRequestVehicleDialog(
  props: PriorityRequestVehicleDialogProps
) {
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [current, setCurrent] = useState<Vehicle>();
  const [currentTypes, setCurrentTypes] = useState<PriorityRequestVehicleClassType[]>();

  //setup the form to use the schemas
  const methods = useForm({ resolver: yupResolver( schema ) });

  useEffect(() => {
    if (props.isAdd) {
      const currentDate = new Date();
      const startDate = currentDate;
      const endDate = currentDate;
      setStartTime(startDate);
      setEndTime(endDate);

      const classType = {
        id: 'Vehicle',
        type: 'vehicle',
        allowed: false
      };
      setCurrent(classType);
      setCurrentTypes(props.types?.map((v) => v) ?? []);
      //reset the form data
      methods.reset({ ...classType, startTime: startDate, endDate: endDate });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {//don't step on the default data if its an add
      setCurrent(props.data);
      const types = props.types?.map((v) => v) ?? [];
      setCurrentTypes(types);
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), props?.data?.startTime?.hour ?? currentDate.getHours(), props?.data?.startTime?.minute ?? currentDate.getMinutes());
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), props?.data?.endTime?.hour ?? currentDate.getHours(), props?.data?.endTime?.minute ?? currentDate.getMinutes());
      setStartTime(startDate);
      setEndTime(endDate);
      //convert the data  object structure to the flat list of fields needed for the form reset method
      const fieldData = {
        ...props.data,
        startTime: startDate,
        endTime: endDate
      };
      
      methods.reset({ ...fieldData });
    }
  }, [methods, props.data, props.isAdd]);

  const onSubmit = (data: FieldValues) => {
    const vehicleResult = {...data} as PriorityRequestVehicleFormData;
    const result = { ...data,
      startTime: {hour: vehicleResult.startTime?.getHours(), minute: vehicleResult.startTime?.getMinutes()},
      endTime: {hour: vehicleResult.endTime?.getHours(), minute: vehicleResult.endTime?.getMinutes()},
    }

    if (props.add && props.isAdd) {
      methods.reset({});
      props.add(result as Vehicle);
    } else if (props.edit) {
      methods.reset({});
      props.edit(result as Vehicle);
    }
  };

  const onClose = () => {
    methods.reset(schema.cast({}));
    props.handleClose();
  };

  const actions = () => (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={methods.handleSubmit(onSubmit)}
    >
      save
    </Button>
  );

  return (
    <FormProvider {...methods}>
      <DialogSlideIn
        title="Vehicles"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {current && (
                <PriorityRequestVehicle {...current} startTime={startTime} endTime={endTime} types={currentTypes} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default PriorityRequestVehicleDialog;
