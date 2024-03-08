// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PriorityRequestVehicleClassLevel as ClassLevel, PriorityRequestVehicleClassType } from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicleClassLevel, { priorityRequestVehicleClassLevelSchema as schema } from './priority-request-vehicle-class-level';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleClassLevelDialogProps {
  data?: ClassLevel;
  types?: PriorityRequestVehicleClassType[]
  open: boolean;
  handleClose: () => void;
  add?: (entity: ClassLevel) => void;
  edit?: (entity: ClassLevel) => void;
  isAdd: boolean;
}

export function PriorityRequestVehicleClassLevelDialog(
  props: PriorityRequestVehicleClassLevelDialogProps
) {

  const [current, setCurrent] = useState<ClassLevel>();
  const [currentTypes, setCurrentTypes] = useState<PriorityRequestVehicleClassType[]>();

  //setup the form to use the schemas
  const methods = useForm({ resolver: yupResolver( schema ) });

  useEffect(() => {
    if (props.isAdd) {
      const classType = {
        id: 0,
        type: 'vehicle'
      };
      setCurrent(classType);
      setCurrentTypes(props.types?.map((v) => v) ?? []);
      //reset the form data
      methods.reset({ ...classType });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {//don't step on the default data if its an add
      setCurrent(props.data);
      const withoutEditType = props.types?.map((v) => v) ?? [];
      const withEditType = [...withoutEditType, { id: 0, type: props.data?.type}]
      setCurrentTypes(withEditType);
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
      props.add(data as ClassLevel);
    } else if (props.edit) {
      methods.reset({});
      props.edit(data as ClassLevel);
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
        title="Vehicle Class Level"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {current && (
                <PriorityRequestVehicleClassLevel {...current} types={currentTypes} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default PriorityRequestVehicleClassLevelDialog;
