// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import {
  CorridorSpeedOverrideType,
  WeatherResponsiveResultModel,
  useGetWeatherResponsiveStatusLatestAllQuery
} from '@econolite/shared/data-access/api-reports';
import { useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';

export function StatusWeatherResponsiveTable() {

  const { data, isLoading, isError, refetch } = useGetWeatherResponsiveStatusLatestAllQuery(
    undefined,
    {
      pollingInterval: 60000
    });

  // if (!isLoading && isError) 
  // {
  //   refetch();
  // }

  const getRows = () => {
    if (data && data.length > 0) {
      return data.map((item: WeatherResponsiveResultModel) => ({
        id: item.id,
        corridorName: item.corridorName,
        timestamp: item.timestamp ? new Date(item.timestamp).getFullYear() <= 1 ? 'Never' : SetLocalDate(item.timestamp.toString()) : '',
        edaptiveConfigurationName: item.edaptiveConfigurationName ? item.edaptiveConfigurationName : "Off",
        speedAdjustment: getSpeedAdjustment(item.speedAdjustment, item.speedOverrideType),
        timingPlan: item.timingPlan ? item.timingPlan : "Off",
        precipitation: item.precipitation,
        temperature: item.temperature,
        roadCondition: item.roadCondition,
        confidence: item.confidence
      }));
    }

    return [] as WeatherResponsiveResultModel[];
  }

  const getSpeedAdjustment = (speedAdjustment: number | null | undefined, speedOverrideType: CorridorSpeedOverrideType | undefined) => {
    if (speedAdjustment && speedOverrideType) {
      let unit = "mph";
      if (speedOverrideType == "PercentDelta") {
        unit = "%";
      }
      return `${speedAdjustment} ${unit}`;
    }
    return "Off"
  }

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'corridorName', headerName: 'Corridor', flex: 0.5 },
      { field: 'timestamp', headerName: 'Timestamp', flex: 0.5 },
      { field: 'edaptiveConfigurationName', headerName: 'Edaptive', flex: 0.5 },
      { field: 'speedAdjustment', headerName: 'Speed Adjustment', flex: 0.5 },
      { field: 'timingPlan', headerName: 'Timing Plan', flex: 0.5 },
      { field: 'precipitation', headerName: 'Precipitation', flex: 0.5 },
      { field: 'temperature', headerName: 'Temperature (F)', flex: 0.5 },
      { field: 'roadCondition', headerName: 'Road Condition', flex: 0.5 },
      { field: 'confidence', headerName: 'Confidence', flex: 0.5 }
    ],
    []
  );

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Weather Responsive Status</Typography>
      </Box>
      <Box>
        <DataGrid rowHeight={80} rows={getRows()} columns={columns} />
      </Box>
    </>
  );
}

export default StatusWeatherResponsiveTable;
