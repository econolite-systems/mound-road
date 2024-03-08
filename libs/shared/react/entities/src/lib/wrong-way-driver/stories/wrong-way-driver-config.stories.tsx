// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import { WrongWayDriverConfig, wrongWayDriverSchema } from '../wrong-way-driver-config';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: WrongWayDriverConfig,
  title: 'Wrong Way Driver Config',
  decorators: [withRHF(true, wrongWayDriverSchema)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><WrongWayDriverConfig {...args}/></Provider>

export const Primary = Template.bind({});
Primary.args = {};
