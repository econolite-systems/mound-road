// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { DeleteConfirmModal, DeleteConfirmModalProps } from '../delete-confirm-modal';

export default {
  component: DeleteConfirmModal,
  title: 'DeleteConfirmModal',
  argTypes: { onClose: {action: 'onClose'}}
} as Meta;

const Template: Story<DeleteConfirmModalProps> = (args) => <DeleteConfirmModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isShowing: true
};

export const WithType = Template.bind({});
WithType.args = {
  isShowing: true,
  type: 'Layer'
};

export const WithTypeAndName = Template.bind({});
WithTypeAndName.args = {
  isShowing: true,
  type: 'Layer',
  name: 'Signals'
};

WithTypeAndName.storyName = 'With type and name'
