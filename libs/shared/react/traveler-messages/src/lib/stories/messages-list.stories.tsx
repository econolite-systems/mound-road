// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { action } from "@storybook/addon-actions";
import { StoryFn, Meta } from '@storybook/react';
import { MessagesList, MessagesListProps } from '../messages-list';
import { Provider } from 'react-redux';
import { store } from '@econolite/mound-road/data-access/global-state';

export default {
  component: MessagesList,
  title: 'MessagesList',
} as Meta;

const Template: StoryFn = (args: MessagesListProps) => (
  <Provider store={store}>
    <MessagesList {...args} />
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  isContributor: true,
  isAdministrator: true,
  data: [
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      batchId: '28c6d78e-1002-4b47-8b34-ff528610e21f',
      intersection: '1st @ Main',
      rsu: 'Rsu',
      status: 'Pending',
      message: 'Test Message',
      deliveryTime: "2023-08-25T19:09:05.194Z"
    }
  ],
  onDelete: (id: string) => action(`[Message Type] Delete: ${id}`),
  onCancel: (id: string) => action(`[Message Type] Cancel: ${id}`),
} as MessagesListProps;
