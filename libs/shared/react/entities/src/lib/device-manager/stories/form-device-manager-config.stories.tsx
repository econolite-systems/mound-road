// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { withRHF } from '@econolite/react/forms';
import { Story, Meta } from '@storybook/react';
import {
  deviceManagerSchema,
  FormDeviceManagerConfig,
  FormDeviceManagerConfigProps,
} from '../form-device-manager-config';

export default {
  component: FormDeviceManagerConfig,
  title: 'FormDeviceManagerConfig',
  decorators: [withRHF(true, deviceManagerSchema)]
} as Meta;

const Template: Story<FormDeviceManagerConfigProps> = (args) => (
  <FormDeviceManagerConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  name: 'Device Manager',
  dmId: 0,
  location: 'TOC'
};
