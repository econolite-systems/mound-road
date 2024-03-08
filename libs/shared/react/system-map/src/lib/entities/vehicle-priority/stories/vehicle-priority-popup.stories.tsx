// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { VehiclePriorityPopup, VehiclePriorityPopupProps } from '../vehicle-priority-popup';

export default {
  component: VehiclePriorityPopup,
  title: 'VehiclePriorityPopup',
} as Meta;

const Template: Story<VehiclePriorityPopupProps> = (args) => (
  <VehiclePriorityPopup {...args} />
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
