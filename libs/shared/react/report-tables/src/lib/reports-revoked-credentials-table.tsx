// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { printIframe, ReportsTable } from '@econolite/shared/react/reports';
import { GetUsersApiArg, useGetUsersQuery } from '@econolite/shared/data-access/api-reports';
import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PrintIcon from '@mui/icons-material/Print';
import { SetLocalDate } from '@econolite/shared-react-date-time-formatting';
import { CSVLink } from 'react-csv';
import { LibraryBooks } from '@mui/icons-material';

export function ReportsRevokedCredentialsTable() {
  const [filter] = useState<GetUsersApiArg>({ locked: true });
  const { data, isLoading, isError, refetch } = useGetUsersQuery(filter);

  // if (!isLoading && isError) {
  //   refetch();
  // }

  if (isLoading) return <div>Loading...</div>

  const title = "Revoked User Credentials Report";

  const csvHeaders = [
    { label: "Timestamp", key: "createdTimestamp" },
    { label: "Username", key: "username" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" }
  ];

  const csvFilename = "revoked-user-credentials-report.csv";

  return (
    <>
      <Box sx={{ display: 'flex' }}>
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
          sections={revokedCredentialsTable(title, data)}
        />}
    </>
  );
}

function csvData(data: any[]) {
  return data.map(({ createdTimestamp, username, firstName, lastName, ...rest }) => ({
    createdTimestamp: SetLocalDate(createdTimestamp),
    username: username,
    firstName: firstName,
    lastName: lastName
  }));
}

function revokedCredentialsTable(title: string, data: any[]) {
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
  <th>Username</th>
  <th>First Name</th>
  <th>Last Name</th>
  </thead
  <tbody>
  ${data.map(user => `
    <tr>
      <td>${SetLocalDate(user.createdTimestamp)}</td>
      <td>${user.username}</td>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
    </tr>`).join('')}
  </tbody>
  </table>
  </article>
  </section>
  `
}

export default ReportsRevokedCredentialsTable;
