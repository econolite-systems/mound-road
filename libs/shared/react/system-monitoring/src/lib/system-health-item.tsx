// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { HealthCheckExecutionEntry, HealthCheckExecutionHistory, HealthCheckExecution } from '@econolite/shared/data-access/api-system-health';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { exec } from 'child_process';

export interface SystemHealthItemProps {
  data: HealthCheckExecution,
  onItemSelected: (check: HealthCheckExecutionEntry, executionHistory: Array<HealthCheckExecutionHistory>) => void;
}

export function SystemHealthItem({data, onItemSelected}: SystemHealthItemProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function GetHealthStatusIcon(status: string) {
    if(status.toLowerCase() === 'healthy') {
      return <CheckCircleIcon color='success' />
    }
    if(status === 'unhealthy') {
      return <CancelIcon color='error' />
    }
    else {
      return <ErrorIcon color='error' />;
    }
  }

  function GetDateTimeInfo(date: string) {
    const result = new Date(date);
    return `${result.toLocaleDateString()} ${result.toLocaleTimeString()}`;
  }

  const listVariant = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08
      }
    }
  }

  const listItemVariant = {
    hidden: {
      x: -10,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1
    }
  }

  return (
    <>
    <ListItem
    >
    {data && 
    <>
    <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ListItemIcon>
            {GetHealthStatusIcon(data.status!)}
          </ListItemIcon>
        </ListItemIcon>
        <ListItemText primary={data.name} secondary={GetDateTimeInfo(data.lastExecuted!)} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </>}
    </ListItem>
    {data && data.entries && data.entries.map((check: HealthCheckExecutionEntry) => 
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ display: 'flex', flexDirection: 'column'}} disablePadding>
          <ListItemButton
            onClick={() => onItemSelected(check, data.history!.filter((history) => history.name === check.name))}
            sx={{ pl: 8, gap: 1 }}>
            <ListItemIcon>
              {GetHealthStatusIcon(check.status!)}
            </ListItemIcon>
            <ListItemText primary={check.name} secondary={check.description}/>
            {check.tags && check.tags.map((tag: string) => 
              <Chip label={tag} size='small' color='primary' />
            )}
          </ListItemButton>
        </List>
      </Collapse>
    )}
    </>
    );
}

export default SystemHealthItem;
