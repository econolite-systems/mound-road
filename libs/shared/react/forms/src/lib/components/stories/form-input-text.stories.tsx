// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { object, string } from 'yup';
import { FormInputProps } from '../form-input-props';
import FormInputText from '../form-input-text';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    textValue: string().required("Text Value is a required field")
  }
);

export default {
  component: FormInputText,
  title: 'FormInputText',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputText {...args as FormInputProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "textValue",
  label: "Text Value",
  defaultValue: "Test Me",
  value: "Test You"
};
