// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SignalStatusPhaseTable } from './signal-status-phase-table';

const Story: Meta<typeof SignalStatusPhaseTable> = {
  component: SignalStatusPhaseTable,
  title: 'SignalStatusPhaseTable',
};
export default Story;

export const Primary = {
  args: {
    data: [
      {
        phase: 1,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 2,
        extendedPhaseState: "Red",
        extendedPedState: "Walk",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 3,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 4,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 5,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 6,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 7,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 8,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: false,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 9,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 10,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 11,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 12,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 13,
        extendedPhaseState: "Red",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 14,
        extendedPhaseState: "Yellow",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 15,
        extendedPhaseState: "Off",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      },
      {
        phase: 16,
        extendedPhaseState: "Off",
        extendedPedState: "DW",
        isNextPhase: true,
        isVehCall: false,
        isPedCall: false,
        isPhaseFlash: false
      }
    ]
  },
};
