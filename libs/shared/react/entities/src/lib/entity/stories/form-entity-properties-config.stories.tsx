// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import {
  FormEntityPropertiesConfig,
  FormEntityPropertiesConfigProps,
} from '../form-entity-properties-config';
import { withRHF } from '@econolite/react/forms';
import { entityCommonSchema } from '../sections/form-entity-common';

export default {
  component: FormEntityPropertiesConfig,
  title: 'FormEntityPropertiesConfig',
  decorators: [withRHF(true, entityCommonSchema)]
} as Meta;

const Template: Story<FormEntityPropertiesConfigProps> = (args) => (
  <FormEntityPropertiesConfig {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  entityType : {
    id: "37855e7c-0750-4a4f-80bc-3f00c90b15ce",
    name: "Ess",
    systemType: true,
    visible: true,
    sections: [
      {
        id: "e01326f7-5693-4c3c-964b-4ee57923be6d",
        name: "Entity",
        enabled: true,
        sections: []
      },
      {
        id: "e1f5b5a5-6733-4f13-ab25-f7a2f290bd15",
        name: "Primary Secondary Street Names",
        enabled: false,
        sections: []
      },
      {
        id: "6326ed66-30bf-401c-9301-9775144cf25e",
        name: "Active Days",
        enabled: true,
        sections: []
      },
      {
        id: "0d55dde1-cfe2-441b-9351-0d4405a69a25",
        name: "Communication",
        enabled: true,
        sections: []
      },
      {
        id: "6c74ca50-69ca-4aa1-bfb8-1fbecbb53b88",
        name: "Controller",
        enabled: true,
        sections: []
      },
      {
        id: "09e717e0-c78d-46ef-ace9-1710733bc32b",
        name: "Device Manager",
        enabled: true,
        sections: []
      },
      {
        id: "1b5e2856-06af-48e3-aaeb-88ec7019fc66",
        name: "FTP Credentials",
        enabled: true,
        sections: [
          {
            id: "215f0bbe-8e17-4564-83cf-ad758b40bfeb",
            name: "Username",
            enabled: true,
            sections: []
          },
          {
            id: "e5f340aa-f50c-4b71-a06f-ad0a3fcaf688",
            name: "Password",
            enabled: true,
            sections: []
          }
        ]
      },
      {
        id: "a9af811d-8632-4797-9120-3aa447870edd",
        name: "Id Mapping",
        enabled: true,
        sections: []
      }
    ],
    children: []
  }
};
