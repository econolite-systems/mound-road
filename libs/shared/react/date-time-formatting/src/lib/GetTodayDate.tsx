// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
export function GetTodayDate() {
  const today = new Date();
  return new Date(today.toDateString());
}

export default GetTodayDate;
