// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import ServiceMetricsList from './service-metrics-list';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useGetSystemMetricsQuery } from '@econolite/shared/data-access/api-reports';

export function ServiceMetrics() {
  const {data, isLoading, refetch, isError, isSuccess} = useGetSystemMetricsQuery(undefined,
    {
      pollingInterval: 60000
    });

  // if (!isLoading && isError) {
  //   refetch();
  // }

  return (
    <>
    <Container sx={{pt: 2}}>
    <Typography variant="h2">System Metrics</Typography>
      <Typography variant="subtitle1">Shows the status of the system's metrics.</Typography>
      {data && data.length > 0 && 
        <ServiceMetricsList data={data} />
      }
    </Container>
    </>
  )
}

export default ServiceMetrics
