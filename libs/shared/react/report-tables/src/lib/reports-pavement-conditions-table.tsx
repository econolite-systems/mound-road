// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, DateRangeFilter, DateRangeFilterData, printIframe } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetPavementConditionStatusFindApiArg, useGetPavementConditionStatusFindQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsPavementCondidtionsTable() {

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetPavementConditionStatusFindApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })

  const { data, isLoading, isError, refetch } = useGetPavementConditionStatusFindQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = ({ startDate, endDate }: DateRangeFilterData) => {
    setOpen(false)
    setFilter({ startDate: new Date(new Date(startDate).toDateString()).toISOString(), endDate: new Date(new Date(endDate).toDateString()).toISOString() })
  };

  const title = "Pavement Condition Report";

  const csvHeaders = [
    { label: "Timestamp", key: "timeStamp" },
    { label: "Location", key: "location" },
    { label: "State", key: "isActive" },
    { label: "Severity", key: "severity" }
  ];

  const csvFilename = "pavement-conditions-report.csv";

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
          sections={pavementCondidtionsTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ timestamp, isActive, ...rest }) => ({
    timeStamp: SetLocalDate(timestamp),
    isActive: CheckActiveStatus(isActive),
    ...rest
  }));
}

function CheckActiveStatus(cv: boolean) {
  if (!cv) {
    return 'Inactive';
  }
  else {
    return 'Active';
  }
}

function pavementCondidtionsTable(title: string, data: any[]) {
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
    <th>Location</th>
    <th>State</th>
    <th>Severity</th>
    </thead>
    <tbody>
    ${data.map(pavementConditions => `
    <tr>
      <td>${SetLocalDate(pavementConditions.timestamp)}</td>
      <td>${pavementConditions.location}</td>
      <td>${CheckActiveStatus(pavementConditions.isActive)}</td>
      <td>${pavementConditions.severity}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default ReportsPavementCondidtionsTable;
