// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { useState } from 'react';
import { MetricSummaryDto } from '@econolite/shared/data-access/api-reports';
import MetricsList from './metrics-list';

export interface ServiceMetricsItemProps {
  data: MetricSummaryDto
}

export function ServiceMetricsItem({data}: ServiceMetricsItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
    <ListItem
    >
    {data && 
    <>
    <ListItemButton onClick={handleClick}>
        <ListItemText primary={data.source} secondary={data.lastUpdated ? SetLocalDate(data.lastUpdated) : 'Never'} />
        <Chip label={`Services: ${data.services || 0}`} size='small' color='primary' />
        <Chip label={`Metrics/Service: ${Number(data.serviceMetrics || 0.0).toFixed(1)}`} size='small' color='primary' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </>}
    </ListItem>
    {data && data.metrics && 
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MetricsList data={data.metrics} />
      </Collapse>
    }
    </>
    );
}

export default ServiceMetricsItem;
