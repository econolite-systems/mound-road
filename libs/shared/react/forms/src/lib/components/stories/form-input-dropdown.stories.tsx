// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { object, string } from 'yup';
import { FormInputDropdown } from '../form-input-dropdown';
import { FormInputWithOptionsProps } from '../form-input-props';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    dropdownValue: string().required("Dropdown Value is a required field").default('')
  }
);

export default {
  component: FormInputDropdown,
  title: 'FormInputDropdown',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputDropdown {...args as FormInputWithOptionsProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "dropdownValue",
  label: "Dropdown Value",
  options: [
    { label: "Option 1", value: "0" },
    { label: "Option 2", value: "1" }
  ]
};
