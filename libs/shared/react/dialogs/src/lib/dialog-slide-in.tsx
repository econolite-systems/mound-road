// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { forwardRef } from 'react';
import { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

// resize forms dependent on screen size
const dialogTheme = (theme:Theme) => ({
  [theme.breakpoints.down('md')]: {
    width: 1.0
  },
  [theme.breakpoints.between('md', 'xl')]: {
    width: `calc(100vw * 0.5)`,
    left: 'unset !important'
  },
  [theme.breakpoints.up('xl')]: {
    width: `calc(100vw * 0.5)`,
    left: 'unset !important'
  }
});

/* eslint-disable-next-line */
export interface DialogSlideInProps {
  title: string,
  open: boolean,
  handleClose: () => void,
  actions?: React.ReactNode | React.ReactNodeArray
}

export function DialogSlideIn(props:DialogSlideInProps & {children?: React.ReactNode | React.ReactNodeArray;}) {
  return (

    <Dialog
      fullScreen
      sx={dialogTheme}
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <Box>
      <AppBar
        sx={dialogTheme}
      >
        <Toolbar>
        <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

        <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.title}
          </Typography>
          <Box>
            {props.actions}
          </Box>
          </Toolbar>

      </AppBar>
      {/* The toolbar here is used for spacing. */}
      <Toolbar sx={{mb: 2}}/>
      <Container>
        {props.children}
      </Container>
      </Box>
    </Dialog>
  );
};

export default DialogSlideIn;
