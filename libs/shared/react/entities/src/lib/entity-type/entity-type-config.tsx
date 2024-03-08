// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import EntityTypeList from './entity-type-list';
import EntityTypeFormDialog from './entity-type-form-dialog';
import { useCallback, useRef, useState } from 'react';
import { DeleteEntityTypeByIdApiArg, EntityType, EntityTypeAdd, EntityTypeSection, useDeleteEntityTypeByIdMutation, useGetEntityTypeQuery, useGetEntityTypeSectionsQuery, usePostEntityTypeMutation, usePutEntityTypeMutation } from '@econolite/shared/data-access/api-configuration';

export interface EntityTypeState {
  id: string;
  icon?: string;
  name: string;
  description?: string;
  sections: Array<EntityTypeSection>;
  children: Array<string>;
}

/* eslint-disable-next-line */
export interface EntityTypeConfigProps {
  
}

function ToAdd(entity: EntityTypeState): EntityTypeAdd {
  return {
    ...entity,
    children: [...entity.children]
  }
}

function ToUpdate(entity: EntityTypeState): EntityType {
  return {
    ...entity,
    children: [...entity.children]
  }
}

export const DefaultEntityType: EntityTypeState = {
  id: '',
  name: '',
  sections: [
    {
      name: "System Type",
      enabled: false
    },
    {
      name: "Active Days",
      enabled: false
    },
    {
      name: "Communication",
      enabled: false
    },
    {
      name: "Controller",
      enabled: false
    },
    {
      name: "Device Manager",
      enabled: false
    },
    {
      name: "Entity",
      enabled: false
    },
    {
      name: "FTP Credentials",
      enabled: false,
      sections: [
        {
          name: "Username",
          enabled: false
        },
        {
          name: "Password",
          enabled: false
        }
      ]
    },
    {
      name: "Id Mapping",
      enabled: false
    }
  ],
  // systemType: false,
  // activeDays: false,
  // communictation: false,
  // controller: false,
  // deviceManager: false,
  // ftpCredentials: false,
  // idMapping: false,
  // nameDescription: false,
  children: new Array<string>()
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export function EntityTypeConfig(props: EntityTypeConfigProps) {
  const dialogRef = useRef(null);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [currentType, setCurrentType] = useState<EntityTypeState>(DefaultEntityType);
  const { data: sections, isLoading: isLoadingSections, isError: isErrorSections} = useGetEntityTypeSectionsQuery();
  const { data, isLoading, refetch, isError } = useGetEntityTypeQuery();
  const [deleteType] = useDeleteEntityTypeByIdMutation();
  const [addType] = usePostEntityTypeMutation();
  const [editType] = usePutEntityTypeMutation();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const add = useCallback(() => {
    setCurrentType(DefaultEntityType);
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((id: string) => {
    setCurrentType(DefaultEntityType);
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [setCurrentType, setOpenForm, setIsAdd]);

  const deleteItem = useCallback(async (id: string) => {
    const results = await deleteType({ id: id } as DeleteEntityTypeByIdApiArg);
    if (results) refetch();
  }, []);

  const addItem = useCallback((data: EntityTypeState) => {
    setCurrentType(DefaultEntityType);
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    addType({ entityTypeAdd: ToAdd(data) }).then(() => refetch());
  }, [setOpenForm]);

  const editItem = useCallback((data: EntityTypeState) => {
    setCurrentType(DefaultEntityType);
    setOpenForm(false);
    setOpen(false);
    editType({ entityType: ToUpdate(data) }).then(() => refetch());
  }, [setCurrentType, setOpenForm]);

  // const data = [
  //   {
  //     id: '28c6d78e-1002-4b47-8b34-ff528610e21e',
  //     name: 'System',
  //     description: 'A system type.',
  //     icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.78 96.4"><defs><style>.cls-1-system-color{fill:#7e7e7e;}.cls-2-system-color{fill:#3f4040;}</style></defs><polygon class="cls-1-system-color" points="99.78 96.4 99.78 37.2 78.11 37.2 78.11 84.93 71.2 84.93 71.2 17.07 52.36 17.07 52.36 0 33.52 0 33.52 84.93 26.62 84.93 26.62 50.95 0 70.74 0 96.4 99.78 96.4"/><rect class="cls-2-system-color" x="56.05" y="24.68" width="8.94" height="8.94" transform="translate(120.81 58.25) rotate(-180)"/><rect class="cls-2-system-color" x="40.1" y="24.68" width="8.94" height="8.94" transform="translate(88.92 58.25) rotate(-180)"/><rect class="cls-2-system-color" x="40.1" y="40.63" width="8.94" height="8.94" transform="translate(88.92 90.15) rotate(-180)"/><rect class="cls-2-system-color" x="84.6" y="43.29" width="8.94" height="8.94" transform="translate(177.91 95.47) rotate(-180)"/></svg>'
  //   },
  //   {
  //     id: 'ec5a7f2d-1794-4ef4-8e73-1c478953524f',
  //     name: 'Signal',
  //     description: 'A signal type.',
  //     icon: '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.86 100"><defs><style>.cls-1-signal-color{fill:#323031;}.cls-2-signal-color{fill:#bf5555;}.cls-3-signal-color{fill:#c0b454;}.cls-4-signal-color{fill:#57bc82;}</style></defs><path class="cls-1-signal-color" d="M45.81,97A2.89,2.89,0,0,1,43,100H2.73A2.89,2.89,0,0,1,0,97V3A2.89,2.89,0,0,1,2.73,0H43a2.89,2.89,0,0,1,2.78,3Z" transform="translate(0.05 0)"/><circle class="cls-2-signal-color" cx="22.93" cy="21.61" r="12.13"/><circle class="cls-3-signal-color" cx="22.93" cy="50" r="12.13"/><circle class="cls-4-signal-color" cx="22.93" cy="79.38" r="12.13"/></svg>'
  //   }
  // ]

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant='h2'>Types</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {data &&
            <EntityTypeList types={data} onEdit={edit} onDelete={deleteItem}></EntityTypeList>
          }
          {((open && currentType && currentType.id !== '') || (open && isAdd)) &&
            <EntityTypeFormDialog data={currentType.id} isAdd={isAdd} open={openForm} handleClose={() => { setOpenForm(false) }} addEntity={addItem} editEntity={editItem} />
          }
        </Box>
        <Zoom
          key={1}
          in={true}
          timeout={transitionDuration}
          unmountOnExit
        >
          <Fab sx={fabStyle} aria-label='Add' color="primary" onClick={add}>
            <AddIcon />
          </Fab>
        </Zoom>
      </Box>
    </>
  );
}

export default EntityTypeConfig;
