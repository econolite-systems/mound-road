// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Assessment, Cloud, Map, Settings, Commute, ReadMore, NoCrash, Escalator, HealthAndSafety, ConfirmationNumber } from "@mui/icons-material";
import { NavLink as RouterLink } from 'react-router-dom';
import { useActivePath } from '@econolite/shared/react/tabs';
import { IsContributor } from '@econolite/shared-react-auth';

/* eslint-disable-next-line */
export interface MainListProps { }

export function MainList(props: MainListProps) {
  const isContributor = IsContributor();
  return (
    <>
      <Box>
        <NavItem title='Map' to='/' icon={<Map />} />
        <NavItem title='Reports' to='/reports' icon={<Assessment />} />
        {isContributor ? <NavItem title='Vehicle Priority' to='/vehicle-priority/settings' icon={<Commute />} /> : ''}
        <NavItem title='Connected Vehicle' to='/connected-vehicle' icon={<NoCrash />} />
        <NavItem title='Weather Responsive' to='/weather-responsive' icon={<Cloud />} />
        <NavItem title='TIM' to='/tim' icon={<ReadMore />} />
        {isContributor ? <NavItem title='Pavement Condition' to='/pavement-condition' icon={<Escalator />} /> : ''}
        <NavItem title='System Health' to='/system-health' icon={<HealthAndSafety />} />
        <NavItem title='System Metrics' to='/system-metrics' icon={<ConfirmationNumber />} />
      </Box>
      <Box sx={{ height: '100%' }}></Box>
      {isContributor ? <Box sx={{ display: 'flex', justifyItems: 'flex-end' }}>
        <NavItem title='Settings' to='/settings' icon={<Settings />} />
      </Box> : ''}
    </>
  );
}

export function NavItem({ title, to, icon }: { title: string, to: string, icon: JSX.Element }) {
  const { isActive } = useActivePath(to);
  return (
    <ListItemButton component={RouterLink} to={to} selected={isActive}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  )
}

export default MainList;
