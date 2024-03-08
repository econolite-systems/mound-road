// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { EntityList, EntityListProps } from '../entity-list';

export default {
  component: EntityList,
  title: 'EntityList',
} as Meta;

const Template: Story<EntityListProps> = (args) => <EntityList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
