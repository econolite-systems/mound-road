// SPDX-License-Identifier: MIT
// Copyright: 2023 Econolite Systems, Inc.
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import { AccountCircle, Logout, People } from '@mui/icons-material';
import { useAuth } from './providers/use-auth-data';
import { useAuthContext } from './providers/use-auth';
import { AuthProviderProps } from './providers/auth-context-interface';


export interface AccountMenuProps {
  authSettings: AuthProviderProps;
  isAdministrator: boolean;
}

export function AccountMenu({ authSettings, isAdministrator }: AccountMenuProps) {
  const auth = useAuthContext();
  const { fullName } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const manageSelf = () => {
    // https://keycloak.cosysdev.com/realms/mobility/account/
    const url = new URL(authSettings.authority as string);
    const href = url.href.replace(/\/$/, '');
    const accountUrl = href + '/account';
    window.open(accountUrl, '_blank')?.focus();
  };
  const launchIdentity = () => {
    // Convert https://keycloak.cosysdev.com/realms/mobility/ to https://keycloak.cosysdev.com/admin/mobility/console/#/mobility/users
    const url = new URL(authSettings.authority as string);
    const href = url.href.replace(/\/$/, '');
    const realm = href.substring(href.lastIndexOf('/') + 1);
    const usersUrl = url.origin + '/admin/' + realm + '/console/#/' + realm + '/users';
    window.open(usersUrl, '_blank')?.focus();
  };
  const handleSignOut = () => {
    auth.userManager.signoutRedirect();
  };
  return (
    <>
      <Tooltip title="Account Settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 2,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          color="inherit"
        >
          <AccountCircle />
          {fullName}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        }
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={manageSelf}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          {fullName}
        </MenuItem>
        {isAdministrator && <MenuItem onClick={launchIdentity}>
          <ListItemIcon>
            <People fontSize="small" />
          </ListItemIcon>
          Manage Users
        </MenuItem>}
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
