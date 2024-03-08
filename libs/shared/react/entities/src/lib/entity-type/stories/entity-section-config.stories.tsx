// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  EntitySectionConfig,
  EntitySectionConfigProps,
} from '../entity-section-config';

export default {
  component: EntitySectionConfig,
  title: 'EntitySectionConfig',
} as Meta;

const Template: Story<EntitySectionConfigProps> = (args) => (
  <EntitySectionConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  sections: [
    {
      id: "6326ed66-30bf-401c-9301-9775144cf25e",
      name: "Active Days",
      enabled: false,
    },
    {
      id: "0d55dde1-cfe2-441b-9351-0d4405a69a25",
      name: "Communication",
      enabled: false,
    },
    {
      id: "6c74ca50-69ca-4aa1-bfb8-1fbecbb53b88",
      name: "Controller",
      enabled: false,
    },
    {
      id: "09e717e0-c78d-46ef-ace9-1710733bc32b",
      name: "Device Manager",
      enabled: false,
    },
    {
      id: "e01326f7-5693-4c3c-964b-4ee57923be6d",
      name: "Entity",
      enabled: false,
    },
    {
      id: "1b5e2856-06af-48e3-aaeb-88ec7019fc66",
      name: "FTP Credentials",
      enabled: false,
      sections: [
        {
            id: "215f0bbe-8e17-4564-83cf-ad758b40bfeb",
            name: "Username",
            enabled: false,
        },
        {
            id: "e5f340aa-f50c-4b71-a06f-ad0a3fcaf688",
            name: "Password",
            enabled: false,
        }
      ]
    },
    {
        id: "a9af811d-8632-4797-9120-3aa447870edd",
        name: "Id Mapping",
        enabled: false,
    },
    {
        id: "e1f5b5a5-6733-4f13-ab25-f7a2f290bd15",
        name: "Primary Secondary Street Names",
        enabled: true,
    }
  ]
};
