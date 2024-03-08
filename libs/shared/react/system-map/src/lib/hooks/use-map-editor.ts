// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseMapEditor {
  count: number;
  increment: () => void;
}

export function useMapEditor(): UseMapEditor {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
}

export default useMapEditor;
