// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputDropdownMulti, FormInputNumber, FormInputText, FormInputOption } from '@econolite/react/forms';
import { AlgorithmConfigurationSlimModel } from '@econolite/shared/data-access/api-configuration';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface CorridorConfigFormProps {
    data: CorridorConfigFormModel;
    edaptiveConfigurations: AlgorithmConfigurationSlimModel[];
  }

export interface CorridorConfigFormModel {
    id?: string | null | undefined,
    corridorId?: string | null | undefined,
    name?: string | null | undefined,
    isEnabled: boolean,
    hasPrecipitation: boolean,
    temperatureThreshold?: number | null | undefined,
    roadConditions?: Array<number> | null | undefined,
    minimumConfidence?: number | null,
    enableEdaptive: boolean,
    edaptiveConfigurationId?: string | null | undefined,
    adjustSpeed: boolean,
    speedAdjustment?: number | null | undefined,
    speedOverrideType?: string | null | undefined,
    adjustTimingPlan: boolean,
    timingPlan?: number | null | undefined
}

export function CorridorConfigForm(props: CorridorConfigFormProps) {
    const { control, watch } = useFormContext();
  
    const weatherStatusOptions: Array<FormInputOption> = [
      { label: "Snow/Ice", value: 9 },
      { label: "Wet", value: 4 },
      { label: "Dry", value: 1 }
      // enumRoadCondition, has more options, but Weather.Fusion service only using these 3
    ]

    const speedOverrideOptions: Array<FormInputOption> = [
      { label: "Exact Delta", value: "ExactDelta" },
      { label: "% Delta", value: "PercentDelta" },
      { label: "Exact", value: "Exact" }
    ]

    const [edaptiveOptions, setEdaptiveOptions] = useState<Array<FormInputOption>>([]);

    useEffect(() => {
      if (props.edaptiveConfigurations && props.edaptiveConfigurations.length > 0 && edaptiveOptions.length < 1) {
        setEdaptiveOptions(props.edaptiveConfigurations.map(c => ({ label: c.name || '', value: c.id ? c.id.toString() : '' })));
      }
    }, [props.edaptiveConfigurations, edaptiveOptions, setEdaptiveOptions]);
    
  const isEdaptiveEnabled = watch('enableEdaptive');
  const isAdjustSpeed = watch('adjustSpeed');
  const isAdjustTimingPlan = watch('adjustTimingPlan');

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
        <FormInputText
          name="name"
          label="Name"
          control={control}
          defaultValue={props.data.name ?? ""}
        />
        <h2>Conditions:</h2>
        <Controller
          control={control}
          name="isEnabled"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label="Enabled"
            control={<Checkbox onChange={onChange} checked={value} />}
          />
          )}
        />
        <Controller
          control={control}
          name="hasPrecipitation"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label="Has Precipitation"
            control={<Checkbox onChange={onChange} checked={value} />}
          />
          )}
        />
        <FormInputNumber
          name="temperatureThreshold"
          label="Temperature Threshold (F)"
          control={control}
          defaultValue={props.data.temperatureThreshold || '32'}
        />
        <FormInputDropdownMulti
          name="roadConditions"
          label="Road Conditions"
          options={weatherStatusOptions}
          control={control}
          defaultValue={props.data.roadConditions || []}
        />
        <FormInputNumber
          name="minimumConfidence"
          label="Minimum Confidence"
          control={control}
          defaultValue={props.data.minimumConfidence}
        />
        
        <h2>Actions:</h2>
        <Controller
          control={control}
          name="enableEdaptive"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label="Enable Edaptive"
            control={<Checkbox onChange={onChange} checked={value} />}
          />
          )}
        />
        {isEdaptiveEnabled && edaptiveOptions.length > 0 && <FormInputDropdown
          name="edaptiveConfigurationId"
          label="Edaptive Routes Configuration"
          options={edaptiveOptions}
          control={control}
          defaultValue={props.data.edaptiveConfigurationId || 0}
        />}
        {isEdaptiveEnabled && edaptiveOptions.length === 0 && <p>No Edaptive Routes configured with this corridor.</p>}

        <Controller
          control={control}
          name="adjustSpeed"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label="Adjust Speed"
            control={<Checkbox onChange={onChange} checked={value} />}
          />
          )}
        />
        {isAdjustSpeed && <FormInputNumber
          name="speedAdjustment"
          label="Speed Adjustment (MPH)"
          control={control}
          defaultValue={props.data.speedAdjustment || '-10'}
        />}
        {isAdjustSpeed && <FormInputDropdown
          name="speedOverrideType"
          label="Speed Override Type"
          options={speedOverrideOptions}
          control={control}
          defaultValue={props.data.speedOverrideType || 'ExactDelta'}
        />}

        <Controller
          control={control}
          name="adjustTimingPlan"
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
          <FormControlLabel
            label="Adjust Timing Plan"
            control={<Checkbox onChange={onChange} checked={value} />}
          />
          )}
        />
        {isAdjustTimingPlan && <FormInputNumber
          name="timingPlan"
          label="TimingPlan"
          control={control}
          defaultValue={props.data.timingPlan || '1'}
        />}
      </Box>
    );
  }
  
  export default CorridorConfigForm;
