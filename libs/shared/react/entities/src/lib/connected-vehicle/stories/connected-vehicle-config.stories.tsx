// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import { ConnectedVehicleConfig, connectedVehicleConditionSchema } from '../connected-vehicle-config';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: ConnectedVehicleConfig,
  title: 'ConnectedVehicleConfig',
  decorators: [withRHF(true, connectedVehicleConditionSchema)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><ConnectedVehicleConfig {...args}/></Provider>

export const Primary = Template.bind({});
Primary.args = {};
