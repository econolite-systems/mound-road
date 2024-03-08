// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Story, Meta } from '@storybook/react';
import 'rbush';
import Box from '@mui/material/Box';
import MapEditGeometry from './map-edit-geometry';
import { FeatureCollection } from 'geojson';
import { act } from 'react-test-renderer';

export default {
  component: MapEditGeometry,
  title: 'Map Edit Geometry',
  argTypes: {
    updateFeatures: { action: 'updateFeatures' },
  },
} as Meta;

const Template: Story = (args) => <Box sx={{height: '800px'}}><MapEditGeometry {...args} /></Box>;

export const Primary = Template.bind({});
Primary.args = {
  //updateFeatures: (features: FeatureCollection) => { console.log(features); },
  features: {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      id: "testId",
      properties: { },
      geometry: {
        type: "Point",
        coordinates: [-83.0472891, 42.5207944]
      }
    }]
  } as FeatureCollection,
  center: [42.5207944, -83.0472891],
  zoom: 19};
