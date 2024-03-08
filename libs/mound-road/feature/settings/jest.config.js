// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
module.exports = {
  displayName: 'mound-road-feature-settings',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/mound-road/feature/settings',
};
