// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import List from '@mui/material/List';
import { AnimatePresence, motion } from 'framer-motion';
import { ServiceMetricDto } from '@econolite/shared/data-access/api-reports';
import MetricsItem from './metrics-item';

export interface MetricsListProps {
  data?: Array<ServiceMetricDto>;
}

export function MetricsList({data = []}: MetricsListProps) {
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
    {data.map((metric) =>
    <motion.div
    variants={listItemVariant}>
      <MetricsItem data={metric}/>
    </motion.div>
    )}
    </List>
    </AnimatePresence>
  )
}

export default MetricsList
