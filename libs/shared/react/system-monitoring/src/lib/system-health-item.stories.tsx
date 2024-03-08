// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import type { Meta } from '@storybook/react';
import { SystemHealthItem } from './system-health-item';

const Story: Meta<typeof SystemHealthItem> = {
  component: SystemHealthItem,
  title: 'SystemHealthItem',
};
export default Story;

export const Primary = {
  args: {
    data: {
      "id": 1,
      "status": "Unhealthy",
      "onStateFrom": "2023-06-20T12:16:27.1056213-06:00",
      "lastExecuted": "2023-06-20T12:17:27.2093899-06:00",
      "uri": "http://localhost:5255/healthz",
      "name": "System Health Service",
      "discoveryService": null,
      "entries": [
          {
              "id": 1,
              "name": "process_allocated_memory",
              "status": "Healthy",
              "description": "Allocated megabytes in memory: 28 mb",
              "duration": "00:00:00.0000202",
              "tags": [
                  "memory"
              ]
          },
          {
              "id": 2,
              "name": "random",
              "status": "Unhealthy",
              "description": null,
              "duration": "00:00:00.0000109",
              "tags": []
          },
          {
              "id": 3,
              "name": "mongodb",
              "status": "Healthy",
              "description": null,
              "duration": "00:00:00.0223863",
              "tags": []
          }
      ],
      "history": [
          {
              "id": 39,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T12:16:27.1056213-06:00"
          },
          {
              "id": 38,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T12:07:26.0668768-06:00"
          },
          {
              "id": 37,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T12:00:25.0964123-06:00"
          },
          {
              "id": 36,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T11:52:24.0590065-06:00"
          },
          {
              "id": 35,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T11:45:23.0517756-06:00"
          },
          {
              "id": 34,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T11:37:22.0859674-06:00"
          },
          {
              "id": 33,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T11:29:21.1204383-06:00"
          },
          {
              "id": 32,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T11:20:20.0598841-06:00"
          },
          {
              "id": 31,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T11:15:19.2120669-06:00"
          },
          {
              "id": 30,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T11:06:18.0505013-06:00"
          },
          {
              "id": 29,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T10:58:17.1003027-06:00"
          },
          {
              "id": 28,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T10:51:16.0967943-06:00"
          },
          {
              "id": 27,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T10:44:15.0542178-06:00"
          },
          {
              "id": 26,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T10:39:14.2869527-06:00"
          },
          {
              "id": 25,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T10:31:13.0804378-06:00"
          },
          {
              "id": 24,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T10:25:12.1735939-06:00"
          },
          {
              "id": 23,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T10:18:11.0636541-06:00"
          },
          {
              "id": 22,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T10:10:10.0302887-06:00"
          },
          {
              "id": 21,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T10:03:09.1030739-06:00"
          },
          {
              "id": 20,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T09:54:08.0872713-06:00"
          },
          {
              "id": 19,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T09:47:07.0337233-06:00"
          },
          {
              "id": 18,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T09:40:06.1289503-06:00"
          },
          {
              "id": 17,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T09:34:05.1017141-06:00"
          },
          {
              "id": 16,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T09:27:04.0965816-06:00"
          },
          {
              "id": 15,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T09:20:03.0908758-06:00"
          },
          {
              "id": 14,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T09:13:02.0706767-06:00"
          },
          {
              "id": 13,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T09:07:01.1475701-06:00"
          },
          {
              "id": 12,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T09:00:00.1110521-06:00"
          },
          {
              "id": 11,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T08:54:59.1109529-06:00"
          },
          {
              "id": 10,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T08:47:58.2106815-06:00"
          },
          {
              "id": 9,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T08:40:57.122-06:00"
          },
          {
              "id": 8,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T08:31:56.0342218-06:00"
          },
          {
              "id": 7,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T08:25:55.1075731-06:00"
          },
          {
              "id": 6,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T08:19:54.2966471-06:00"
          },
          {
              "id": 5,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T08:11:53.0938283-06:00"
          },
          {
              "id": 4,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T08:04:52.0987596-06:00"
          },
          {
              "id": 3,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T07:58:51.0777566-06:00"
          },
          {
              "id": 2,
              "name": "random",
              "description": null,
              "status": "Healthy",
              "on": "2023-06-20T07:50:50.0903634-06:00"
          },
          {
              "id": 1,
              "name": "random",
              "description": null,
              "status": "Unhealthy",
              "on": "2023-06-20T07:49:49.9501616-06:00"
          }
      ]
  }
  },
};
