// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
export function SetLocalDate(local: Date | string) {
    const getUTCDate = new Date(local);
    const getLocaldate = getUTCDate.toLocaleString();
    return getLocaldate;
  }

export default SetLocalDate;
