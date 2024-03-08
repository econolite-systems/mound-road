// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { date, object } from 'yup';
import { FormInputDate } from '../form-input-date';
import { FormInputProps } from '../form-input-props';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    dateValue: date().required("Text Value is a required field").default(new Date("12/01/2021"))
  }
);

export default {
  component: FormInputDate,
  title: 'FormInputDate',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputDate {...args as FormInputProps} />

export const Primary = Template.bind({});
Primary.args = {
  name: "dateValue",
  label: "Date Selection"
};
