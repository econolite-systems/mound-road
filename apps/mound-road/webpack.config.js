// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
const { composePlugins, withNx } = require('@nx/webpack');

module.exports = composePlugins(withNx(), (config, { options, context }) => {
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
});
