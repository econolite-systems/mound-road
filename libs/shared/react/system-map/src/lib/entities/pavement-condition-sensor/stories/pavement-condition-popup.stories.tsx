// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { PavementConditionSensorPopup, PavementConditionPopupProps } from '../pavement-condition-sensor-popup';

export default {
  component: PavementConditionSensorPopup,
  title: 'PavementConditionSensorPopup',
} as Meta;

const Template: Story<PavementConditionPopupProps> = (args) => (
  <PavementConditionSensorPopup {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data:
  {
    location: 'some location',
    severity: 'High'
  }
};
