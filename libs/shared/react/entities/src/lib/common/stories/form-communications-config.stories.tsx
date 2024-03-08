// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { withRHF } from '@econolite/react/forms';
import { Story, Meta } from '@storybook/react';
import {
  communicationsSchema,
  FormCommunicationsConfig,
  FormCommunicationsConfigProps,
} from '../form-communications-config';

export default {
  component: FormCommunicationsConfig,
  title: 'FormCommunicationsConfig',
  decorators: [withRHF(true, communicationsSchema)]
} as Meta;

const Template: Story<FormCommunicationsConfigProps> = (args) => (
  <FormCommunicationsConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
