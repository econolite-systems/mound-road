// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { printIframe, ReportsTable } from '@econolite/shared/react/reports';
import { useGetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeQuery } from '@econolite/shared/data-access/api-reports';
import PrintIcon from '@mui/icons-material/Print';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';

export function ReportsConnectedVehicleIntersectionsTable() {

  const { data, isLoading, isError, refetch } = useGetConnectedVehicleStatusGetIntersectionTotalsByMessageTypeQuery();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  function getIntersectionMessages(data: any[]) {
    const intersectionMessages = [];
    const uniqueIds = data.map(message => message.intersectionId)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (let index = 0; index < uniqueIds.length; index++) {
      const messageId = uniqueIds[index];
      const intersectionMessage = createMessage();
      const messageTypes = data.filter(message => message.intersectionId === messageId);
      const spatMessage = messageTypes.find(message => message.type === 'SPAT');
      const srmMessage = messageTypes.find(message => message.type === 'SRM');

      if (spatMessage) {
        intersectionMessage.spatMessages = spatMessage.messageCount;
        intersectionMessage.spatSize = spatMessage.size;
        intersectionMessage.name = spatMessage.intersectionName;
      }
      if (srmMessage) {
        intersectionMessage.srmMessages = srmMessage.messageCount;
        intersectionMessage.srmSize = srmMessage.size;
        intersectionMessage.name = srmMessage.intersectionName;
      }
      intersectionMessage.id = messageId;

      if (intersectionMessage.spatMessages > 0 || intersectionMessage.srmMessages > 0) {
        intersectionMessages.push(intersectionMessage)
      }
    }
    const sortedIntersectionMessages = intersectionMessages.sort((a, b) => a.name.localeCompare(b.name));
    return sortedIntersectionMessages;
  }

  function createMessage() {
    const newMessage = {
      name: 'Unknown',
      spatMessages: 0,
      spatSize: 0,
      srmMessages: 0,
      srmSize: 0,
      id: ''
    };
    return newMessage;
  }

  const title = "Connected Vehicle Messages Per Intersection Report";

  const csvHeaders = [
    { label: "Intersection", key: "name" },
    { label: "SPaT Messages", key: "spatMessages" },
    { label: "SPaT Size", key: "spatSize" },
    { label: "SRM Messages", key: "srmMessages" },
    { label: "SRM Size", key: "srmSize" }
  ];

  const csvFilename = "connected-vehicle-intersection-report.csv";

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
          sections={connectedVehicleIntersectionsTable(title, getIntersectionMessages(data))}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data;
}

function connectedVehicleIntersectionsTable(title: string, data: any[]) {
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
    <th style="text-align:center">Intersection</th>
    <th style="text-align:center" colspan="2">SPaT</th>
    <th style="text-align:center" colspan="2">SRM</th>
    </thead>
    <tbody>
    ${data.map(intersections => `
    <tr>
      <td style="width:40%">${intersections.name}</td>
      <td style="width:15%">${intersections.spatMessages}</td>
      <td style="width:15%">${intersections.spatSize}</td>
      <td style="width:15%">${intersections.srmMessages}</td>
      <td style="width:15%">${intersections.srmSize}</td>
    </tr>`).join('')}
    </tbody>
    </table>
    </article>
    </section>
    `
}

export default ReportsConnectedVehicleIntersectionsTable;
