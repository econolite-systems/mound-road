// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { store } from '@econolite/mound-road/data-access/global-state';
import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { Map } from './map';
import 'rbush';
import Box from '@mui/material/Box';

export default {
  component: Map,
  title: 'Map',
} as Meta;

const Template: Story = (args) => <Provider store={store}><Box sx={{height: '800px'}}><Map {...args} /></Box></Provider>;

export const Primary = Template.bind({});
Primary.args = {};
