// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { number, object } from 'yup';
import FormInputNumber from '../form-input-number';
import { FormInputProps } from '../form-input-props';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    numberValue: number().required("Text Value is a required field").min(0).max(25).default(1)
  }
);

export default {
  component: FormInputNumber,
  title: 'FormInputNumber',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputNumber {...args as FormInputProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "numberValue",
  label: "Number Value"
};
