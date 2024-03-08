// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { createTheme, responsiveFontSizes, styled, Theme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect } from 'react';
import MainList from './main-list';
import { AccountMenu, AppMenu, AuthProviderProps } from '@econolite/shared-react-auth';
import { Outlet, Params, useMatches } from 'react-router-dom';
import { Tree } from '@econolite/shared/react/entities';
import Tooltip from '@mui/material/Tooltip';

const drawerWidth = 250;
const treeWidth = 350;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    overflow: 'auto',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

const TreeDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    width: treeWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(3),
    }),
  },
}));

export const heightMinusToolbar = (theme: Theme) => ({
  height: `calc(100vh - ${theme.mixins.toolbar.minHeight})`
});

export const navStyle = (theme: Theme) => ({
  height: '100%',
  display: 'flex',
  flexDirection: "column",
  alignContent: 'start'
});

export const treeContentStyle = (theme: Theme) => ({
  height: '100%',
  display: 'flex',
  flexDirection: "column",
  alignContent: 'start',
  overflow: 'auto'
});

export const horizontalDivider = (theme: Theme) => ({
  width: '1px', backgroundColor: theme.palette.grey[200]
});

let mdTheme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 1.167,
      letterSpacing: "-0.01562em"
    },
    h2: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: "-0.00833em"
    },
    h3: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: 1.167,
      letterSpacing: "0em"
    },
    h4: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.235,
      letterSpacing: "0.00735em"
    },
    h5: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 400,
      fontSize: '1.15rem',
      lineHeight: 1.334,
      letterSpacing: "0em"
    },
    h6: {
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontWeight: 500,
      fontSize: '1.05rem',
      lineHeight: 1.6,
      letterSpacing: "0.0075em"
    },
  }
});

mdTheme = responsiveFontSizes(mdTheme);

type RouteWithHandle<Handle extends string, Value> = {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: Record<Handle, Value>;
};

function isRecordWithKey<T extends string>(
  value: unknown,
  key: T,
): value is Record<T, unknown> {
  return !!value && typeof value === "object" && key in value;
}

function hasHandle<Handle extends string, Value>(
  handle: Handle,
  valuePredicate?: (v: unknown) => v is Value,
) {
  return (
    route:
      | {
        handle: unknown;
      }
      | RouteWithHandle<Handle, Value>,
  ): route is RouteWithHandle<Handle, Value> => {
    return (
      !!route.handle &&
      isRecordWithKey(route.handle, handle) &&
      (!valuePredicate ||
        (handle in route.handle && valuePredicate(route.handle[handle])))
    );
  };
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/* eslint-disable-next-line */
export interface ShellProps {
  authSettings: AuthProviderProps;
  isAdministrator: boolean;
  title?: string;
  children?: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Shell({ authSettings, isAdministrator, title, children }: ShellProps) {
  const matches = useMatches();
  const matchedTitle = matches.filter(hasHandle('title', isString))
    .map((match) => match.handle.title);

  const [open, setOpen] = useState(false);
  const [treeOpen, setTreeOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleTreeDrawer = () => {
    setTreeOpen(!treeOpen);
  };

  // store menu drawer state during current session
  useEffect(() => {
    const data = window.sessionStorage.getItem('DRAWER_STATE');
    data !== null ? setOpen(JSON.parse(data)) : setOpen(true);
  }, []);
  useEffect(() => {
    window.sessionStorage.setItem('DRAWER_STATE', JSON.stringify(open));
  }, [open]);

  // store menu drawer state during current session
  useEffect(() => {
    const data = window.sessionStorage.getItem('TREE_DRAWER_STATE');
    data !== null ? setTreeOpen(JSON.parse(data)) : setTreeOpen(true);
  }, []);
  useEffect(() => {
    window.sessionStorage.setItem('TREE_DRAWER_STATE', JSON.stringify(treeOpen));
  }, [treeOpen]);

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box
        sx={{ display: 'flex' }}
        id='menuBox'
      >

        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {matchedTitle}
            </Typography>
            <Tooltip title="Entity Tree">
              <IconButton color='inherit' onClick={toggleTreeDrawer}>
                <AccountTreeIcon color='inherit' />
              </IconButton>
            </Tooltip>
            <Box>
              <AppMenu />
            </Box>
            <Box>
              <AccountMenu authSettings={authSettings} isAdministrator={isAdministrator} />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <img style={{ height: 35 }} src='https://innovatemound.org/wp-content/uploads/2016/11/MoundIC_Header.png' />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={navStyle} component="nav">
            <MainList />
          </List>
        </Drawer>
        <Box sx={horizontalDivider} />
        <TreeDrawer variant="permanent" open={treeOpen}>
          <Toolbar />
          <Toolbar
            sx={{
              display: treeOpen ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
            }}
          >
            <IconButton onClick={toggleTreeDrawer}><AccountTreeIcon /></IconButton>
            <Typography variant='h5'>Entity Tree</Typography>
            <IconButton onClick={toggleTreeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Typography onClick={toggleTreeDrawer} variant='body1' sx={{
            display: treeOpen ? 'none' : 'flex',
            transform: 'rotate(90deg)',
            mt: 3,
            ":hover": {
              cursor: 'pointer'
            }
          }}>Entity Tree</Typography>
          <Box sx={(theme:Theme) => ({
            height: 'calc(100vh - 130px)',
            display: treeOpen ? 'flex' : 'none',
            flexDirection: "column",
            alignContent: 'start',
            overflow: 'auto'
            })}>
            <Tree />
          </Box>
        </TreeDrawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/* <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item xs={12} sm={7} md={5} lg={4} xl={3}>
              <Paper sx={{p: (theme: Theme) => theme.spacing(1), height: `calc(100vh - 64px)`, marginLeft: 1}}>
                <Tree />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5} md={7} lg={8} xl={9}> */}
          <Box sx={heightMinusToolbar}>
            {children}
            <Outlet />
          </Box>
          {/* </Grid>
          </Grid> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Shell;
