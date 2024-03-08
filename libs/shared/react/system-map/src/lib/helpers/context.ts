// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { LeafletContextInterface } from '@react-leaflet/core'

export function extendContext(
  source: LeafletContextInterface,
  extra: Partial<LeafletContextInterface>,
): LeafletContextInterface {
  return Object.freeze({ ...source, ...extra })
}
