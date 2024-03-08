// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, printIframe, ReportsEnvironmentalSensorsFilter, FilterData } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetEssStatusFindApiArg, useGetEssStatusFindQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsEnvironmentalSensorsTable() {
  const [print, setPrint] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetEssStatusFindApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })

  const { data, isLoading, isError, refetch } = useGetEssStatusFindQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = ({ deviceId, startDate, endDate }: FilterData) => {
    setOpen(false)
    if (deviceId?.length) {
      setFilter({ deviceId: deviceId, startDate: new Date(new Date(startDate).toDateString()).toISOString(), endDate: new Date(new Date(endDate).toDateString()).toISOString() })
    }
    else {
      setFilter({ startDate: new Date(new Date(startDate).toDateString()).toISOString(), endDate: new Date(new Date(endDate).toDateString()).toISOString() })
    }
  };

  const title = "Environmental Sensor Log Report";

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Timestamp", key: "timeStamp" },
    { label: "Temp", key: "wetBulbTemp" },
    { label: "Dewpoint Temp", key: "dewPointTemp" },
    { label: "Max Temp", key: "maxTemp" },
    { label: "Min Temp", key: "minTemp" },
    { label: "Pressure", key: "atmosphericPressure" },
    { label: "Humidity", key: "relativeHumidity" }
  ];

  const csvFilename = "environmental-sensor-log-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ReportsEnvironmentalSensorsFilter
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
          sections={environmentalSensorsTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ timeStamp, ...rest }) => ({
    timeStamp: SetLocalDate(timeStamp),
    ...rest
  }));
}

function environmentalSensorsTable(title: string, data: any[]) {
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
    <th>Temp</th>
    <th>Dewpoint Temp</th>
    <th>Max Temp</th>
    <th>Min Temp</th>
    <th>Pressure</th>
    <th>Humidity</th>
    </thead>
    <tbody>
    ${data.map(envSens => `
    <tr>
      <td>${envSens.name}</td>
      <td>${SetLocalDate(envSens.timeStamp)}</td>
      <td>${envSens.wetBulbTemp}&deg</td>
      <td>${envSens.dewPointTemp}&deg</td>
      <td>${envSens.maxTemp}&deg</td>
      <td>${envSens.minTemp}&deg</td>
      <td>${envSens.atmosphericPressure} in</td>
      <td>${envSens.relativeHumidity}%</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default ReportsEnvironmentalSensorsTable;
