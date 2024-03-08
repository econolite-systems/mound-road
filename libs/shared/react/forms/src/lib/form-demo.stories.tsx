// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { FormDemo } from './form-demo';

export default {
  component: FormDemo,
  title: 'FormDemo',
} as Meta;

const Template: Story = (args) => <FormDemo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
