// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormProvider, useForm } from "react-hook-form";
import {
  useGetConnectedVehicleStatusGetLastHourTotalsByMessageTypeQuery,
  useGetConnectedVehicleStatusGetTotalMessageCountQuery
} from '@econolite/shared/data-access/api-reports';
import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  messageTypeColumn,
  messageRateColumn,
} from '@econolite/data-grid';

export function ReportsConnectedVehiclesStatusTable() {

  const { data, isLoading, isError, refetch } = useGetConnectedVehicleStatusGetLastHourTotalsByMessageTypeQuery(
    undefined,
    {
      pollingInterval: 60000
    });

  const { data: totalData, isLoading: totalLoading, isError: totalError, refetch: refetchTotal } = useGetConnectedVehicleStatusGetTotalMessageCountQuery(
    undefined,
    {
      pollingInterval: 60000
    });

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }
  
  // if (!totalLoading && totalError) 
  // {
  //   refetchTotal();
  // }

  const methods = useForm();

  let gridData = [];
  const dataArray = data as any[];
  if (dataArray && dataArray.length) {
    gridData = dataArray?.map((item) => ({
      ...item,
    }));
  }

  for (let i = 0; i < gridData.length; i++) {
      gridData[i].messageCount = gridData[i].messageCount + '/hr';
  }

  const columns: GridColDef[] = useMemo(
    () => [
      messageTypeColumn(),
      messageRateColumn(),
    ],
    []
  );

  return (
    <Box>
        <FormProvider {...methods}>
          <form>
            <DataGrid autoHeight getRowId={(gridData) => gridData['type']} rows={gridData} columns={columns} />
            <Box sx={{pt: 2}}>
              <Typography variant='subtitle2'>Total Messages: {totalData}</Typography>
            </Box>
          </form>
        </FormProvider>
    </Box>
  );
}

export default ReportsConnectedVehiclesStatusTable;
