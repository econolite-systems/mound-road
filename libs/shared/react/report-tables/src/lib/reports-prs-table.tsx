// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import { ReportsTable, SignalFilter, SignalFilterData, printIframe } from '@econolite/shared/react/reports';
// import { GetVehiclePriorityStatusFindApiArg, useGetVehiclePriorityStatusFindQuery, VehiclePriorityStatusDto } from '@econolite/shared/data-access/api-reports';
// import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import PrintIcon from '@mui/icons-material/Print';

// export function ReportsPrsTable() {

//   const [open, setOpen] = useState(false);
//   const [filter, setFilter] = useState<GetVehiclePriorityStatusFindApiArg>({ startDate: new Date().toISOString() })

//   const { data, isLoading } = useGetVehiclePriorityStatusFindQuery(filter);

//   if (isLoading) return <div>Loading...</div>;

//   const filterData = ({ startDate, endDate, deviceIds }: SignalFilterData) => {
//     setOpen(false);
//     setFilter({ startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString(), deviceIds });
//   };

//   return (
//     <Box>
//       <SignalFilter
//         filterData={filterData}
//         open={open}
//         onClose={() => setOpen(false)}
//       />
//        <div style={{marginTop: 'auto'}}>
//            {(data && data.length > 0) &&
//            <IconButton sx={{}} onClick={()=> printIframe()}>
//              <PrintIcon />
//            </IconButton>
//            }
//        </div>
//       {(!data || data.length === 0) &&
//         <div>No data found</div>}
//       {(data && data.length > 0) &&
//         <ReportsTable
//           title='Vehicle Priority Status Report'
//           sections={prsTable(data)}
//         />}
//     </Box>
//   );
// }

// function prsTable(data: VehiclePriorityStatusDto[]) {
//   return `
//     <section>
//     <article>
//     <table class="w100">
//     <thead>
//     <th>Source</th>
//     <th>Timestamp</th>
//     <th>Signal</th>
//     <th>Type</th>
//     <th>Details</th>
//     </thead>
//     <tbody>
//     ${data.map(prs => `
//     <tr>
//       <td>${prs.source}</td>
//       <td>${prs.timestamp && SetLocalDate(prs.timestamp)}</td>
//       <td>${prs.deviceName}</td>
//       <td>${prs.requestType ?? ''}</td>
//       <td>${prs.requestStatus ?? ''}</td>
//     </tr>`).join('')}
//     </tbody>
//     </table>
//     </article>
//     </section>
//   `;
// }

// export default ReportsPrsTable;
