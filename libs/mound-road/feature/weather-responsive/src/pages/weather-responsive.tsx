// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Container from '@mui/material/Container';
import { StatusWeatherResponsiveTable } from '@econolite/shared/react/report-tables';

/* eslint-disable-next-line */
export interface WeatherResponsiveProps {}

export function WeatherResponsive(props: WeatherResponsiveProps) {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column'}}>
      <StatusWeatherResponsiveTable />
    </Container>
  );
}

export default WeatherResponsive;
