// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { object, string } from 'yup';
import { FormInputWithOptionsProps } from '../form-input-props';
import { FormInputRadio } from '../form-input-radio';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    radioValue: string().required("Radio Value is a required field").default('')
  }
);

export default {
  component: FormInputRadio,
  title: 'FormInputRadio',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputRadio {...args as FormInputWithOptionsProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "radioValue",
  label: "Radio Value",
  options: [
    { label: "Option 1", value: "0" },
    { label: "Option 2", value: "1" }
  ]
};
