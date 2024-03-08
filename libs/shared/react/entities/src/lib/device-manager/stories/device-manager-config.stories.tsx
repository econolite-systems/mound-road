// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { DeviceManagerConfig } from '../device-manager-config';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: DeviceManagerConfig,
  title: 'DeviceManagerConfig',
} as Meta;

const Template: Story = (args) => <Provider store={store}><BrowserRouter><DeviceManagerConfig {...args} /></BrowserRouter></Provider>;

export const Primary = Template.bind({});
Primary.args = {};
