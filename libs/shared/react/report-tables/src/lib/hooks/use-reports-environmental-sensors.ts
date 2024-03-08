// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

export function useReportsEnvironmentalSensors() {
  const reportSensors = useSelector((state: any) => state.sensors.reportSensors);

  return { reportSensors };
}

export default useReportsEnvironmentalSensors;
