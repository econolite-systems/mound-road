// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CorridorConfigGlobal from './corridor-config-global';
import CorridorConfigList from './corridor-config-list';
import { useGetEntitiesTypesByTypeQuery } from '@econolite/shared/data-access/api-configuration';
import { FormInputDropdown } from '@econolite/react/forms';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { SelectChangeEvent } from '@mui/material/Select';

export function CorridorRuleConfig() {
  const [selectedCorridor, setSelectedCorridor] = useState<any>([]);
  const { data, isLoading, isFetching, refetch, isError } = useGetEntitiesTypesByTypeQuery({ type: 'corridor' });

  // if (!isLoading && isError) {
  //   refetch();
  // }

  useEffect(() => {
    if (data && data.length > 0 && (!selectedCorridor || selectedCorridor.length < 1)) {
      setSelectedCorridor(({ id: data[0].id, name: data[0].name }));
    }
  }, [data, setSelectedCorridor, selectedCorridor]);

  const isPageLoading = false;

  const schema = object({
    selectedCorridor: string()
  });
  const methods = useForm({ resolver: yupResolver(schema) });

  if (isLoading || isFetching) {
    return <div>Loading</div>;
  }

  const changeSelectedCorridor = (event: SelectChangeEvent) => {
    const selectedId = event.target.value as string;
    if (data) {
      const match = data.find(d => d.id === selectedId);
      if (match) {
        setSelectedCorridor(({ id: match.id, name: match.name }));
      }
    }
    [setSelectedCorridor, data]
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant="h2">Weather Responsive Corridor Rules</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <LinearProgress
            sx={{ visibility: isPageLoading ? null : 'hidden' }}
          />
          {(!data || data.length === 0) && <div>No corridors found</div>}
          {data && data.length > 0 &&
            <>
              <CorridorConfigGlobal />
              <FormProvider {...methods}>
                <form>
                  {data && data.length > 0 && (
                    <FormInputDropdown
                      name="selectedCorridor"
                      label="Corridor"
                      options={data.map((c) => ({ label: c.name, value: c.id }))}
                      control={methods.control}
                      defaultValue={data[0].id}
                      onChangeOverride={changeSelectedCorridor}
                    />
                  )}
                </form>
              </FormProvider>
            </>
          }
          {selectedCorridor && selectedCorridor.name && (
            <Box key={selectedCorridor.id}>
              <Box sx={{ py: 3 }}>
                <Typography variant="h3">{selectedCorridor.name}</Typography>
              </Box>

              <CorridorConfigList selectedCorridor={selectedCorridor.id} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CorridorRuleConfig;
