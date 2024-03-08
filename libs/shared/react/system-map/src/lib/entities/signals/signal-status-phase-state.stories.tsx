// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SignalStatusPhaseState } from './signal-status-phase-state';
import { ExtPhaseState } from '@econolite/shared/data-access/api-signal-status';

const Story: Meta<typeof SignalStatusPhaseState> = {
  component: SignalStatusPhaseState,
  title: 'SignalStatusPhaseState',
};
export default Story;

export const Primary = {
  args: {
    data: "Green" as ExtPhaseState,
  },
};
