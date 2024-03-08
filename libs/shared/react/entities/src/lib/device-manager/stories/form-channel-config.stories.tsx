// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { store } from '@econolite/mound-road/data-access/global-state';
import { withRHF } from '@econolite/react/forms';
import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import {
  channelSchema,
  FormChannelConfig,
  FormChannelConfigProps,
} from '../form-channel-config';

export default {
  component: FormChannelConfig,
  title: 'FormChannelConfig',
  decorators: [withRHF(true, channelSchema)]
} as Meta;

const Template: Story<FormChannelConfigProps> = (args) => (
  <FormChannelConfig {...args} />
)

export const Primary = Template.bind({});
Primary.args = {
  name: '',
  primaryPollRate: 0,
  deviceTimeout: 0,
  sourceIPAddress: '',
  sourcePort: 0
};
