// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { FormInputDropdown, FormInputNumber, FormInputOption } from '@econolite/react/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { number, object } from 'yup';
import { TimingPlanLogicFlagState, useGetWeatherResponsiveGlobalConfigQuery, usePutWeatherResponsiveGlobalConfigMutation } from '@econolite/shared/data-access/api-configuration';

export function CorridorConfigGlobal() {

  const schema = object({
    logicFlag1: number().min(1).max(64),
    logicFlagState1: number(),
    logicFlag2: number().min(1).max(64),
    logicFlagState2: number(),
    logicFlag3: number().min(1).max(64),
    logicFlagState3: number(),
    logicFlag4: number().min(1).max(64),
    logicFlagState4: number()
  });

  const { data: globalConfig, isLoading, isError, refetch } = useGetWeatherResponsiveGlobalConfigQuery();
  const [updateGlobalConfig] = usePutWeatherResponsiveGlobalConfigMutation();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const [open, setOpen] = useState(false);
  const methods = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data: FieldValues) => {
    if (globalConfig) {
      const tplfs: Array<TimingPlanLogicFlagState> = [
        { timingPlan: 1, logicFlag: data['logicFlag1'], logicFlagState: data['logicFlagState1'] },
        { timingPlan: 2, logicFlag: data['logicFlag2'], logicFlagState: data['logicFlagState2'] },
        { timingPlan: 3, logicFlag: data['logicFlag3'], logicFlagState: data['logicFlagState3'] },
        { timingPlan: 4, logicFlag: data['logicFlag4'], logicFlagState: data['logicFlagState4'] },
      ];
      updateGlobalConfig({ weatherResponsiveGlobalConfig: { id: globalConfig.id, timingPlanLogicFlagStates: tplfs } });
    }
    setOpen(false);
  };
  const actions = () => (
    <Button
      type="submit"
      variant="text"
      color="inherit"
      onClick={methods.handleSubmit(onSubmit)}>Save</Button>
  );

  const logicFlagStateOptions: Array<FormInputOption> = [
    { label: "Not Specified", value: 0 },
    { label: "On", value: 1 },
    { label: "Off", value: 2 },
    { label: "Rising Edge Trigger", value: 3 },
    { label: "Falling Edge Trigger", value: 4 }
  ];

  return (
    <>
      <Button style={{ float: 'right' }} onClick={() => { setOpen(true) }}>Configure</Button>
      {globalConfig && globalConfig.timingPlanLogicFlagStates && globalConfig.timingPlanLogicFlagStates.length > 0 && open &&
        <DialogSlideIn
          title="Configure"
          open={open}
          handleClose={() => { setOpen(false) }}
          actions={actions()}>
          <FormProvider {...methods}>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
              <FormLabel style={{ marginRight: '10px' }}>Timing Plan 1</FormLabel>
              <FormInputNumber name="logicFlag1" label="Logic Flag" control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[0].logicFlag}></FormInputNumber>
              <FormInputDropdown name="logicFlagState1" label="State" options={logicFlagStateOptions} control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[0].logicFlagState}></FormInputDropdown>
              <Divider />
              <FormLabel style={{ marginRight: '10px' }}>Timing Plan 2</FormLabel>
              <FormInputNumber name="logicFlag2" label="Logic Flag" control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[1].logicFlag}></FormInputNumber>
              <FormInputDropdown name="logicFlagState2" label="State" options={logicFlagStateOptions} control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[1].logicFlagState}></FormInputDropdown>
              <Divider />
              <FormLabel style={{ marginRight: '10px' }}>Timing Plan 3</FormLabel>
              <FormInputNumber name="logicFlag3" label="Logic Flag" control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[2].logicFlag}></FormInputNumber>
              <FormInputDropdown name="logicFlagState3" label="State" options={logicFlagStateOptions} control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[2].logicFlagState}></FormInputDropdown>
              <Divider />
              <FormLabel style={{ marginRight: '10px' }}>Timing Plan 4</FormLabel>
              <FormInputNumber name="logicFlag4" label="Logic Flag" control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[3].logicFlag}></FormInputNumber>
              <FormInputDropdown name="logicFlagState4" label="State" options={logicFlagStateOptions} control={methods.control} defaultValue={globalConfig.timingPlanLogicFlagStates[3].logicFlagState}></FormInputDropdown>
            </Box>
          </FormProvider>
        </DialogSlideIn>
      }
    </>
  );
}

export default CorridorConfigGlobal;
