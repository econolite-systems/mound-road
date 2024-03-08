// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppConfig } from '@econolite/mound-road/data-access/global-state';

export function JasperReportViewer() {
  const params = useParams();
  const { config } = useAppConfig();

  const [reportUrl, setReportUrl] = useState("");

  useEffect(() => {
    const reportServer = config.jasperReportSettings.reportServerUrl;
    const username = config.jasperReportSettings.reportServerUsername;
    const password = config.jasperReportSettings.reportServerPassword;
    const reportType = "/Reports/" + params["reportType"];
    const url = reportServer + "/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&j_username=" + username + "&j_password=" + password + "&decorate=no&reportUnit=" + reportType;

    setReportUrl(url);
  })

  return (
    <>
      {(reportUrl.length > 0) &&
        <Box sx={{ display: 'flex', height: '75vh' }}>
          <iframe className="reportViewerIframe" height="100%" id="jasperReportViewer" title="Report Viewer" width="100%" src={reportUrl} />
        </Box>
      }
    </>
  )
}

export default JasperReportViewer;
