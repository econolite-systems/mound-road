// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
export interface ChannelState {
  id?: string;
  channelId?: number;
  channelType?: string;
  name?: string;
  primaryPollRate?: number;
  deviceTimeout?: number;
  sourceIPAddress?: string;
  sourcePort?: number;
  destinationIPAddress?: string;
  destinationPort?: number;
};

export interface DeviceManagerState {
  id?: string;
  name?: string;
  dmId?: number;
  location?: string;
  port?: number;
  channels?: Array<ChannelState>;
};
