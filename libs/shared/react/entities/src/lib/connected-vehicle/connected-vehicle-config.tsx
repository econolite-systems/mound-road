// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { ConnectedVehicleState } from '@econolite/entities-state';
import {
  ConnectedVehicleConfigDto,
  useGetConnectedVehicleQuery,
  usePutConnectedVehicleMutation,
  usePostConnectedVehicleMutation,
  ConnectedVehicleConfigAdd,
  ConnectedVehicleConfigUpdate
} from '@econolite/shared/data-access/api-configuration';
import { FormInputNumber, FormInputTime, FormInputDropdown } from '@econolite/react/forms';
import {
  FieldValues,
  FormProvider,
  useForm
} from 'react-hook-form';
import { number, object, string, date } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const connectedVehicleConditionSchema = object({
  onlineStorageType: string().required(),
  archiveStorageType: string().required(),
  //Ui needs to validate its not 0 but might not be visible; so always need to let UI default to 1 and we'll set to 0 when we save
  onlineDays: number().min(1).max(365).required(),
  onlineSize: number().positive("Please enter a positive number").integer("Please enter an integer").min(1).max(250).required(),//max is 250 GB for Mongo
  archivedDays: number().min(1).max(365).required(),
  archivedSize: number().positive("Please enter a positive number").integer("Please enter an integer").min(1).max(1024).required(),//max is 1 TB = 1024 GB for Azure
  startTime: date().required(),
  endTime: date().required(),
});

export function ToConnectedVehicleAdd(cv: ConnectedVehicleState): ConnectedVehicleConfigAdd {

  CheckStorageType(cv);

  return {
    onlineStorageType: cv.onlineStorageType,
    archiveStorageType: cv.archiveStorageType,
    onlineDays: cv.onlineDays ?? 0,
    onlineSize: cv.onlineSize ?? 0,
    archivedDays: cv.archivedDays ?? 0,
    archivedSize: cv.archivedSize ?? 0,
    startTime: cv.startTime,
    endTime: cv.endTime
  }
}

export function ToConnectedVehicleUpdate(cv: ConnectedVehicleState): ConnectedVehicleConfigUpdate {

  CheckStorageType(cv);

  return {
    id: cv.id,
    onlineStorageType: cv.onlineStorageType,
    archiveStorageType: cv.archiveStorageType,
    onlineDays: cv.onlineDays ?? 0,
    onlineSize: cv.onlineSize ?? 0,
    archivedDays: cv.archivedDays ?? 0,
    archivedSize: cv.archivedSize ?? 0,
    startTime: cv.startTime,
    endTime: cv.endTime
  }
}

export function ToConnectedVehicleUI(cv: ConnectedVehicleConfigDto): any {
  //convert bytes to GB and if 0 set to 1 for the ui validation
  let onlineSize = 0;
  if (cv.onlineStorageType === 'Size') {
    onlineSize = convertBytesToGB(cv.onlineSize ?? 0);
  }
  onlineSize = onlineSize === 0 ? 1 : onlineSize;
  let archivedSize = 0;
  if (cv.archiveStorageType === 'Size') {
    archivedSize = convertBytesToGB(cv.archivedSize ?? 0);
  }
  archivedSize = archivedSize === 0 ? 1 : archivedSize;

  //set default values to 1 to pass validation on hidden fields
  let onlineDays: number = cv.onlineDays ?? 1;
  onlineDays = onlineDays === 0 ? 1 : onlineDays;
  let archivedDays: number = cv.archivedDays ?? 1;
  archivedDays = archivedDays === 0 ? 1 : archivedDays;

  const startTime: Date = cv.startTime ? new Date(cv.startTime) : new Date();
  const endTime: Date = cv.endTime ? new Date(cv.endTime) : new Date();

  return {
    id: cv.id,
    onlineStorageType: cv.onlineStorageType,
    archiveStorageType: cv.archiveStorageType,
    onlineDays: onlineDays,
    onlineSize: onlineSize,
    archivedDays: archivedDays,
    archivedSize: archivedSize,
    startTime: startTime,
    endTime: endTime
  }
}

function CheckStorageType(cv: ConnectedVehicleState) {
  if (cv.onlineStorageType === 'Size') {
    cv.onlineDays = 0;
    cv.onlineSize = convertGBToBytes(cv.onlineSize ?? 0);
  }
  else if (cv.onlineStorageType === 'Age') {
    cv.onlineSize = 0;
  }

  if (cv.archiveStorageType === 'Size') {
    cv.archivedDays = 0;
    cv.archivedSize = convertGBToBytes(cv.archivedSize ?? 0);
  }
  else if (cv.archiveStorageType === 'Age') {
    cv.archivedSize = 0;
  }

  return cv;
}

//1 gigabytes = 1073741824 bytes
function convertGBToBytes(gigs: number) {
  return gigs * 1073741824;
}
function convertBytesToGB(gigs: number) {
  return gigs / 1073741824;
}

export function ConnectedVehicleConfig() {
  const defaultData: ConnectedVehicleConfigDto = { onlineStorageType: 'Size', archiveStorageType: 'Size', onlineSize: 1073741824, onlineDays: 1, archivedSize: 1073741824, archivedDays: 1, startTime: new Date().toDateString(), endTime: new Date().toDateString(), id: '' };
  const methods = useForm({ resolver: yupResolver(connectedVehicleConditionSchema) });
  const [currentConnectedVehicleCondition, setCurrentConnectedVehicleCondition] = useState<ConnectedVehicleConfigDto>(ToConnectedVehicleUI(defaultData));
  const { data, isLoading, isError, refetch } = useGetConnectedVehicleQuery();
  const [addConnectedVehicle] = usePostConnectedVehicleMutation();
  const [editConnectedVehicle] = usePutConnectedVehicleMutation();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const onlineStorageType = methods.watch('onlineStorageType', 'onlineSize');
  const archiveStorageType = methods.watch('archiveStorageType', 'archiveSize');

  useEffect(() => {
    const cleanedUpData = ToConnectedVehicleUI(data ?? defaultData);
    setCurrentConnectedVehicleCondition(cleanedUpData);
    methods.reset({ ...cleanedUpData });
  }, [data]);

  const onSubmit = (data: FieldValues) => {
    if (currentConnectedVehicleCondition.id === "") {
      addConnectedVehicle({ connectedVehicleConfigAdd: ToConnectedVehicleAdd(data) }).then(() => refetch());
    } else {
      editConnectedVehicle({ connectedVehicleConfigUpdate: ToConnectedVehicleUpdate(data) }).then(() => refetch());
    }
  };

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Connected Vehicle</Typography>
      </Box>
      <FormProvider {...methods}>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, borderColor: 'divider', pb: 2 }}>
              <FormInputDropdown
                name='onlineStorageType'
                label='Select whether to Archive Online Data by Size or Age:'
                options={[
                  { label: "Size (GB)", value: "Size" },
                  { label: "Age (Days)", value: "Age" }
                ]}
                control={methods.control}
                defaultValue={currentConnectedVehicleCondition.onlineStorageType}
              />
              {onlineStorageType === 'Age' &&
                <FormInputNumber
                  name='onlineDays'
                  label='Enter Age (Days) of Online Data to Archive:'
                  defaultValue={currentConnectedVehicleCondition.onlineDays}
                  control={methods.control}
                />}
              {onlineStorageType === 'Size' &&
                <FormInputNumber
                  name='onlineSize'
                  label="Enter Size (GB) of Online Data to Archive:"
                  defaultValue={currentConnectedVehicleCondition.onlineSize}
                  control={methods.control}
                />}
              <FormInputDropdown
                name='archiveStorageType'
                label='Select whether to Purge Archived Data by Size or Age:'
                options={[
                  { label: "Size (GB)", value: "Size" },
                  { label: "Age (Days)", value: "Age" }
                ]}
                control={methods.control}
                defaultValue={currentConnectedVehicleCondition.archiveStorageType}
              />
              {archiveStorageType === 'Age' &&
                <FormInputNumber
                  name='archivedDays'
                  label='Enter Age (Days) of Archived Data to Purge:'
                  defaultValue={currentConnectedVehicleCondition.archivedDays}
                  control={methods.control}
                />}
              {archiveStorageType === 'Size' &&
                <FormInputNumber
                  name='archivedSize'
                  label='Enter Size (GB) of Archived Data to Purge:'
                  defaultValue={currentConnectedVehicleCondition.archivedSize}
                  control={methods.control}
                />}
              <FormInputTime
                name="startTime"
                label="Begin Archive and Purge operations at:"
                defaultValue={currentConnectedVehicleCondition.startTime ?? null}
                control={methods.control}
              />
              <FormInputTime
                name="endTime"
                label="End Archive and Purge operations at:"
                defaultValue={currentConnectedVehicleCondition.endTime ?? null}
                control={methods.control}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </form>
        </Box>
      </FormProvider>
    </>

  )
}

export default ConnectedVehicleConfig
