// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useState } from 'react';

export interface UseModal {
  isShowing: boolean,
  toggle: () => void
}

export const useModal = (): UseModal =>  {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing: isShowing,
    toggle
  }
};

export default useModal;
