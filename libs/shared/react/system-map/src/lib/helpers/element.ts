// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { LeafletContextInterface, LeafletElement } from '@react-leaflet/core'

export function createElementObject<T, C = any>(
  instance: T,
  context: LeafletContextInterface,
  container?: C | null,
): LeafletElement<T, C> {
  return Object.freeze({ instance, context, container })
}
