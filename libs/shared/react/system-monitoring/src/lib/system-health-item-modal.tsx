// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { DialogSlideIn } from '@econolite/dialogs';
import { HealthCheckExecutionEntry, HealthCheckExecutionHistory }  from '@econolite/shared/data-access/api-system-health';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import { Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot, TimelineSeparator } from '@mui/lab';
import { motion } from 'framer-motion';

export interface SystemHealthItemModalProps {
  isShowing: boolean;
  onClose: () => void;
  check: HealthCheckExecutionEntry;
  executionHistory: Array<HealthCheckExecutionHistory>;
}

export function SystemHealthItemModal({isShowing, onClose, check, executionHistory}: SystemHealthItemModalProps) {
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
  return (
    <DialogSlideIn
        title={`${check.name}`}
        open={isShowing}
        handleClose={onClose}
      >
      <Box sx={{display: 'flex', gap: 1}}>
        <Icon>
          {GetHealthStatusIcon(check.status!)}
        </Icon> 
        <Typography variant='subtitle1'>{check.status}</Typography>
      </Box>
      <Timeline position="alternate">
        {executionHistory.map((history) =>
        <TimelineItem sx={{justifyContent: 'center'}}>
          <TimelineOppositeContent color="text.secondary" sx={{py: 2}}>
          <Box>{GetDateTimeInfo(history.on!)}</Box>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant='outlined'>
            {GetHealthStatusIcon(history.status!)}
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
          <TimelineContent sx={{py: 2}}>
            <Typography variant='subtitle1'>{history.status}</Typography>
          </TimelineContent>
        </TimelineItem>)}
      </Timeline>
    </DialogSlideIn>
  )
}

export default SystemHealthItemModal
