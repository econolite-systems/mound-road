// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { action } from "@storybook/addon-actions";
import { Story, Meta } from '@storybook/react';
import { EntityTypeList, EntityTypeListProps } from '../entity-type-list';

export default {
  component: EntityTypeList,
  title: 'EntityTypeList',
} as Meta;

const Template: Story<EntityTypeListProps> = (args) => (
  <EntityTypeList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  types: [
    {
      id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
      name: 'System',
      description: 'A system type.',
      icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.78 96.4"><defs><style>.cls-1-system-color{fill:#7e7e7e;}.cls-2-system-color{fill:#3f4040;}</style></defs><polygon class="cls-1-system-color" points="99.78 96.4 99.78 37.2 78.11 37.2 78.11 84.93 71.2 84.93 71.2 17.07 52.36 17.07 52.36 0 33.52 0 33.52 84.93 26.62 84.93 26.62 50.95 0 70.74 0 96.4 99.78 96.4"/><rect class="cls-2-system-color" x="56.05" y="24.68" width="8.94" height="8.94" transform="translate(120.81 58.25) rotate(-180)"/><rect class="cls-2-system-color" x="40.1" y="24.68" width="8.94" height="8.94" transform="translate(88.92 58.25) rotate(-180)"/><rect class="cls-2-system-color" x="40.1" y="40.63" width="8.94" height="8.94" transform="translate(88.92 90.15) rotate(-180)"/><rect class="cls-2-system-color" x="84.6" y="43.29" width="8.94" height="8.94" transform="translate(177.91 95.47) rotate(-180)"/></svg>'
    },
    {
      id: 'ec5a7f2d-1794-4ef4-8e73-1c478953524f',
      name: 'Signal',
      description: 'A signal type.',
      icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.86 100"><defs><style>.cls-1-signal-color{fill:#323031;}.cls-2-signal-color{fill:#bf5555;}.cls-3-signal-color{fill:#c0b454;}.cls-4-signal-color{fill:#57bc82;}</style></defs><path class="cls-1-signal-color" d="M45.81,97A2.89,2.89,0,0,1,43,100H2.73A2.89,2.89,0,0,1,0,97V3A2.89,2.89,0,0,1,2.73,0H43a2.89,2.89,0,0,1,2.78,3Z" transform="translate(0.05 0)"/><circle class="cls-2-signal-color" cx="22.93" cy="21.61" r="12.13"/><circle class="cls-3-signal-color" cx="22.93" cy="50" r="12.13"/><circle class="cls-4-signal-color" cx="22.93" cy="79.38" r="12.13"/></svg>'
    }
  ],
  onDelete: action("[Entity Type] Delete"),
  onEdit: action("[Entity Type] Edit")
};

const sections = [
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
