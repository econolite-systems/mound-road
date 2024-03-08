// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { DialogForm, DialogFormProps } from '../dialog-form';

export default {
  component: DialogForm,
  title: 'DialogForm',
} as Meta;

const Template: Story<DialogFormProps> = (args) => <DialogForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
