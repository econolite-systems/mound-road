// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
module.exports = {
  displayName: 'shared-data-access-map-state',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/shared/data-access/map-state',
};