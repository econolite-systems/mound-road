// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { TabPanel, TabsProps } from './tab-panel';

export default {
  component: TabPanel,
  title: 'TabPanel',
} as Meta;

const Template: Story<TabsProps> = (args) => <TabPanel {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  index: 0,
  value: 0,
};
