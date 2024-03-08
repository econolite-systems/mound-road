// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import ServiceMetricsItem from './service-metrics-item';
import List from '@mui/material/List';
import { AnimatePresence, motion } from 'framer-motion';
import { MetricSummaryDto } from '@econolite/shared/data-access/api-reports';

export interface ServiceMetricsListProps {
  data?: Array<MetricSummaryDto>;
}

export function ServiceMetricsList({data = []}: ServiceMetricsListProps) {
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
      <ServiceMetricsItem data={metric}/>
    </motion.div>
    )}
    </List>
    </AnimatePresence>
  )
}

export default ServiceMetricsList
