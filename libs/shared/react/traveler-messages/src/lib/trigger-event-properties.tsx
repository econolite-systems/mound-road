// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber, FormInputSwitch, FormInputText } from '@econolite/react/forms';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { TriggerEventProperty, TriggerEventPropertyInput } from './utils/trigger-props';
import { useTriggerEnums } from './hooks/use-triggers';
import './styles/trigger-event-properties.scss';

const NUM_OPERATORS = ['==', '!=', '>', '>=', '<', '<='];
const STR_OPERATORS = ['==', '!='];
const BOOLEAN_OPTIONS = ['True', 'False'];

export interface TriggerEventPropertiesProps {
  eventProperties: TriggerEventProperty[],
  defaultValues: TriggerEventPropertyInput[]
}

export function TriggerEventProperties({ eventProperties, defaultValues }: TriggerEventPropertiesProps) {

  const { control } = useFormContext();
  const { fields, replace } = useFieldArray({ control, name: 'properties' });

  const { enums } = useTriggerEnums();
  type EnumKey = keyof typeof enums;

  useEffect(() => replace(defaultValues), [defaultValues, replace]);

  const renderComparatorInput = (idx: number) => {
    let options;
    switch (eventProperties[idx]?.type) {
      case 'number':
        options = NUM_OPERATORS;
        break;
      case 'guid':
      case 'string':
      case 'enum':
        options = STR_OPERATORS;
        break;
      default:
        return <Typography variant="body1" align="center">==</Typography>;
    }
    return (
      <FormInputDropdown
        name={`properties.${idx}.comparator`}
        options={options.map(op => ({ label: op, value: op }))}
        control={control}
        inputParams={{ className: "property-dropdown" }} />
    );
  };

  const renderValueInput = (idx: number) => {
    let options;
    switch (eventProperties[idx]?.type) {
      case 'boolean':
        return (
          <FormInputDropdown
            name={`properties.${idx}.value`}
            options={BOOLEAN_OPTIONS.map(op => ({ label: op, value: op }))}
            control={control}
            inputParams={{ className: "property-dropdown" }} />
        );
      case 'enum':
        options = enums[eventProperties[idx]?.enumType as EnumKey] ?? [];
        return (
          <FormInputDropdown
            name={`properties.${idx}.value`}
            options={options.map(op => ({ label: op, value: op }))}
            control={control}
            inputParams={{ className: "property-dropdown" }} />
        );
      case 'number':
        return (
          <FormInputNumber
            name={`properties.${idx}.value`}
            control={control}
            inputParams={{ size: "small" }} />
        );
      default:
        return (
          <FormInputText
            name={`properties.${idx}.value`}
            control={control}
            inputParams={{ size: "small" }} />
        );
    }
  };

  const renderPropertyRow = (field: Record<"id", string>, idx: number) => (
    <Fragment key={field.id}>
      <Grid item xs={1}>
        <FormInputSwitch name={`properties.${idx}.isEnabled`} control={control} />
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2">{eventProperties[idx]?.display}</Typography>
      </Grid>
      <Grid item xs={2} className="comparator-input">
        {renderComparatorInput(idx)}
      </Grid>
      <Grid item xs={6}>
        {renderValueInput(idx)}
      </Grid>
    </Fragment>
  );

  // controlled height for animated transition support
  const height = fields.length > 0 ? `${30 + 48 * fields.length}px` : '0';

  return (
    <div className="trigger-event-properties" style={{ height }}>
      <Typography variant="subtitle1">Properties</Typography>
      <Grid container rowSpacing={1} columnSpacing={2} alignItems="center">
        {fields.map(renderPropertyRow)}
      </Grid>
    </div>
  );
}

export default TriggerEventProperties;
