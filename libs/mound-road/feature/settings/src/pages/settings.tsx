// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { a11yProps, useRouteMatch } from '@econolite/shared/react/tabs';
import { NavLink, Outlet } from 'react-router-dom';
import { IsAdministrator } from '@econolite/shared-react-auth';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettingsProps { }

export function Settings(props: SettingsProps) {
  const routeMatch = useRouteMatch(['/settings/comms', '/settings/ess', '/settings/signal', '/settings/pavementcondition', '/settings/cv', '/settings/triggers', '/settings/wwd', '/settings/weather-responsive', '/settings/actionsets', '/settings/acyclica', '/settings/twilio',], '/settings/actionsets');
  const currentTab = routeMatch?.pattern?.path;

  const isAdministrator = IsAdministrator();

  return (
    <Fade in={true} enter={true} exit={true}>
      <Box>
        <Container sx={{ display: 'flex', flexDirection: 'column', zIndex: -10 }}>
          <Tabs
            value={currentTab}
            aria-label="Settings Tabs"
            variant="scrollable"
            scrollButtons="auto">
            <Tab value="/settings/actionsets" component={NavLink} to={"./actionsets"} label="Action Sets" {...a11yProps(8)} />
            <Tab value="/settings/cv" component={NavLink} to={"./cv"} label="Connected Vehicle" {...a11yProps(4)} />
            <Tab value="/settings/comms" component={NavLink} to={"./comms"} label="Comms"{...a11yProps(0)} />
            <Tab value="/settings/weather-responsive" component={NavLink} to={"./weather-responsive"} label="Weather Responsive" {...a11yProps(7)} />
            {/* <Tab value="/settings/ess" component={NavLink} to={"./ess"} label="Environmental Sensors" {...a11yProps(1)} /> */}
            <Tab value="/settings/pavementcondition" component={NavLink} to={"./pavementcondition"} label="Pavement Condition" {...a11yProps(3)} />
            {isAdministrator ? <Tab value="/settings/acyclica" component={NavLink} to={"./acyclica"} label="Acyclica" {...a11yProps(9)} /> : ''}
            {/* <Tab value="/settings/signal" component={NavLink} to={"./signal"} label="Signals" {...a11yProps(2)} /> */}
            {/* <Tab value="/settings/triggers" component={NavLink} to={"./triggers"} label="Triggers" {...a11yProps(5)} /> */}
            <Tab value="/settings/wwd" component={NavLink} to={"./wwd"} label="Wrong Way Driver" {...a11yProps(6)} />
            {isAdministrator ? <Tab value="/settings/twilio" component={NavLink} to={"./twilio"} label="Twilio" {...a11yProps(10)} /> : ''}
          </Tabs>
          <Outlet />
        </Container>
      </Box>
    </Fade>
  );
}

export default Settings;

