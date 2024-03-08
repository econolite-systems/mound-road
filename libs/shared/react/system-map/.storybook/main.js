// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
const rootMain = require('../../../../../.storybook/main');
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  staticDirs: ['../../../../../node_modules/leaflet/dist/images'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed
    //config.plugins.push(new NodePolyfillPlugin());

    return config;
  },
};
