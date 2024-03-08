// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { action } from "@storybook/addon-actions";
import { Story, Meta } from '@storybook/react';
import DialogSlideIn, { DialogSlideInProps } from '../dialog-slide-in';

export default {
  component: DialogSlideIn,
  title: 'DialogSlideIn',
} as Meta;

const Template: Story<DialogSlideInProps> = (args) => (
  <DialogSlideIn {...args}><Box>Children content</Box></DialogSlideIn>
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Test',
  open: true,
  handleClose: action("[Dialog] Close"),
  actions: (<Button color="inherit">Action</Button>)
};
