// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { withRHF } from '@econolite/react/forms';
import { Story, Meta } from '@storybook/react';
import {
  controllerSchema,
  FormControllerConfig,
  FormControllerConfigProps,
} from '../form-controller-config';

export default {
  component: FormControllerConfig,
  title: 'FormControllerConfig',
  decorators: [withRHF(true, controllerSchema)]
} as Meta;

const Template: Story<FormControllerConfigProps> = (args) => (
  <FormControllerConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  subType: '',
};
