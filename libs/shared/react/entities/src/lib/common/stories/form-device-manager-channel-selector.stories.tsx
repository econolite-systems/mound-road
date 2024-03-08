// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import FormDeviceManagerChannelSelector, { deviceManagerChannelSelectorSchema, FormDeviceManagerChannelSelectorProps } from '../form-device-manager-channel-selector';
import { Provider } from 'react-redux';
import { store } from '@econolite/mound-road/data-access/global-state';

export default {
  component: FormDeviceManagerChannelSelector,
  title: 'FormDeviceManagerChannelSelector',
  decorators: [withRHF(true, deviceManagerChannelSelectorSchema)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><FormDeviceManagerChannelSelector {...args as FormDeviceManagerChannelSelectorProps} /></Provider>


export const Primary = Template.bind({});
Primary.args = {
  deviceManager: "",
  channel: ""
};
