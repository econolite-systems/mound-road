// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
export function GetYesterdayDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(yesterday.toDateString());
}

export default GetYesterdayDate;
