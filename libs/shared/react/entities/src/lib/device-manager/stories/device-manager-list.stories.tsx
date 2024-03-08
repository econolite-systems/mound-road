// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { DeviceManagerList, DeviceManagerListProps } from '../device-manager-list';

export default {
  component: DeviceManagerList,
  title: 'DeviceManagerList',
} as Meta;

const Template: Story<DeviceManagerListProps> = (args) => (
  <DeviceManagerList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      id: "d96cb8f3-4a14-4a5c-b984-ec7cfdfc1797",
      name: "DM 1",
      description: "first dm",
      type: "some type",
      port: "some port"
    },
    {
      id: "d96cb8f3-4a14-4a5c-b984-ec7cfdfc1798",
      name: "DM 2",
      description: "second dm",
      type: "some type",
      port: "some port"
    }
  ],
  onDelete: action("[Device Manager] Delete"),
  onEdit: action("[Device Manager] Edit")
};
