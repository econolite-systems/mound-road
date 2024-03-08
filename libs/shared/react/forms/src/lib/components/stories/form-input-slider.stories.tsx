// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { number, object } from 'yup';
import { FormInputRangeProps } from '../form-input-props';
import { FormInputSlider } from '../form-input-slider';
import { withRHF } from './with-rhf';

const inputSchema = object(
  {
    sliderValue: number().required("Text Value is a required field").default(25)
  }
);

export default {
  component: FormInputSlider,
  title: 'FormInputSlider',
  decorators: [withRHF(true, inputSchema)]
} as Meta;

const Template: Story = (args) => <FormInputSlider {...args as FormInputRangeProps} />


export const Primary = Template.bind({});
Primary.args = {
  name: "sliderValue",
  label: "Slider Value",
  min: 1,
  max: 50,
  step: 1
};
