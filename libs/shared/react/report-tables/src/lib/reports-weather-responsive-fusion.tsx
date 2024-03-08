// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, ReportsCorridorFilter, FilterCorridorData, printIframe } from '@econolite/shared/react/reports';
import { useState } from 'react';
import { GetWeatherResponsiveStatusFusionApiArg, useGetWeatherResponsiveStatusFusionQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsWeatherResponsiveFusionTable() {

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetWeatherResponsiveStatusFusionApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })

  const { data, isLoading, isError, refetch } = useGetWeatherResponsiveStatusFusionQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const filterData = (data: FilterCorridorData) => {
    setOpen(false)
    if (data.corridorId?.length) {
      setFilter({ corridorIds: data['corridorId'], startDate: new Date(new Date(data['startDate']).toDateString()).toISOString(), endDate: new Date(new Date(data['endDate']).toDateString()).toISOString() })
    }
    else {
      setFilter({ startDate: new Date(new Date(data['startDate']).toDateString()).toISOString(), endDate: new Date(new Date(data['endDate']).toDateString()).toISOString() })
    }
  };

  const title = "Weather Responsive Fusion Log Report";

  const csvHeaders = [
    { label: "Corridor", key: "corridorName" },
    { label: "Timestamp", key: "timestamp" },
    { label: "Precipitation", key: "precipitation" },
    { label: "Temperature (F)", key: "temperature" },
    { label: "Road Condition", key: "roadCondition" },
    { label: "Confidence", key: "confidence" },
  ];

  const csvFilename = "weather-responsive-fusion-log-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ReportsCorridorFilter
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
          sections={weatherResponsiveFusionTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ corridorName, timestamp, precipitation, temperature, roadCondition, confidence, ...rest }) => ({
    corridorName: corridorName,
    timestamp: SetLocalDate(timestamp),
    precipitation: precipitation,
    temperature: temperature,
    roadCondition: roadCondition,
    confidence: confidence
  }));
}

function weatherResponsiveFusionTable(title: string, data: any[]) {
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
      <th>Corridor</th>
      <th>Timestamp</th>
      <th>Precipitation</th>
      <th>Temperature (F)</th>
      <th>Road Condition</th>
      <th>Confidence</th>
      </thead>
      <tbody>
      ${data.map(weatherData => `
      <tr>
        <td>${weatherData.corridorName}</td>
        <td>${SetLocalDate(weatherData.timestamp)}</td>
        <td>${weatherData.precipitation}</td>
        <td>${weatherData.temperature}</td>
        <td>${weatherData.roadCondition}</td>
        <td>${weatherData.confidence}</td>
      </tr>`).join('')}
      </tbody>
      </table>
      </article>
      </section>
      `
}

export default ReportsWeatherResponsiveFusionTable;
