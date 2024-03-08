// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { HealthCheckExecutionEntry, HealthCheckExecutionHistory, HealthCheckExecution } from '@econolite/shared/data-access/api-system-health';
import SystemHealthItem from './system-health-item';
import List from '@mui/material/List';
import { AnimatePresence, motion } from 'framer-motion';

export interface SystemHealthListProps {
  data?: Array<HealthCheckExecution>;
  onItemSelected: (check: HealthCheckExecutionEntry, executionHistory: Array<HealthCheckExecutionHistory>) => void;
}

export function SystemHealthList({data = [], onItemSelected}: SystemHealthListProps) {
  const listVariant = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
      }
    }
  }

  const listItemVariant = {
    hidden: {
      y: -100,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <AnimatePresence>
    <List component={motion.ul}
    variants={listVariant}
    animate='visible'
    initial='hidden'
    exit='hidden'>
    {data.map((liveness) =>
    <motion.div
    variants={listItemVariant}>
      <SystemHealthItem data={liveness} onItemSelected={onItemSelected}/>
    </motion.div>
    )}
    </List>
    </AnimatePresence>
  )
}

export default SystemHealthList
