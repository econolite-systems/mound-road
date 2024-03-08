// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { boolean, object } from 'yup';
import { FormInputProps } from '../form-input-props';
import FormInputSwitch from '../form-input-switch';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    switchValue: boolean().required("Switch Value is a required field").default(false)
  }
);

export default {
  component: FormInputSwitch,
  title: 'FormInputSwitch',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputSwitch {...args as FormInputProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "switchValue",
  label: "Is Enabled"
};
