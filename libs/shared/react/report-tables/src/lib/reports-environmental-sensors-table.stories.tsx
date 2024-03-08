// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { ReportsEnvironmentalSensorsTable } from './reports-environmental-sensors-table';
import { Provider } from 'react-redux';
import { store } from '@econolite/mound-road/data-access/global-state';

export default {
  component: ReportsEnvironmentalSensorsTable,
  title: 'Reports Environmental Sensors Table',
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
  <ReportsEnvironmentalSensorsTable {...args} />
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Env Sensor',
      timestamp: '12/13/21 11:23',
      temp: '37',
      dewpointTemp: '21',
      maxTemp: '110',
      minTemp: '-17',
      pressure: '25.89',
      humidity: '15',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21f',
      name: 'Env Sensor 2',
      timestamp: '12/14/21 11:23',
      temp: '38',
      dewpointTemp: '22',
      maxTemp: '111',
      minTemp: '-16',
      pressure: '26.7',
      humidity: '16',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21g',
      name: 'Env Sensor 3',
      timestamp: '12/15/21 11:23',
      temp: '36',
      dewpointTemp: '20',
      maxTemp: '109',
      minTemp: '-18',
      pressure: '24.6',
      humidity: '14',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21h',
      name: 'Env Sensor 4',
      timestamp: '12/13/21 11:23',
      temp: '37',
      dewpointTemp: '21',
      maxTemp: '110',
      minTemp: '-17',
      pressure: '25.89',
      humidity: '15',
    }
  ],
};
