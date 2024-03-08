// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  FormEntityTypeConfig,
  FormEntityTypeConfigProps,
} from '../form-entity-type-config';

export default {
  component: FormEntityTypeConfig,
  title: 'FormEntityTypeConfig',
} as Meta;

const Template: Story<FormEntityTypeConfigProps> = (args) => (
  <FormEntityTypeConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
