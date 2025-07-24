import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, IconButton, styled, CSSObject, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AppShell.module.scss';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import { ACCESS_TOKEN, PERMISSIONS, REFRESH_TOKEN } from '../../utils/LocalStorage.helper.ts';
import NavigationMenu from './NavigationMenu.tsx';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AppShell: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPermissions = localStorage.getItem(PERMISSIONS);
    if (storedPermissions) {
      const permissions = JSON.parse(storedPermissions);
      console.log(permissions);
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) {
    return <Navigate to="/login" replace />;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    if (path === '/logout') {
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN);
      navigate('/login');
    }
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={styles.shell}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={styles.drawerButton}
          disableRipple
          disableFocusRipple
        >
          <MenuIcon />
        </IconButton>
        <Drawer variant="permanent" open={drawerOpen}>
          <Toolbar />
          <NavigationMenu
            permissions={permissions}
            drawerOpen={drawerOpen}
            handleNavigation={handleNavigation}
          />
        </Drawer>
        <Box component="main" className={styles.mainContent}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppShell;
