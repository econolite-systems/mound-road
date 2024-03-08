// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Theme, styled } from '@mui/material/styles';
import { useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { CSSObject } from '@emotion/react';

const drawerHeight = 110;

const openedMixin = (theme: Theme): CSSObject => ({
  height: drawerHeight,
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowY: 'hidden',
  overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('height', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowY: 'hidden',
  overflowX: 'hidden',
  height: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    height: `calc(${theme.spacing(0)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) =>prop !== 'open'
})(({theme, open}) => ({
  height: drawerHeight,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

/* eslint-disable-next-line */
export interface DialogSlideDownProps {
  title: string,
  open: boolean,
  handleClose: () => void,
  actions?: React.ReactNode | React.ReactNodeArray
}

export function DialogSlideDown(props:DialogSlideDownProps & {children?: React.ReactNode | React.ReactNodeArray;}) {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

  return (
    <Box
    position={'relative'}
    className='noBackground'
    >
      <CssBaseline />
        <Drawer variant='permanent' open={open}
        PaperProps={{style: {
          position: 'absolute'
        }
        }
        }>
          {props.children}
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'left', columnGap: 0, mb: 0}}>
            <div className='reportButton'>
              {props.actions}
            </div>
          </Box>
        </Drawer>
      <Box sx={{display: 'contents'}}>
        <Tooltip title="Filter">
          <IconButton onClick={toggleDrawer}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DialogSlideDown;
