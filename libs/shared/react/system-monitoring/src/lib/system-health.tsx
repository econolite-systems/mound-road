// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useState } from 'react'
import SystemHealthList from './system-health-list';
import { HealthCheckExecutionEntry, HealthCheckExecutionHistory, HealthCheckExecution } from '@econolite/shared/data-access/api-system-health';
import SystemHealthItemModal from './system-health-item-modal';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useGetServiceHealthStatusQuery } from '@econolite/shared/data-access/api-system-health';

export function SystemHealth() {
  const {data, isLoading, refetch, isError, isSuccess} = useGetServiceHealthStatusQuery(undefined,
    {
      pollingInterval: 60000
    });
  const [selectedItem, setSelectedItem] = useState<HealthCheckExecutionEntry>();
  const [executionHistory, setExecutionHistory] = useState<Array<HealthCheckExecutionHistory>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  const handleClick = (check: HealthCheckExecutionEntry, executionHistory: Array<HealthCheckExecutionHistory>) => {
    setSelectedItem(check);
    setExecutionHistory(executionHistory);
    setIsModalOpen(true);
  }

  return (
    <>
    <Container sx={{pt: 2}}>
    <Typography variant="h2">System Health</Typography>
      <Typography variant="subtitle1">Shows the status of the system's health checks.</Typography>
      {data && data.length > 0 && 
        <SystemHealthList data={data} onItemSelected={handleClick} />
      }
      {selectedItem &&
        <SystemHealthItemModal isShowing={isModalOpen} onClose={closeModal} check={selectedItem!} executionHistory={executionHistory} />
      }
    </Container>
    </>
  )
}

export default SystemHealth
