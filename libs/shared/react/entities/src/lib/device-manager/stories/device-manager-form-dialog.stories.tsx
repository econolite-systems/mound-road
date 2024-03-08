// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  DeviceManagerFormDialog,
  DeviceManagerFormDialogProps,
  schema,
} from '../device-manager-form-dialog';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: DeviceManagerFormDialog,
  title: 'DeviceManagerFormDialog',
  argTypes: {
    handleClose: { action: 'handleClose executed!' },
    addDeviceManager: { action: 'addDeviceManager executed!' },
    editDeviceManager: { action: 'editDeviceManager executed!' },
  },
} as Meta;


const Template: Story = (args) => <Provider store={store}><DeviceManagerFormDialog {...args as DeviceManagerFormDialogProps} /></Provider>


export const Primary = Template.bind({});
Primary.args = {
  data: '',
  open: false,
  isAdd: false,
  /*TODO:  ko - do we need these?
  handleClose: () => void;
  addDeviceManager?: (deviceManager: DeviceManagerState) => void;
  editDeviceManager?*/
};
