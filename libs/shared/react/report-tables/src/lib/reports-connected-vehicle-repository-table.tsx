// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { printIframe, ReportsTable } from '@econolite/shared/react/reports';
import {
  useGetConnectedVehicleStatusGetTotalsByRepositoryTypeQuery
} from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';

export function ReportsConnectedVehicleRepositoryTotalsTable() {

  const { data, isLoading, isError, refetch } = useGetConnectedVehicleStatusGetTotalsByRepositoryTypeQuery();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const title = "Connected Vehicles Repository Report";

  const csvHeaders = [
    { label: "Data", key: "type" },
    { label: "Messages", key: "messageCount" },
    { label: "Size", key: "size" }
  ];

  const csvFilename = "connected-vehicle-respository-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {(data && data.length > 0) &&
          <>
            <Tooltip title="Print">
              <IconButton sx={{}} onClick={() => printIframe()}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <CSVLink data={csvData(data)} headers={csvHeaders} filename={csvFilename} target="_blank">
              <Tooltip title="Download CSV">
                <IconButton sx={{}}>
                  <LibraryBooks />
                </IconButton>
              </Tooltip>
            </CSVLink>
          </>
        }
      </Box>
      {(!data || data.length === 0) &&
        <div>No data found</div>}
      {(data && data.length > 0) &&
        <ReportsTable
          title={title}
          sections={connectedVehicleRepositoryTotalsTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data;
}

function connectedVehicleRepositoryTotalsTable(title: string, data: any[]) {
  return `
    <section>
    <article>
    <div>
    <img class="header-img" src="https://innovatemound.org/wp-content/uploads/2016/11/MoundIC_Header.png" />
    <span style="float: left"><h4>${title}</h4></span>
    <span style="float: right"><h4>${SetLocalDate(new Date())}</h4></span>
    </div>
    <table class="w100">
    <thead>
    <th>Data</th>
    <th>Messages</th>
    <th>Size</th>
    </thead>
    <tbody>
    ${data.map(connectedVehicles => `
    <tr>
      <td>${connectedVehicles.type}</td>
      <td>${connectedVehicles.messageCount}</td>
      <td>${connectedVehicles.size}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default ReportsConnectedVehicleRepositoryTotalsTable;
