// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import { FormInputDropdown, FormInputOption } from '@econolite/react/forms';
import {
  FormProvider,
  useForm
} from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const reportSchema = object({
  reportType: string().required(),
});

export interface ReportDropdownProps {
  reportTypes: Array<FormInputOption>
}
export function ReportDropdown({ reportTypes }: ReportDropdownProps) {
  const methods = useForm({ resolver: yupResolver(reportSchema) });
  const navigate = useNavigate();
  const location = useLocation();
  const reportType = methods.watch('reportType');

  const selectedReportType = () => {
    const split = location.pathname.split('/');
    const type = split[split.length - 1];
    return (type && type !== 'reports') ? type : '';
  }

  const currentReportType = selectedReportType();

  useEffect(() => {
    if (reportType) {
      navigate(`./${reportTypes.find(x => x.value === reportType)!.key}`);
    }
  }, [navigate, reportType, currentReportType])

  return (

    <FormProvider {...methods}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'column', borderBottom: 1, borderColor: 'divider', paddingTop: 2 }}>
            <FormInputDropdown
              name="reportType"
              label="Select Report"
              options={reportTypes}
              defaultValue={currentReportType}
              control={methods.control}
            />
          </Box>
        </form>
        <Outlet />
      </Box>
    </FormProvider>
  )
}
