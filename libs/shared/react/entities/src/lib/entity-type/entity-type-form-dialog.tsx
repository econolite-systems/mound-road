// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import FormEntityConfig, { entitySchema } from '../common/form-entity-config';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { EntityType, useGetEntityTypeByIdQuery } from '@econolite/shared/data-access/api-configuration';
import { DefaultEntityType, EntityTypeState } from './entity-type-config';

/* eslint-disable-next-line */
export interface EntityTypeFormDialogProps {
  data?: string;
  open: boolean;
  handleClose: () => void;
  addEntity?: (entity: EntityTypeState) => void;
  editEntity?: (entity: EntityTypeState) => void;
  isAdd: boolean;
}

export interface EntityTypeDto {
  id?: string;
  name?: string;
  description?: string;
}
//incorporate all the field and field validation definitions
export const schema = entitySchema;

export function EntityTypeFormDialog(props: EntityTypeFormDialogProps) {
  const [currentEntity, setCurrentEntity] = useState<EntityTypeState>();
  const { data, isLoading, isFetching, refetch } = useGetEntityTypeByIdQuery(
    { id: props.data ?? '' },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  const methods = useForm({ resolver: yupResolver(schema) });
  //const data: EntityTypeDto = {}
  useEffect(() => {
    if (props.isAdd) {
      setCurrentEntity(DefaultEntityType);
      //reset the form data
      methods.reset({ ...DefaultEntityType });
    }
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {
      setCurrentEntity(data as EntityTypeState);
      const fieldData = {
        ...data
      };
      methods.reset({ ...fieldData });
    }
  }, [data, props.isAdd]);

  const onSubmit = (data: FieldValues) => {
    if (props.addEntity && props.isAdd) {
      methods.reset({});
      props.addEntity(data as EntityTypeState);
    } else if (props.editEntity) {
      methods.reset({});
      props.editEntity(data as EntityTypeState);
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
        title="Type"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {currentEntity && (
              <FormEntityConfig {...currentEntity} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default EntityTypeFormDialog;
