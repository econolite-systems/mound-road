// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SignalStatusPopup } from './signal-status-popup';

const Story: Meta<typeof SignalStatusPopup> = {
  component: SignalStatusPopup,
  title: 'SignalStatusPopup',
};
export default Story;

export const Primary = {
  args: {
    status: {
      signalId: "123456",
      phaseStatus:[
        {
          phase: 1,
          extendedPhaseState: "Red",
          extendedPedState: "FDW",
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
          extendedPedState: "FDW",
          isNextPhase: false,
          isVehCall: false,
          isPedCall: false,
          isPhaseFlash: false
        },
        {
          phase: 4,
          extendedPhaseState: "Red",
          extendedPedState: "FDW",
          isNextPhase: false,
          isVehCall: false,
          isPedCall: false,
          isPhaseFlash: false
        },
        {
          phase: 5,
          extendedPhaseState: "Red",
          extendedPedState: "FDW",
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
          extendedPhaseState: "Off",
          extendedPedState: "Off",
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
          isPhaseFlash: true
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
          extendedPhaseState: "Red",
          extendedPedState: "DW",
          isNextPhase: true,
          isVehCall: false,
          isPedCall: false,
          isPhaseFlash: false
        },
        {
          phase: 15,
          extendedPhaseState: "Red",
          extendedPedState: "DW",
          isNextPhase: true,
          isVehCall: false,
          isPedCall: false,
          isPhaseFlash: false
        },
        {
          phase: 16,
          extendedPhaseState: "Red",
          extendedPedState: "DW",
          isNextPhase: true,
          isVehCall: false,
          isPedCall: false,
          isPhaseFlash: false
        }
      ],
      overlapStatus: [
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
    }
  },
};
