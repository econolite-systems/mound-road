// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Shell } from '@econolite/mound-road/ui/common';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import { ReportsConnectedVehiclesStatusTable } from '@econolite/shared/react/report-tables';

/* eslint-disable-next-line */
export interface ConnectedVehicleProps {}

export function ConnectedVehicle(props: ConnectedVehicleProps) {
  return (
    <Fade in={true} enter={true} exit={true}>
      <Container sx={{display: 'flex', flexDirection: 'column'}}>
        <ReportsConnectedVehiclesStatusTable />
      </Container>
    </Fade>
  );
}

export default ConnectedVehicle;
