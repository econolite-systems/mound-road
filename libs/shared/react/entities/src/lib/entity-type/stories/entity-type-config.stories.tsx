// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { EntityTypeConfig, EntityTypeConfigProps } from '../entity-type-config';

export default {
  component: EntityTypeConfig,
  title: 'EntityTypeConfig',
} as Meta;

const Template: Story<EntityTypeConfigProps> = (args) => (
  <EntityTypeConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
