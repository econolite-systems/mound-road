// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PriorityRequestVehicle as Vehicle, PriorityRequestVehicleIntersection as Intersection } from '@econolite/shared/data-access/api-vehicle-priority';
import { PriorityRequestVehicleIntersectionFormData, priorityRequestVehicleIntersectionSchema as schema } from './priority-request-vehicle-intersection';
import PriorityRequestVehicleIntersection from './priority-request-vehicle-intersection';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleIntersectionDialogProps {
  data?: Intersection;
  vehicles?: Vehicle[];
  open: boolean;
  handleClose: () => void;
  edit?: (entity: Intersection) => void;
}

export function PriorityRequestVehicleIntersectionDialog(
  props: PriorityRequestVehicleIntersectionDialogProps
) {
  const [current, setCurrent] = useState<Intersection>();
  const [currentTypes, setCurrentTypes] = useState<Vehicle[]>();

  //setup the form to use the schemas
  const methods = useForm({ resolver: yupResolver( schema ) });

  useEffect(() => {
      //don't step on the default data if its an add
      setCurrent(props.data);
      const types = props.vehicles?.map((v) => v) ?? [];
      setCurrentTypes(types);
      //convert the data  object structure to the flat list of fields needed for the form reset method
      const fieldData = {
        ...props.data
      };
      
      methods.reset({ ...fieldData });
  }, [methods, props.data]);

  const onSubmit = (data: FieldValues) => {
    const vehicleResult = {...data} as PriorityRequestVehicleIntersectionFormData;
    const result = { ...data }

    if (props.edit) {
      methods.reset({});
      props.edit(result as Intersection);
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
                <PriorityRequestVehicleIntersection {...current} available={currentTypes} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default PriorityRequestVehicleIntersectionDialog;
