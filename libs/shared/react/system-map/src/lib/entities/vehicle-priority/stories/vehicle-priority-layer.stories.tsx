// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { VehiclePriorityLayer } from '../vehicle-priority-layer';
import { Provider } from 'react-redux';
import { store } from '@econolite/mound-road/data-access/global-state';
import { LayersControl, MapContainer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

export default {
  component: VehiclePriorityLayer,
  title: 'VehiclePriorityLayer',
} as Meta;

const center = [42.5362, -83.0480] as LatLngExpression;

const Template: Story = (args) => (
  <Provider store={store}>
    <MapContainer center={center} zoom={13}>
      <LayersControl position="topright">
        <VehiclePriorityLayer />
      </LayersControl>
    </MapContainer>
  </Provider>);

export const Primary = Template.bind({});
Primary.args = {};
