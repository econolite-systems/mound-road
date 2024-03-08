// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SignalStatusOverlapTable } from './signal-status-overlap-table';

const Story: Meta<typeof SignalStatusOverlapTable> = {
  component: SignalStatusOverlapTable,
  title: 'SignalStatusOverlapTable',
};
export default Story;

export const Primary = {
  args: {
    data: [
      {
        overlap: "A",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "B",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "C",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "D",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "E",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "F",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "G",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "H",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "I",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "J",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "K",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "L",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "M",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "N",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "O",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      },
      {
        overlap: "P",
        extendedPhaseState: "Red",
        extendedPedState: "None",
        isOverlapFlash: false
      }
    ]
  },
};
