// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { StoryFn, Meta } from '@storybook/react';
import { withRHF } from '@econolite/react/forms';
import MessageForm, {MessageFormProps} from '../message-form';
import { store } from '@econolite/mound-road/data-access/global-state';
import { Provider } from 'react-redux';

export default {
  component: MessageForm,
  title: 'MessageForm',
  decorators: [withRHF(true)]
} as Meta;

const Template: StoryFn = (args) => <Provider store={store}><MessageForm {...args as MessageFormProps} /></Provider>

export const Primary = Template.bind({});
Primary.args = {
  transmitModes: [{label: "Continuous", value: "Continuous"}, {label: "Alternating", value: "Alternating"}],
  itisCodesTypes: [{
      label: "Vehicle Traveling Wrong Way (1793)",
      value: "VehicleTravelingWrongWay",
      fireOnce: true,
      messageTypes: [
        "Information"
      ]
    },
    {
      label: "Ice (5906)",
      value: "Ice",
      fireOnce: false,
      messageTypes: [
        "Alert"
      ]
    },
    {
      label: "Severe Weather (4865)",
      value: "SevereWeather",
      fireOnce: false,
      messageTypes: [
        "Warning",
        "Watch"
      ]
    },
  ],
  targets: [{label: "Target 1", value: "target-1"}, {label: "Target 2", value: "target-2"}]
};
