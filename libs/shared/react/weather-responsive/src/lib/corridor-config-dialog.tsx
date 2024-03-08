// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { WeatherResponsiveCorridorConfigState } from './corridor-config-state';
import { useGetWeatherResponsiveConfigByCorridorIdAndConfigIdQuery, useGetWeatherResponsiveEdaptiveConfigurationsByCorridorIdQuery } from '@econolite/shared/data-access/api-configuration';
import { array, boolean, number, object, string } from 'yup';
import CorridorConfigForm, { CorridorConfigFormModel } from './corridor-config-form';

export interface CorridorConfigModalProps {
  id?: string;
  open: boolean;
  handleClose: () => void;
  addConfig?: (entity: WeatherResponsiveCorridorConfigState) => void;
  editConfig?: (entity: WeatherResponsiveCorridorConfigState) => void;
  isAdd: boolean;
  corridorId: string;
}

//incorporate all the field and field validation definitions
const alphaNumRegEx = /^[A-z 0-9]*$/;
export const schema = object({
  name: string().matches(alphaNumRegEx, 'special characters are not allowed').required(),
  isEnabled: boolean().default(true),
  hasPrecipitation: boolean().default(false),
  temperatureThreshold: number().default(0),
  roadConditions: array().default([]),
  minimumConfidence: number().default(1).min(1),
  enableEdaptive: boolean().default(false),
  edaptiveConfigurationId: number().optional(),
  adjustSpeed: boolean().default(false),
  speedAdjustment: number(),
  speedOverrideType: string(),
  adjustTimingPlan: boolean().default(false),
  timingPlan: number()
});

export function CorridorConfigDialog(props: CorridorConfigModalProps) {

  const [currentConfig, setCurrentConfig] = useState<CorridorConfigFormModel>();
  const { data, isLoading, isFetching, refetch, isError } = useGetWeatherResponsiveConfigByCorridorIdAndConfigIdQuery({ corridorId: props.corridorId, configId: props.id || '' });
  const edaptiveQuery = useGetWeatherResponsiveEdaptiveConfigurationsByCorridorIdQuery({ corridorId: props.corridorId });

  //setup the form to use the schemas
  const methods = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (props.isAdd) {
      const defaultConfig = {
        name: '',
        isEnabled: true,
        hasPrecipitation: false,
        temperatureThreshold: 32,
        roadConditions: [],
        minimumConfidence: 1,
        enableEdaptive: false,
        edaptiveConfigurationId: undefined,
        adjustSpeed: false,
        speedAdjustment: -10,
        speedOverrideType: 'ExactDelta',
        adjustTimingPlan: false,
        timingPlan: 1
      };
      setCurrentConfig(defaultConfig);
      //reset the form data
      methods.reset({ ...defaultConfig });
    } else {
      if (props.corridorId) {
        refetch();
      }
    }
    edaptiveQuery.refetch();
  }, [props.isAdd]);

  useEffect(() => {
    if (!props.isAdd) {
      const newrule = { ...data } as CorridorConfigFormModel;
      setCurrentConfig(newrule);
      //reset the form data
      methods.reset({ ...newrule });
    }
  }, [data, props.isAdd, props.id]);

  const onSubmit = (data: FieldValues) => {
    if (props.addConfig && props.isAdd) {
      methods.reset({});
      const rule = { ...data } as WeatherResponsiveCorridorConfigState;
      props.addConfig(rule);
    } else if (props.editConfig) {
      methods.reset({});
      const rule = { ...data } as WeatherResponsiveCorridorConfigState;
      props.editConfig(rule);
    }
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
        title="Corridor Config"
        open={props.open}
        handleClose={props.handleClose}
        actions={actions()}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <form>
            {currentConfig && edaptiveQuery.data && (
              <CorridorConfigForm data={currentConfig} edaptiveConfigurations={edaptiveQuery.data} />
            )}
          </form>
        </Box>
      </DialogSlideIn>
    </FormProvider>
  );
}

export default CorridorConfigDialog;
