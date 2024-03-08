// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';
import FormWrongWayDriverConfig, { formWrongWayDriverSchema } from '../form-wrong-way-driver-config';

export default {
  component: FormWrongWayDriverConfig,
  title: 'Form Wrong Way Driver Config',
  decorators: [withRHF(true, formWrongWayDriverSchema)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><FormWrongWayDriverConfig {...args}/></Provider>

export const Primary = Template.bind({});
Primary.args = {
  activeDays: 7
};
