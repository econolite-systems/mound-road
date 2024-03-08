// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { ReportsTable, DateRangeFilter, DateRangeFilterData, printIframe } from '@econolite/shared/react/reports';
import { GetTimStatusFindApiArg, TimDocument, TimDocumentDto, useGetTimStatusFindQuery } from '@econolite/shared/data-access/api-reports';
import { GetTodayDate, GetYesterdayDate, SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import PrintIcon from '@mui/icons-material/Print';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';
import { useGetTimItisCodesQuery } from '@econolite/shared/data-access/api-tim';
import { useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';

export function ReportsTimTable() {

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<GetTimStatusFindApiArg>({ startDate: GetYesterdayDate().toISOString(), endDate: GetTodayDate().toISOString() })

  const { data, isLoading, isError, refetch } = useGetTimStatusFindQuery(filter);
  const { data: itisCodeTypes, isLoading: isItisCodeTypesLoading, error: itisCodeTypesError, isError: isItisCodeTypesError, refetch: itisCodeTypesRefetch } = useGetTimItisCodesQuery();
  const { data: intersections, isLoading: isIntersectionsLoading, error: intersectionsError, isError: isIntersectionsError, refetch: intersectionsRefetch } = useGetEntitiesTypesByTypeQuery({ type: "Intersection" });

  // if (!isLoading && isError) {
  //   refetch();
  // }

  // if (!isItisCodeTypesLoading && isItisCodeTypesError) {
  //   itisCodeTypesRefetch();
  // }

  // if (!isIntersectionsLoading && isIntersectionsError) {
  //   intersectionsRefetch();
  // }

  if (isLoading || isItisCodeTypesLoading || isIntersectionsLoading) return <div>Loading...</div>;

  const filterData = ({ startDate, endDate }: DateRangeFilterData) => {
    setOpen(false);
    setFilter({ startDate: new Date(new Date(startDate).toDateString()).toISOString(), endDate: new Date(new Date(endDate).toDateString()).toISOString() });
  };

  const getLabelForItisCode = (code: string) => {
    const itisCode = itisCodeTypes?.find(itis => itis.value === code);
    return itisCode?.label ?? '';
  }

  const getLabelForIntersection = (id: string) => {
    const intersection = intersections?.find(intersection => intersection.id === id);
    return intersection?.name ?? '';
  }

  const title = "Traveler Information Message Log Report";

  const csvHeaders = [
    { label: "Activated Timestamp", key: "deliveryStart" },
    { label: "Ended Timestamp", key: "deliveryEnd" },
    { label: "Message", key: "contentsMessage" },
    { label: "Location", key: "location" }
  ];

  const csvFilename = "tim-log-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DateRangeFilter
          filterData={filterData}
          open={open}
          onClose={() => setOpen(false)}
        />
        <div style={{ marginTop: 'auto' }}>
          {(data && data.length > 0 && itisCodeTypes && itisCodeTypes.length > 0) &&
            <>
              <Tooltip title="Print">
                <IconButton sx={{}} onClick={() => printIframe()}>
                  <PrintIcon />
                </IconButton>
              </Tooltip>
              <CSVLink data={csvData(data, getLabelForItisCode, getLabelForIntersection)} headers={csvHeaders} filename={csvFilename} target="_blank">
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
          sections={timTable(title, data, getLabelForItisCode, getLabelForIntersection)}
        />}
    </>
  );
}

function csvData(data: any[], getLabelForItisCode: (code: string) => string, getLabelForIntersection: (id: string) => string) {
  return data.map(({ deliveryStart, endDate, itisCode, intersectionId, ...rest }) => ({
    deliveryStart: SetLocalDate(deliveryStart),
    deliveryEnd: SetLocalDate(endDate),
    contentsMessage: getLabelForItisCode(itisCode),
    location: getLabelForIntersection(intersectionId),
    ...rest
  }));
}

function timTable(title: string, data: TimDocument[], getLabelForItisCode: (code: string) => string, getLabelForIntersection: (id: string) => string) {
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
    <th>Activated Timestamp</th>
    <th>Ended Timestamp</th>
    <th>Message</th>
    <th>Location</th>
    </thead>
    <tbody>
    ${data.map(tim => `
    <tr>
      <td>${tim.deliveryStart && SetLocalDate(tim.deliveryStart)}</td>
      <td>${tim.endDate && SetLocalDate(tim.endDate)}</td>
      <td>${tim.itisCode && getLabelForItisCode(tim.itisCode)}</td>
      <td>${tim.intersectionId && getLabelForIntersection(tim.intersectionId)}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
  `;
}

export default ReportsTimTable;
