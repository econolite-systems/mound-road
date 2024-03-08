// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { EnvironmentalSensorPopup, EnvironmentalSensorPopupProps } from '../environmental-sensor-popup';

export default {
  component: EnvironmentalSensorPopup,
  title: 'EnvironmentalSensorPopup',
} as Meta;

const Template: Story<EnvironmentalSensorPopupProps> = (args) => (
  <EnvironmentalSensorPopup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Precipitation',
      value: '0%',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Visibility',
      value: '10 miles',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Humidity',
      value: '17%',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Temperature',
      value: '51',
    }
  ]
};
