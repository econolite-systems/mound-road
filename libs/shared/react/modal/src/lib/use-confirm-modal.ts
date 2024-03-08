// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useCallback, useState } from 'react';

export interface UseConfirmModal {
  isShowing: boolean;
  toggle: () => void;
  id: string | number;
  setId: (value:string|number) => void;
  type: string;
  setType: (value:string) => void;
  name: string;
  setName: (value:string) => void;
  message: string;
  setMessage: (value:string) => void;
  location: string;
  setLocation: (value:string) => void;
  corridorId: string;
  setCorridorId: (value:string) => void;
}

export const useConfirmModal = (): UseConfirmModal => {
  const [isShowing, setIsShowing] = useState(false);
  const [type, setType] = useState<string>('');
  const [id, setId] = useState<string | number>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [corridorId, setCorridorId] = useState<string>('');

  const toggle = useCallback(function () {
    setIsShowing(!isShowing);
  }, [setIsShowing, isShowing]);

  const setIdCallback = useCallback(function (value: string | number) {
    setId(value);
  }, [setId]);

  const setTypeCallback = useCallback(function (value: string) {
    setType(value);
  }, [setType]);

  const setNameCallback = useCallback(function (value: string) {
    setName(value);
  }, [setName]);

  const setMessageCallback = useCallback(function (value: string) {
    setMessage(value);
  }, [setMessage]);

  const setLocationCallback = useCallback(function (value: string) {
    setLocation(value);
  }, [setLocation]);

  const setCorridorIdCallback = useCallback(function (value: string) {
    setCorridorId(value);
  }, [setCorridorId]);

  return { isShowing, toggle, id, setId: setIdCallback, type, setType: setTypeCallback, name, setName: setNameCallback,
  message, setMessage: setMessageCallback, location, setLocation: setLocationCallback,
  corridorId, setCorridorId: setCorridorIdCallback};
};

export default useConfirmModal;
