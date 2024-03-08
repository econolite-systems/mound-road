// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable-next-line */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, ReportsAuditFilter, ReportsAuditFilterData, printIframe } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetAuditReportFindApiArg, useGetAuditReportFindQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsAuditTable() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetAuditReportFindApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })
  const { data, isLoading, isError, refetch } = useGetAuditReportFindQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = (data: ReportsAuditFilterData) => {
    setOpen(false)
    let filter: any = { startDate: new Date(new Date(data['startDate']).toDateString()).toISOString(), endDate: new Date(new Date(data['endDate']).toDateString()).toISOString() }
    if (data.eventTypes?.length)
      filter.eventTypes = data.eventTypes
    if (data.usernames?.length)
      filter.usernames = data.usernames
    setFilter(filter)
  };

  const title = "Audit Log Report";

  const csvHeaders = [
    { label: "Timestamp", key: "startDate" },
    { label: "Event Type", key: "eventType" },
    { label: "Username", key: "username" },
  ];

  const csvFilename = "audit-log-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ReportsAuditFilter
          filterData={filterData}
          open={open}
          onClose={() => setOpen(false)}
        />
        <div style={{ marginTop: 'auto' }}>
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
        </div>
      </Box>

      {(!data || data.length === 0) &&
        <div>No data found</div>}
      {(data && data.length > 0) &&
        <ReportsTable
          title={title}
          sections={auditTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ startDate, details, ...rest }) => ({
    startDate: SetLocalDate(startDate),
    ...rest
  }));
}

function auditTable(title: string, data: any[]) {
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
  <th>Timestamp</th>
  <th>Event Type</th>
  <th>Username</th>
  </thead
  <tbody>
  ${data.map(audit => `
    <tr>
      <td>${SetLocalDate(audit.startDate)}</td>
      <td>${audit.eventType}</td>
      <td>${audit.username}</td>
    </tr>`).join('')}
  </tbody>
  </table>
  </article>
  </section>
  `
}

export default ReportsAuditTable;
