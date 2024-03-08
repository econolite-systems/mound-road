// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import { ReportDropdown } from '@econolite/shared/react/report-tables';
import { useGetJasperReportGetJasperReportsQuery } from '@econolite/shared/data-access/api-reports';
import { FormInputOption } from '@econolite/react/forms';

export function Reports() {

  const { data, isLoading, isSuccess, isError, refetch } = useGetJasperReportGetJasperReportsQuery();

  // if (!isLoading && isError) {
  //   refetch();
  // }

  function getReportTypes() {
    const reportTypes: Array<FormInputOption> = [
      { label: "Audit Log", key: 'audit', value: 'audit' },
      { label: "Background Service Event Log", key: 'eventlog', value: 'eventlog' },
      { label: "Connected Vehicle Intersection Messages", key: 'cvintersection', value: 'cvintersection' },
      { label: "Connected Vehicle Messages", key: 'cvtotals', value: 'cvtotals' },
      { label: "Environmental Sensor Log", key: 'ess', value: 'ess' },
      { label: "Pavement Conditions", key: 'pavementcondition', value: 'pavementcondition' },
      { label: "Revoked User Credentials", key: 'revokedcredentials', value: 'revokedcredentials' },
      { label: "Road Side Unit Events", key: 'rsu', value: 'rsu' },
      { label: "System Error Log", key: 'errorlog', value: 'errorlog' },
      { label: "Traveler Information Message Log", key: 'tim', value: 'tim' },
      { label: "Weather Responsive Log", key: 'weatherresponsive', value: 'weatherresponsive' },
      { label: "Weather Responsive Fusion Log", key: 'weatherfusion', value: 'weatherfusion' },
      { label: "Wrong Way Driver Log", key: 'wwd', value: 'wwd' }
    ];

    if (data && data.length > 0) {
      const jasperReportTypes: Array<FormInputOption> = data.map(x => {
        return { label: x.label, key: 'custom/' + x.label, value: x.label } as FormInputOption
      });

      return reportTypes.concat(jasperReportTypes);
    }

    return reportTypes;
  }

  return (
    <>
      {(isLoading) &&
        <div>Loading...</div>
      }
      {(isSuccess) &&
        <Fade in={true} enter={true} exit={true}>
          <Container sx={{ height: `calc(100vh - 64px)` }}>
            <ReportDropdown reportTypes={getReportTypes()} />
          </Container>
        </Fade>
      }
    </>
  );
}

export default Reports;
