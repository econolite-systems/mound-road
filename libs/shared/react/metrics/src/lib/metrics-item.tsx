// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { useState } from 'react';
import { MetricDto, ServiceMetricDto } from '@econolite/shared/data-access/api-reports';

export interface MetricsItemProps {
  data: ServiceMetricDto
}

export function MetricsItem({data}: MetricsItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItem sx={{ pl: 8, gap: 1 }}
    >
    {data &&
    <>
    <ListItemButton onClick={handleClick}>
        <ListItemText primary={data.computer} secondary={data.logged ? SetLocalDate(data.logged) : 'Never'} />
        {data.metrics && data.metrics.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
    </>}
    </ListItem>
    {data && data.metrics && data.metrics.length > 0 && data.metrics.map((metric: MetricDto) => 
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ display: 'flex', flexDirection: 'column'}} disablePadding>
          <ListItemButton sx={{ pl: 16 }}>
            <ListItemText primary={`${metric.name}: ${metric.value}`} />
          </ListItemButton>
        </List>
      </Collapse>
    )}
    </>
    );
}

export default MetricsItem;
