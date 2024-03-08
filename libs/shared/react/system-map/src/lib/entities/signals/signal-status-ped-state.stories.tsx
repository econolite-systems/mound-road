// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SignalStatusPedState } from './signal-status-ped-state';

const Story: Meta<typeof SignalStatusPedState> = {
  component: SignalStatusPedState,
  title: 'SignalStatusPedState',
};
export default Story;

export const Primary = {
  args: {
    data: "FDW",
  },
};
