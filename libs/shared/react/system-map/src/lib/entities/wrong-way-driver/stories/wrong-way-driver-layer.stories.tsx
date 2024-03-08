// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { WrongWayDriverLayer } from '../wrong-way-driver-layer';
import { Provider } from 'react-redux';
import { store } from '@econolite/mound-road/data-access/global-state';
import { LayersControl, MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export default {
  component: WrongWayDriverLayer,
  title: 'Wrong Way Driver Layer',
} as Meta;

const center = [42.5362, -83.0480] as LatLngExpression;

const Template: Story = (args) => (
  <Provider store={store}>
    <MapContainer center={center} zoom={13}>
      <LayersControl position="topright">
        <WrongWayDriverLayer />
      </LayersControl>
    </MapContainer>
  </Provider>);

export const Primary = Template.bind({});
Primary.args = {};
