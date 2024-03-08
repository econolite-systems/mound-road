// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';

export function useTravelersMessages() {
  const messages = useSelector((state: any) => state.messages.messages);

  return { messages };
}

export default useTravelersMessages;
