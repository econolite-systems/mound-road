// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import {
  useGetScpVehicleClassQuery,
  usePutScpVehicleClassMutation,
  PriorityRequestVehicle,
  PriorityRequestVehicleConfiguration,
  PriorityRequestVehicleIntersection
} from '@econolite/shared/data-access/api-vehicle-priority';
import PriorityRequestVehicleIntersections from './priority-request-vehicle-intersections';
import PriorityRequestVehicleIntersectionDialog from './priority-request-vehicle-intersection-dialog';
import { Theme } from '@mui/material/styles';

/* eslint-disable-next-line */
export interface PriorityRequestVehicleIntersectionConfigProps {}

export function PriorityRequestVehicleIntersectionConfig(
  props: PriorityRequestVehicleIntersectionConfigProps
) {
  const [vehicles, setVehicles] = useState<PriorityRequestVehicle[]>([])
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [current, setCurrent] = useState<PriorityRequestVehicleIntersection>({ id: '', name: '', disable: true, vehicles: []});
  const { data, isLoading, isError, refetch } = useGetScpVehicleClassQuery();
  const [ editClass ] = usePutScpVehicleClassMutation();

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  useEffect(() => {
    if(data) {
      const available = data?.vehicles ?? [];
      setVehicles(available);
    }
  }, [data]);

  const toggleDisable = useCallback((id: string, value: boolean) => {
    const intersections = data?.priorityRequestVehicleIntersections?.map((v) => v.id === id ? {...v, disable: value} : v) ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleIntersections: [...intersections]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());
  }, [data, editClass, refetch]);

  const edit = useCallback((id: string) => {
    const toEdit:PriorityRequestVehicleIntersection = data?.priorityRequestVehicleIntersections?.find((v) => v.id === id) ?? {};
    setCurrent(toEdit);
    setOpen(true);
    setOpenForm(true);
  }, [data, setCurrent, setOpenForm]);

  const editItem = useCallback((dataType: PriorityRequestVehicleIntersection) => {
    const old = {...current};
    setCurrent({ id: "" });
    setOpenForm(false);
    setOpen(false);
    const intersections = data?.priorityRequestVehicleIntersections?.map((v) => v.id === old.id ? dataType : v) ?? [];
    const update: PriorityRequestVehicleConfiguration = {...data, priorityRequestVehicleIntersections: [...intersections]};
    editClass({ priorityRequestVehicleConfiguration: update }).then(() => refetch());

  }, [data, current, setCurrent, setOpenForm]);

  return (
    <Box sx={{ width: '100%'}}>
      <Box>
        <Box sx={{ py: 3 }}>
          <Typography variant='h2'>Priority Request Vehicle Intersections</Typography>
        </Box>
        <Box sx={(theme:Theme) => ({height: 'calc(100vh - 200px)'})}>
            {!data &&
              <p>No Data</p>
            }
            {data &&
              <PriorityRequestVehicleIntersections data={data?.priorityRequestVehicleIntersections as any[]} onToggleDisable={toggleDisable} onEdit={edit}></PriorityRequestVehicleIntersections>
            }
            {((open && current && current.id !== "") || (open)) &&
              <PriorityRequestVehicleIntersectionDialog data={current} vehicles={vehicles} open={openForm} handleClose={() => { setOpenForm(false) }} edit={editItem} />
            }
        </Box>
      </Box>
    </Box>
  );
}

export default PriorityRequestVehicleIntersectionConfig;
