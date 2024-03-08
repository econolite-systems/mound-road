// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, printIframe, FilterData, ReportsRoadSideUnitFilter } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetRsuStatusFindApiArg, useGetRsuStatusFindQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { BoolToYesNo } from '@econolite/shared-react-string-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsRoadSideUnitTable() {
  const [print, setPrint] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetRsuStatusFindApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })

  const { data, isLoading, isError, refetch } = useGetRsuStatusFindQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = (data: FilterData) => {
    setOpen(false)
    if (data.deviceId?.length) {
      setFilter({ deviceIds: data['deviceId'], startDate: new Date(new Date(data['startDate']).toDateString()).toISOString(), endDate: new Date(new Date(data['endDate']).toDateString()).toISOString() })
    }
    else {
      setFilter({ startDate: new Date(new Date(data['startDate']).toDateString()).toISOString(), endDate: new Date(new Date(data['endDate']).toDateString()).toISOString() })
    }
  };

  const title = "Road Side Unit Events Report";

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Timestamp", key: "timeStamp" },
    { label: "Connected", key: "isConnected" },
    { label: "Configured", key: "isConfigured" },
    { label: "Error", key: "error" }
  ];

  const csvFilename = "road-side-unit-events-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ReportsRoadSideUnitFilter
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
          sections={RoadSideUnitTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ timeStamp,isConnected, isConfigured, ...rest }) => ({
    timeStamp: SetLocalDate(timeStamp),
    isConnected: BoolToYesNo(isConnected),
    isConfigured: BoolToYesNo(isConfigured),
    ...rest
  }));
}

function RoadSideUnitTable(title: string, data: any[]) {
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
    <th>Name</th>
    <th>Timestamp</th>
    <th>Connected</th>
    <th>Configured</th>
    <th>Error</th>
    </thead>
    <tbody>
    ${data.map(envSens => `
    <tr>
      <td>${envSens.name}</td>
      <td>${SetLocalDate(envSens.timeStamp)}</td>
      <td>${BoolToYesNo(envSens.isConnected)}</td>
      <td>${BoolToYesNo(envSens.isConfigured)}</td>
      <td>${envSens.error}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default RoadSideUnitTable;
