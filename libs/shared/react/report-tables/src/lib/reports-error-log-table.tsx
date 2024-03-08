// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, printIframe, DateRangeFilter, DateRangeFilterData } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetEventLoggerErrorsApiArg, useGetEventLoggerErrorsQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsErrorLogTable() {
  const [print, setPrint] = useState(false);
  const [open, setOpen] = useState(false);
  //Note: the api wants "beginDate" not "startDate"
  const [filter, setFilter] = useState<GetEventLoggerErrorsApiArg>({ beginDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString(), limit: 500 })

  const { data, isLoading, isError, refetch } = useGetEventLoggerErrorsQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = ({ startDate, endDate }: DateRangeFilterData) => {
    setOpen(false)
    setFilter({ beginDate: new Date(new Date(startDate).toDateString()).toISOString(), endDate: new Date(new Date(endDate).toDateString()).toISOString(), limit: 500 })
  };
  const title = "System Error Log Report";

  const csvHeaders = [
    { label: "Timestamp", key: "timeStamp" },
    { label: "Source", key: "source" },
    { label: "Details", key: "details" }
  ];

  const csvFilename = "system-error-log-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DateRangeFilter
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
          sections={ErrorLogTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ timestamp, name, level, ...rest }) => ({
    timeStamp: SetLocalDate(timestamp),
    ...rest
  }));
}

function ErrorLogTable(title: string, data: any[]) {
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
    <th>Source</th>
    <th>Details</th>
    </thead>
    <tbody>
    ${data.map(envSens => `
    <tr>
      <td>${SetLocalDate(envSens.timestamp)}</td>
      <td>${envSens.source}</td>
      <td>${envSens.details}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default ErrorLogTable;
