// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { store } from '@econolite/mound-road/data-access/global-state';
import Box from '@mui/material/Box';
import { Story, Meta } from '@storybook/react';
import { LatLngExpression } from 'leaflet';
import { MapContainer } from 'react-leaflet';
import { Provider } from 'react-redux';
import EnvironmentalSensorIcon from '../../icons/environmental-sensor-icon';
import { LocationMarker, LocationMarkerProps, LocationMarkerType } from '../location-marker';

export default {
  component: LocationMarker,
  title: 'LocationMarker',
} as Meta;

const center = [42.5362, -83.0480] as LatLngExpression;

const Template: Story<LocationMarkerProps> = (args) => (
  <Provider store={store}>
    <Box sx={{ height: '800px' }}>
      <MapContainer center={center} zoom={13}>
        <LocationMarker {...args} />
      </MapContainer>
    </Box>
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  heading: "test ess heading",
  position: [42.5362, -83.0480] as LatLngExpression,
  icon: EnvironmentalSensorIcon({ className: "red" }),
  tooltip: "test ess tooltip",
  type: LocationMarkerType.EnvironmentalSensor,
  popupData: [
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Precipitation',
      value: '0%',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Visibility',
      value: '10 miles',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Humidity',
      value: '17%',
    },
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'Temperature',
      value: '51',
    }
  ]
};
