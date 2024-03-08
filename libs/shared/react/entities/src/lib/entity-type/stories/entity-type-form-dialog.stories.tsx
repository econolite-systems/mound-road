// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  EntityTypeFormDialog,
  EntityTypeFormDialogProps,
} from '../entity-type-form-dialog';

export default {
  component: EntityTypeFormDialog,
  title: 'EntityTypeFormDialog',
} as Meta;

const Template: Story<EntityTypeFormDialogProps> = (args) => (
  <EntityTypeFormDialog {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
