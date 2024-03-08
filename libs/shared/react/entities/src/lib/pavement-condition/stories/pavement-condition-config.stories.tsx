// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import { PavementConditionConfig, pavementConditionSchema } from '../pavement-condition-config';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: PavementConditionConfig,
  title: 'PavementConditionConfig',
  decorators: [withRHF(true, pavementConditionSchema)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><PavementConditionConfig {...args}/></Provider>

export const Primary = Template.bind({});
Primary.args = {};
