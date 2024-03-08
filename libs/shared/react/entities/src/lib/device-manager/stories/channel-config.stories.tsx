// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { ChannelConfig } from '../channel-config';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from "react-router-dom";


export default {
  component: ChannelConfig,
  title: 'ChannelConfig',
  decorators: [(Story) => (
    <MemoryRouter initialEntries={["/path/fa1638c1-acea-4ae3-a3dd-761a62b28dfe"]}>
      <Route path="/path/:deviceManagerId">
        <Story />
      </Route>
    </MemoryRouter>)]
} as Meta;

const Template: Story = (args) => <Provider store={store}><ChannelConfig /></Provider>;

export const Primary = Template.bind({});
Primary.args = {};

