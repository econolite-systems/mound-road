// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { StoryFn, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import ActionForm, { ActionFormProps, actionFormSchema } from '../action-form';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: ActionForm,
  title: 'FormSignalConfig',
  decorators: [withRHF(true, actionFormSchema)]
} as Meta;

const Template: StoryFn = (args) => <Provider store={store}><ActionForm {...args as ActionFormProps} /></Provider>

export const Primary = Template.bind({});
Primary.args = {
  parentName: "action",
  action: "send-tim-message",
  targets: [{label: "Target 1", value: "target-1"}, {label: "Target 2", value: "target-2"}]
};
