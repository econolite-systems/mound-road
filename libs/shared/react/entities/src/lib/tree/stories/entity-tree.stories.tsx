// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { Story, Meta } from '@storybook/react';
import { EntityTree, EntityTreeProps } from '../entity-tree';

export default {
  component: EntityTree,
  title: 'EntityTree',
} as Meta;

const Template: Story<EntityTreeProps> = (args) => <EntityTree {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  entities: [
    {
      instanceId: "00000000-0000-0000-0000-000000000000_3fa85f64-5717-4562-b3fc-2c963f66afa6",
      parent: "00000000-0000-0000-0000-000000000000",
      children: [
        {
          instanceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6_2dca42a7-d175-4637-8738-8cabc7b551df",
          parent: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          children: [],
          type: {
            id: "4cbc4cfa-5b47-4f42-acad-dd6f1d6bef2d",
            name: "Signal"
          },
          isCopy: false,
          isLeaf: false,
          description: "13 Mile Rd at Mound Rd",
          isDeleted: false,
          version: 1,
          name: "13 Mile Rd at Mound Rd",
          id: "2dca42a7-d175-4637-8738-8cabc7b551df"
        }
      ],
      type: {
        id: "a7432a6e-1569-42f9-bc7e-10397f65f6b7",
        name: "System"
      },
      isCopy: false,
      isLeaf: false,
      description: "Mound Road System",
      isDeleted: false,
      version: 1,
      name: "Mound Road",
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  loadChildren: (nodeId) => { 
    return Promise.resolve([
      {
        instanceId: "2dca42a7-d175-4637-8738-8cabc7b551df_e6bee362-2ebe-470c-b94c-5ed7b5902d0b",
        parent: "2dca42a7-d175-4637-8738-8cabc7b551df",
        children: [],
        type: {
          id: "8adb049d-2958-4210-af9c-412ec5c5726e",
          name: "Approach"
        },
        isCopy: false,
        isLeaf: true,
        description: "SB Thru",
        isDeleted: false,
        version: 1,
        name: "Approach",
        id: "e6bee362-2ebe-470c-b94c-5ed7b5902d0b"
      }
    ])
  }
};
