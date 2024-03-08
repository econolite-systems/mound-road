// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputNumber } from '@econolite/react/forms';
import Box from '@mui/material/Box';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { array, number, object, string } from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { PhaseModel } from '@econolite/shared/data-access/api-configuration';

/* eslint-disable-next-line */
export interface FormEntityPlansProps {
  parentName: string;
  phases?: Array<PhaseModel> | null | undefined;
};


export const properties = object({
  phases: array().of(object({
    number: number().min(1).max(100).required().label('Plan number'),
    lanes: number().min(1).max(15).required().label('Lanes'),
   })).nullable()
})

export const entityPlansLineStringSchema = object({
  geometry: object({
    lineString: object({
      properties: properties
    })
  }),
});

export const entityPlansPointSchema = object({
  geometry: object({
    point: object({
      properties: properties
    })
  }),
});

export const entityPlansPolygonSchema = object({
  geometry: object({
    polygon: object({
      properties: properties
    })
  }),
});


export function FormEntityPlans(props: FormEntityPlansProps) {
  const methods = useFormContext();
  const { control } = methods;
  const {
    fields: phases,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `${props.parentName}.phases`,
  });

  function handleAddPhase() {
    append({
      number: 0,
      movement: 'thru',
      lanes: 1,
    });
  }

  function handleRemovePhase(index: number) {
    remove(index);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <Typography variant="h6">Plans</Typography>
      {phases.map((phase, index) => (
        <Box key={phase.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormInputNumber name={`${props.parentName}.phases[${index}].number`} control={methods.control} label="Number" />
          <FormInputDropdown name={`${props.parentName}.phases[${index}].movement`} label="Movement" options={[{ label: "Thru", value: "thru" }, { label: "Left", value: "left" }, { label: "Right", value: "right" }]} control={methods.control} />
          <FormInputNumber name={`${props.parentName}.phases[${index}].lanes`} control={methods.control} label="Lanes" />

          <Button variant='contained' onClick={() => handleRemovePhase(index)}><DeleteIcon /></Button>
        </Box>
      )
      )}
      <Button variant='contained' onClick={handleAddPhase}><AddIcon /></Button>
    </Box>
  )
}

export default FormEntityPlans;
