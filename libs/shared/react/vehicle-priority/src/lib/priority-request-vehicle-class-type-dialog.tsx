// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PriorityRequestVehicleClassType as ClassType } from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicleClassType, { priorityRequestVehicleClassTypeSchema as schema } from './priority-request-vehicle-class-type';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassTypeDialogProps {
  data?: ClassType;
  open: boolean;
  handleClose: () => void;
  add?: (entity: ClassType) => void;
  edit?: (entity: ClassType) => void;
  isAdd: boolean;
}

export function PriorityRequestVehicleClassTypeDialog(
  props: PriorityRequestVehicleClassTypeDialogProps
) {

  const [current, setCurrent] = useState<ClassType>();

  //setup the form to use the schemas
  const methods = useForm({ resolver: yupResolver( schema ) });

  useEffect(() => {
    if (props.isAdd) {
      const classType = {
        id: 10,
        type: 'vehicle type'
      };
      setCurrent(classType);
      //reset the form data
      methods.reset({ ...classType });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {//don't step on the default data if its an add
      setCurrent(props.data);
      //convert the data  object structure to the flat list of fields needed for the form reset method
      const fieldData = {
        ...props.data
      };
      methods.reset({ ...fieldData });
    }
  }, [methods, props.data, props.isAdd]);

  const onSubmit = (data: FieldValues) => {
    if (props.add && props.isAdd) {
      methods.reset({});
      props.add(data as ClassType);
    } else if (props.edit) {
      methods.reset({});
      props.edit(data as ClassType);
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
        title="Vehicle Class Type"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {current && (
                <PriorityRequestVehicleClassType {...current} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default PriorityRequestVehicleClassTypeDialog;
