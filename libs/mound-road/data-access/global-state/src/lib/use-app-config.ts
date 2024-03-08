// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfig } from './features/configSlice';
import { RootState } from './store';

export function useAppConfig() {
  const isLoading = useSelector((state: RootState) => state.config.isLoading);
  const error = useSelector((state: RootState) => state.config.error);
  const config = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const loadConfig = (url: string) => {
      dispatch(fetchConfig(url));
  };

  return { config, isLoading, error, loadConfig };
}

export default useAppConfig;
