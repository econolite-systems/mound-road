// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { withRHF } from '@econolite/react/forms';
import { Story, Meta } from '@storybook/react';
import {
  FormFtpCredentialsConfig,
  FormFtpCredentialsConfigProps,
  ftpCredentialsSchema,
} from '../form-ftp-credentials-config';

export default {
  component: FormFtpCredentialsConfig,
  title: 'FormFtpCredentialsConfig',
  decorators: [withRHF(true, ftpCredentialsSchema)]
} as Meta;

const Template: Story<FormFtpCredentialsConfigProps> = (args) => (
  <FormFtpCredentialsConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
