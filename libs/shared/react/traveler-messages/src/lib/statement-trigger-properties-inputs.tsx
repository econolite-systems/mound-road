// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown } from '@econolite/react/forms';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import useFormInputsByType from './hooks/use-form-inputs-by-type';
import { useTriggerEnumsOptions } from './hooks/use-triggers';
import { StatementInputProperty } from './utils/trigger-props';

const NUM_OPERATORS = ['=', '!=', '>', '>=', '<', '<='];
const STR_OPERATORS = ['=', '!='];

const style = {
  sx: {
    minWidth: '13rem'
  }
}

function StatementTriggerPropertiesInputs({ parentName, property }: { parentName: string, property?: StatementInputProperty | null }) {
  const { control, getValues } = useFormContext();
  const { enums } = useTriggerEnumsOptions();

  type EnumKey = keyof typeof enums;
  let options: any[] = [];
  if (property?.enumType) {
    options = enums[property.enumType as EnumKey] ?? [];
  }
  const { formInput } = useFormInputsByType({ parentName: parentName, type: property?.type, defaultValue: property?.defaultValue, style, options })

  const comparatorStyle = {
    sx: {
      minWidth: '4rem'
    }
  }

  const renderComparatorInput = () => {
    let options;
    const type = property?.type ?? '';
    const operators = property?.operators;
    switch (type) {
      case 'number':
        options = operators ?? NUM_OPERATORS;
        break;
      case 'guid':
      case 'string':
      case 'enum':
        options = operators ?? STR_OPERATORS;
        break;
      default:
        return <Typography variant="body1" align="center">=</Typography>;
    }
    return (
      <FormInputDropdown
        name={`${parentName}.comparator`}
        options={options.map(op => ({ label: op, value: op }))}
        control={control}
        inputParams={comparatorStyle} />
    );
  };

  const renderFormInputUnit = () => {
    return (
      <>
        {property && property.unit &&
          <InputLabel>{property.unit}</InputLabel>
        }
      </>
    )
  }

  return (
    <>
      {property && getValues(`${parentName}.name`) &&
        renderComparatorInput()
      }
      {property && getValues(`${parentName}.name`) &&
        formInput
      }
      {property && property.unit && getValues(`${parentName}.name`) &&
        renderFormInputUnit()
      }
    </>
  )
}

export default StatementTriggerPropertiesInputs
