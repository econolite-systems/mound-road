// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.

//Taken from: https://mui.com/material-ui/react-tabs/


export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };;
}

export default a11yProps;
