// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  ChannelFormDialog,
  ChannelFormDialogProps,
  schema,
} from '../channel-form-dialog';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: ChannelFormDialog,
  title: 'ChannelFormDialog',
  argTypes: {
    handleClose: { action: 'handleClose executed!' },
    addChannel: { action: 'addChannel executed!' },
    editChannel: { action: 'editChannel executed!' },
  },
} as Meta;


const Template: Story = (args) => <Provider store={store}><ChannelFormDialog {...args as ChannelFormDialogProps} /></Provider>


export const Primary = Template.bind({});
Primary.args = {
  data: "36a4477a-bfd7-4583-91d7-b98c883dcbf3",
  deviceManagerId: "fa1638c1-acea-4ae3-a3dd-761a62b28dfe",
  open: false,
  isAdd: false,
  /*TODO:  ko - do we need these?
  handleClose: () => void;
  addChannel?: (deviceManager: ChannelState) => void;
  editChannel?*/
};
