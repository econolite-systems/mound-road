// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import { GridActionsColDef, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getAddColumnHeader, getCancelDeleteActions, getEditDeleteActions, IActionColumn, IAddActionColumn } from './actions';
import { getToggleColumn, IToggleColumn } from './toggleColumn';
import { ILinkColumn, getLinkColumn } from './linkColumn';
import { getHealthStatusValue } from './healthStatusIcon';
import { getDateTimeInfoValue } from './dateTimeInfo';

export const idColumn = ({ field = 'id', headerName = 'Id', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const priorityColumn = ({ field = 'id', headerName = 'Priority', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const numberColumn = ({ field = 'dmId', headerName = 'Number', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const typeColumn = ({ field = 'type', headerName = 'Type', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const entityTypeColumn = ({ field = 'type.name', headerName = 'Type', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const channelTypeColumn = ({ field = 'channelType', headerName = 'Type', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const nameColumn = ({ field = 'name', headerName = 'Name', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: 1
  }
);

export const descriptionColumn = ({ field = 'description', headerName = 'Description', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const subTypeColumn = ({ field = 'subType', headerName = 'SubType', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const portColumn = ({ field = 'port', headerName = 'Port', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const messageColumn = ({ field = 'message', headerName = 'Message', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const itisCodeColumn = ({ field = 'code', headerName = 'ITIS Code', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const itisColumn = ({ field = 'itis', headerName = 'ITIS Code', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const stringColumn = ({ field = 'string', headerName = 'String', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const locationColumn = ({ field = 'location', headerName = 'Location(s)', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const primaryPollRateColumn = ({ field = 'primaryPollRate', headerName = 'Primary Poll Rate', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const deviceTimeoutColumn = ({ field = 'deviceTimeout', headerName = 'Device Timeout', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const activatedTimestampColumn = ({ field = 'activatedTimestamp', headerName = 'Activated Timestamp', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const messageTypeColumn = ({ field = 'type', headerName = 'Message Type', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const messageRateColumn = ({ field = 'messageCount', headerName = 'Rate of Ingest', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const corridorNameColumn = ({ field = 'corridorName', headerName = 'Corridor Name', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const dataSourceColumn = ({ field = 'source', headerName = 'Data Source', flex = 0.5 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex
  }
);

export const linkColumn = (props: ILinkColumn): GridColDef => (
  {
    field: props.field,
    headerName: props.headerName,
    renderCell: getLinkColumn(props)
  }
);

export const enabledColumn = ({ field = 'enabled', headerName = 'Enabled', readonly = false, onClick }: IToggleColumn): GridColDef => (
  {
    field,
    headerName,
    renderCell: getToggleColumn({ field, headerName, readonly, onClick })
  }
);

export const disableColumn = ({ field = 'disable', headerName = 'Disabled', readonly = false, onClick }: IToggleColumn): GridColDef => (
  {
    field,
    headerName,
    renderCell: getToggleColumn({ field, headerName, readonly, onClick })
  }
);

export const cancelDeleteActionColumn = (props: IActionColumn, isContributor: boolean, isAdministrator: boolean): GridActionsColDef => (
  {
    field: 'actions',
    type: 'actions',
    getActions: getCancelDeleteActions(props, isContributor, isAdministrator)
  }
);

export const editDeleteActionColumn = (props: IActionColumn, isContributor: boolean, isAdministrator: boolean): GridActionsColDef => (
  {
    field: 'actions',
    type: 'actions',
    getActions: getEditDeleteActions(props, isContributor, isAdministrator)
  }
);

export const addEditDeleteActionColumn = (props: IAddActionColumn, isContributor: boolean, isAdministrator: boolean): GridActionsColDef => (
  {
    field: 'actions',
    type: 'actions',
    getActions: getEditDeleteActions(props, isContributor, isAdministrator),
    renderHeader: getAddColumnHeader(props, isContributor)
  }
);

export const svgIconColumn = ({ field = 'icon', headerName = '', width = '16px', height = '16px' } = {}) => (
  {
    field: field,
    headerName: headerName,
    width: 24,
    renderCell: (params: GridRenderCellParams) => (
      <Box
        component="img"
        sx={{ width: width, height: height }}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(params.value)}`}
        alt=""
      />
    ),
  }
);

export const healthStatusColumn = ({ field = 'status', headerName = 'Health', width = '16px', height = '16px', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex,
    renderCell: getHealthStatusValue(width, height),
  }
);

export const dateTimeColumn = ({ field = 'time', headerName = 'Time', flex = 1 } = {}) => (
  {
    field: field,
    headerName: headerName,
    flex: flex,
    renderCell: getDateTimeInfoValue(),
  }
);
