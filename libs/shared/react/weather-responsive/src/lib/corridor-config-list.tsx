// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useConfirmModal } from '@econolite/modal';
import { DeleteActionConfirmModal } from '@econolite/data-grid';
import { IsContributor, IsAdministrator } from '@econolite/shared-react-auth';
import { DeleteWeatherResponsiveConfigByConfigIdApiArg, WeatherResponsiveConfiguration, useDeleteWeatherResponsiveConfigByConfigIdMutation, useGetWeatherResponsiveConfigByCorridorIdQuery, usePostWeatherResponsiveConfigMutation, usePutWeatherResponsiveConfigMutation, usePutWeatherResponsiveConfigOrderMutation } from '@econolite/shared/data-access/api-configuration';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { WeatherResponsiveCorridorConfigState } from './corridor-config-state';
import CorridorConfigDialog from './corridor-config-dialog';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableItem } from '@econolite/react/forms';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface CorridorConfigListProps {
  selectedCorridor: string | undefined;
}

export type SortableCorridorConfig = {
  id: string;
  name?: string | null;
  isEnabled?: boolean;
  enableEdaptive?: boolean;
  adjustSpeed?: boolean;
  adjustTimingPlan?: boolean;
};

export function CorridorConfigList(args: CorridorConfigListProps) {
  const { isShowing, toggle, id, setId, type, setType, name, setName, setCorridorId } = useConfirmModal();
  // data: GetWeatherResponsiveConfigByCorridorIdApiResponse: WeatherResponsiveConfiguration[]
  const { data, isLoading, isFetching, refetch, isError } = useGetWeatherResponsiveConfigByCorridorIdQuery({ corridorId: args.selectedCorridor || '' });

  if (!isLoading && isError) {
    if (args && args.selectedCorridor) {
      refetch();
    }
  }

  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfig] = useDeleteWeatherResponsiveConfigByConfigIdMutation();
  const [addConfig] = usePostWeatherResponsiveConfigMutation();
  const [editConfig] = usePutWeatherResponsiveConfigMutation();
  const [currentConfig, setCurrentConfig] = useState({} as WeatherResponsiveConfiguration);
  const [currentConfigOrder, setCurrentConfigOrder] = useState({} as SortableCorridorConfig[]);
  const [setConfigOrderQuery] = usePutWeatherResponsiveConfigOrderMutation();

  const isContributor = IsContributor();
  const isAdministrator = IsAdministrator();

  useEffect(() => {
    if (data) {
      const mappableData = data as WeatherResponsiveConfiguration[];
      const convertedData = mappableData ? mappableData.map(d => {
        return {
          id: d.id || '',
          name: d.name,
          isEnabled: d.isEnabled,
          enableEdaptive: d.enableEdaptive,
          adjustSpeed: d.adjustSpeed,
          adjustTimingPlan: d.adjustTimingPlan
        };
      }) : [];
      setCurrentConfigOrder(convertedData);
    }
  }, [data, setCurrentConfigOrder]);

  const add = useCallback(() => {
    setCurrentConfig({ corridorId: args.selectedCorridor });
    setIsAdd(true);
    setOpen(true);
    setOpenForm(true);
  }, [setOpenForm, setIsAdd]);

  const edit = useCallback((configId: string) => {
    setCurrentConfig({ corridorId: args.selectedCorridor, id: configId });
    setIsAdd(false);
    setOpen(true);
    setOpenForm(true);
  }, [setCurrentConfig, setOpenForm, setIsAdd, args]);

  const deleteItem = useCallback(async (configId: string) => {
    const results = await deleteConfig({ configId: configId } as DeleteWeatherResponsiveConfigByConfigIdApiArg);
    if (results && args && args.selectedCorridor)
      refetch();
  }, []);

  function ToConfig(selectedCorridor: string, form: WeatherResponsiveCorridorConfigState): WeatherResponsiveConfiguration {
    return {
      id: form.id,
      corridorId: selectedCorridor,
      priority: form.priority,
      name: form.name,
      isEnabled: form.isEnabled,
      hasPrecipitation: form.hasPrecipitation,
      temperatureThreshold: form.temperatureThreshold,
      roadConditions: form.roadConditions,
      minimumConfidence: form.minimumConfidence,
      enableEdaptive: form.enableEdaptive,
      edaptiveConfigurationId: form.edaptiveConfigurationId ? parseInt(form.edaptiveConfigurationId) : undefined,
      adjustSpeed: form.adjustSpeed,
      speedAdjustment: form.speedAdjustment,
      speedOverrideType: form.speedOverrideType,
      adjustTimingPlan: form.adjustTimingPlan,
      timingPlan: form.timingPlan,
    }
  }

  const addItem = useCallback((formData: WeatherResponsiveCorridorConfigState) => {
    //clear the current ConfigId
    const formAsConfig = ToConfig(args.selectedCorridor || '', formData);
    setCurrentConfig({ corridorId: "", id: undefined });
    setOpenForm(false);
    setOpen(false);
    setIsAdd(false);
    addConfig({ weatherResponsiveConfiguration: formAsConfig }).then(() => refetch());
  }, [setOpenForm, addConfig, refetch, args]);

  const editItem = useCallback((formData: WeatherResponsiveCorridorConfigState) => {
    //clear the current ConfigId
    setCurrentConfig({ corridorId: "", id: undefined });
    setOpenForm(false);
    setOpen(false);
    editConfig({ weatherResponsiveConfiguration: ToConfig(args.selectedCorridor || '', formData) }).then(() => refetch());
  }, [setCurrentConfig, setOpenForm, editConfig, refetch, args]);

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const deleteConfigCallback = useCallback((id: string, name: string) => {
    if (args && args.selectedCorridor) {
      setCorridorId(args.selectedCorridor);
      setType('Weather Responsive');
      setId(id);
      setName(name);
    }
  },
    [setCorridorId, setId, args]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id && currentConfigOrder) {
      const oldIndex = currentConfigOrder.map(d => d.id).indexOf(active.id.toString());
      const newIndex = currentConfigOrder.map(d => d.id).indexOf(over.id.toString());

      const reorderedData = arrayMove(currentConfigOrder, oldIndex, newIndex);

      setCurrentConfigOrder(reorderedData);
      setConfigOrderQuery(({
        weatherResponsiveConfigurationOrder: {
          corridorId: args.selectedCorridor,
          configurationOrder: reorderedData.map(d => d.id)
        }
      }));
    }
    [currentConfigOrder, args.selectedCorridor]
  }

  return (isLoading ? <p>Loading selected corridor</p> :
    <>
      <Box>
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {(!currentConfigOrder || currentConfigOrder.length < 1) && <div>No configurations created yet.</div>}
          {currentConfigOrder && currentConfigOrder.length > 0 && <SortableContext
            items={currentConfigOrder}
            strategy={verticalListSortingStrategy}
          >
            {currentConfigOrder.map((config, index) => (
              <SortableItem before key={config.id} id={config?.id?.toString() ?? ''}>
                <Grid container spacing={2}>
                  <Grid container item sx={{ alignItems: 'center', gap: 1 }}>
                    <TextField
                      id={`config.${index}.name`}
                      label="Name"
                      type="string"
                      size="small"
                      value={config.name!}
                      variant="outlined"
                      aria-readonly="true"
                    />
                    <FormControlLabel
                      label="Is Enabled"
                      control={<Checkbox checked={config.isEnabled} readOnly />}
                    />
                    <FormControlLabel
                      label="Enable Edaptive"
                      control={<Checkbox checked={config.enableEdaptive} readOnly />}
                    />
                    <FormControlLabel
                      label="Adjust Speed"
                      control={<Checkbox checked={config.adjustSpeed} readOnly />}
                    />
                    <FormControlLabel
                      label="Adjust Timing Plan"
                      control={<Checkbox checked={config.adjustTimingPlan} readOnly />}
                    />
                  </Grid>
                </Grid>
                {isContributor && <IconButton sx={{ width: 8, height: 8 }} aria-label='edit config' size='large' onClick={() => edit(config.id.toString())}><EditIcon /></IconButton>}
                {isAdministrator && <IconButton sx={{ width: 8, height: 8 }} aria-label='delete config' size='large' onClick={() => deleteConfigCallback(config.id.toString(), config.name!)}><DeleteIcon /></IconButton>}
              </SortableItem>
            ))}
          </SortableContext>}
        </DndContext>
      </Box>
      <DeleteActionConfirmModal
        isShowing={isShowing}
        toggle={toggle}
        id={id}
        setId={setId}
        type={type}
        setType={setType}
        name={name}
        setName={setName}
        onDelete={deleteItem}
      />
      {args && args.selectedCorridor && <Zoom key={1} timeout={transitionDuration} in unmountOnExit>
        <Fab sx={fabStyle} aria-label="Add" color="primary" onClick={add} disabled={isLoading}>
          <AddIcon />
        </Fab>
      </Zoom>}
      {(open && currentConfig && (currentConfig.id || isAdd) && currentConfig.corridorId) &&
        <CorridorConfigDialog
          id={currentConfig.id}
          corridorId={currentConfig.corridorId}
          isAdd={isAdd}
          open={openForm}
          handleClose={() => { setOpenForm(false) }}
          addConfig={addItem}
          editConfig={editItem} />
      }
    </>
  );
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

export default CorridorConfigList;
