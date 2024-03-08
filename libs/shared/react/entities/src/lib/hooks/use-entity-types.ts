// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { entityTypeStateSchema } from '@econolite/entities-state';
import { useSelector } from 'react-redux';

export function useEntityTypes() {
  const types = useSelector((state: any) => state.entities.types as Array<typeof entityTypeStateSchema>);

  return { types };
}

export default useEntityTypes;
