// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { string } from 'yup';

export const ipv4 = string().matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
  message: 'Invalid IP address',
  excludeEmptyString: true
}).test('ip', 'Invalid IP address', value => {
  return value === undefined || value.trim() === ''
    ? true
    : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
});

export const ipv4No0s = string().matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
  message: 'Invalid IP address',
  excludeEmptyString: true
})
  .test('ip', 'IP must not be 0.0.0.0', value => {
    return value === '0.0.0.0'
      ? false
      : true
  })
  .test('ip', 'Invalid IP address', value => {
    return value === undefined || value.trim() === ''
      ? true
      : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
  });
