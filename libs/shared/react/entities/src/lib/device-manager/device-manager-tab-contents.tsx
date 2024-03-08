// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import ChannelConfig from "./channel-config";
import DeviceManagerConfig from "./device-manager-config";
import { Route, Routes } from 'react-router-dom';

//Show either the device manager or the channels editor

export function DeviceManagerTabContents() {
  return (
    <Routes>
      <Route path="" element={<DeviceManagerConfig />} />
      <Route path={`/deviceManagers`} element={<DeviceManagerConfig />} />
      <Route path={`/channels/:deviceManagerId`} element={<ChannelConfig />} />
    </Routes>
  )
}

export default DeviceManagerTabContents;
