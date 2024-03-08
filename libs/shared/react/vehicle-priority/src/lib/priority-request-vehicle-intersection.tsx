// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputDropdown, FormInputSwitch, FormInputText, FormInputOption } from '@econolite/react/forms';
import { PriorityRequestVehicle, PriorityRequestVehicleName } from '@econolite/shared/data-access/api-vehicle-priority';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { object, string, boolean, array } from 'yup';
import { IsAdministrator } from '@econolite/shared-react-auth';

export interface ScheduleTime {
  timeValue: Date;
}

export interface PriorityRequestVehicleIntersectionFormData {
  id?: string | null | undefined;
  name?: string | null | undefined;
  disabled?: boolean | null | undefined;
  vehicles?: PriorityRequestVehicleName[] | null | undefined;
}

/* eslint-disable-next-line */
export interface PriorityRequestVehicleIntersectionProps {
  id?: string | null | undefined;
  name?: string | null | undefined;
  disable?: boolean | null | undefined;
  vehicles?: PriorityRequestVehicleName[] | null | undefined;
  available?: PriorityRequestVehicle[];
}

export const priorityRequestVehicleIntersectionSchema = object({
  id: string().required().optional().default(''),
  name: string().required().default('none'),
  disable: boolean().required().default(false),
  vehicles: array()
});

export function PriorityRequestVehicleIntersection(
  props: PriorityRequestVehicleIntersectionProps
) {
  const [options, setOptions] = useState<Array<FormInputOption>>(props.available?.map((v) => { return { label: v.id, value: v.id } as FormInputOption }) ?? []);
  const [controlledFields, setControlledFields] = useState<any[]>([]);
  const isAdministrator = IsAdministrator();

  //console.log(props.available);

  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicles"
  });

  const watchFieldArray = watch("vehicles");

  useEffect(() => {
    if (!watchFieldArray) return;
    const veh = fields?.map((field, index) => {
      return {
        ...field,
        ...watchFieldArray[index]
      };
    });
    let available = props.available?.map((v) => { return { label: v.id, value: v.id } as FormInputOption }).sort(function (a, b) {
      if (a.label < b.label) { return -1; }
      if (a.label > b.label) { return 1; }
      return 0;
    }) ?? [];
    const taken = veh?.map((v) => v.name) ?? [];
    available = veh.length > 0 ? available.filter(o => !taken.includes(o.value)) : available;
    //console.log(available);
    setOptions(available);
    if (available.length > 0) {
      setValue('toAdd', available[0].value);
    }
    setControlledFields(veh);
  }, [watchFieldArray, props.available]);


  const toAddField = watch("toAdd");
  useEffect(() => {
    console.log(toAddField)
  }, [toAddField]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1, mb: 1 }}>
      <FormInputText name="name" control={control} label="Intersection" defaultValue={props.name ?? "Vehicle"} />
      <FormInputSwitch name="disable" label="Disabled" control={control} defaultValue={props.disable ?? false} />
      {options.length > 0 &&
        <Box>
          <FormInputDropdown name="toAdd" label="Vehicle" control={control} options={options} defaultValue={options[0].value} />
          <IconButton edge="end" aria-label="add vehicle"
            onClick={() =>
              append({ name: `${toAddField}` })
            }
          >
            <AddIcon />
          </IconButton>
        </Box>
      }
      <List subheader={
        <ListSubheader component="div" id="vehicles">
          Allowed Vehicles
        </ListSubheader>
      }>
        {controlledFields.map((field, index) =>
          <ListItem
            key={`${field}.${index}`}
            secondaryAction={
              isAdministrator ? <IconButton edge="end" aria-label="delete"
                onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton> : ''
            }
          >
            <ListItemText
              primary={field.name}
            />
          </ListItem>
        )}
      </List>

    </Box>
  );
}

export default PriorityRequestVehicleIntersection;
