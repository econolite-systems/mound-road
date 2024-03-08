// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Theme } from '@mui/material/styles';
import { a11yProps, useRouteMatch } from "@econolite/shared/react/tabs";
import { NavLink, Outlet } from 'react-router-dom';
import Fade from '@mui/material/Fade';

/* eslint-disable-next-line */
export interface VehiclePriorityProps {}

export function VehiclePriority(props: VehiclePriorityProps) {
  const routeMatch = useRouteMatch(['/vehicle-priority/settings/intersections', '/vehicle-priority/settings/vehicles', '/vehicle-priority/settings/vehicle-class-types', '/vehicle-priority/settings/vehicle-class-levels'], "/vehicle-priority/settings/intersections");
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Fade in={true} enter={true} exit={true}>
      <Box>
        <Container sx={{ display: 'flex', flexDirection: 'column', zIndex: -10 }}>
          <Tabs value={currentTab} aria-label="Vehicle Priority Settings">
            <Tab value="/vehicle-priority/settings/intersections" component={NavLink} to={"./intersections"} label="Intersections" {...a11yProps(0)} />
            <Tab value="/vehicle-priority/settings/vehicles" component={NavLink} to={"./vehicles"} label="Vehicles" {...a11yProps(1)} />
            <Tab value="/vehicle-priority/settings/vehicle-class-types" component={NavLink} to={"./vehicle-class-types"} label="Vehicle Class Types" {...a11yProps(2)} />
            <Tab value="/vehicle-priority/settings/vehicle-class-levels" component={NavLink} to={"./vehicle-class-levels"} label="Vehicle Class Levels" {...a11yProps(3)} />
          </Tabs>
          <Outlet />
        </Container>
      </Box>
    </Fade>
  );
}

export default VehiclePriority;
