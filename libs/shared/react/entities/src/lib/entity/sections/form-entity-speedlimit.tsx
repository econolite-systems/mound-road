// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { FormInputNumber } from '@econolite/react/forms';
import { useFormContext } from 'react-hook-form';
import { number, object } from 'yup';


/* eslint-disable-next-line */
export interface FormEntitySpeedLimitProps {
  parentName: string;
  speedLimit?: number | null | undefined;
}

export const properties = object({
  speedLimit: number().min(1).max(100).optional().label('Speed limit')
})

export const entitySpeedLimitPointSchema = object({
  geometry: object({
    point: object({
      properties: properties
    })
  }),
});

export const entitySpeedLimitLineStringSchema = object({
  geometry: object({
    lineString: object({
      properties: properties
    })
  }),
});

export const entitySpeedLimitPolygonSchema = object({
  geometry: object({
    polygon: object({
      properties: properties
    })
  }),
});

export function FormEntitySpeedLimit(props: FormEntitySpeedLimitProps) {
  const methods = useFormContext();

  return (
    <FormInputNumber
      name={`${props.parentName}.speedLimit`}
      label="Speed Limit"
      control={methods.control}
    />
  );
}

export default FormEntitySpeedLimit;
