// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { ChannelList, ChannelListProps } from '../channel-list';

export default {
  component: ChannelList,
  title: 'ChannelList',
} as Meta;

const Template: Story<ChannelListProps> = (args) => (
  <ChannelList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      id: "d96cb8f3-4a14-4a5c-b984-ec7cfdfc1797",
      channelId: 1,
      name: "channel 1",
      primaryPollRate: 2,
      deviceTimeout: 7,
      sourceIPAddress: "99.99.99.99",
      sourcePort: 10
    },
    {
      id: "d96cb8f3-4a14-4a5c-b984-ec7cfdfc1798",
      channelId: 1,
      name: "channel 2",
      primaryPollRate: 16,
      deviceTimeout: 11,
      sourceIPAddress: "99.99.99.99",
      sourcePort: 8,
    }
  ],
  onDelete: action("[Channel] Delete"),
  onEdit: action("[Channel] Edit")
};
