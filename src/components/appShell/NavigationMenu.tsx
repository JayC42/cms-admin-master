import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import RedeemIcon from '@mui/icons-material/Redeem';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventIcon from '@mui/icons-material/Event';

const navigationItems = [
  { name: '主頁', icon: <DashboardIcon />, path: '/app/dashboard', permission: null },
  { name: '禮品', icon: <RedeemIcon />, path: '/app/gift', permission: 'reward' },
  { name: '游戏池', icon: <VideogameAssetIcon />, path: '/app/pool', permission: 'pool' },
  { name: '庫存', icon: <InventoryIcon />, path: '/app/inventory', permission: 'inventory' },
  { name: '赢家', icon: <EmojiEventsIcon />, path: '/app/winner', permission: 'winner' },
  { name: '设置', icon: <SettingsIcon />, path: '/app/settings', permission: null },
  {
    name: '通知',
    icon: <NotificationImportantIcon />,
    path: '/app/notification',
    permission: 'notification',
  },
  { name: '線下活動', icon: <EventIcon />, path: '/app/offline-event', permission: null },
  { name: '登出', icon: <LogoutIcon />, path: '/logout', permission: null },
];

interface NavigationMenuProps {
  permissions: string[];
  drawerOpen: boolean;
  handleNavigation: (path: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  permissions,
  drawerOpen,
  handleNavigation,
}) => {
  const filteredNavigationItems = navigationItems.filter(
    (item) => !item.permission || permissions.includes(item.permission),
  );

  return (
    <List>
      {filteredNavigationItems.map((item) => (
        <ListItem
          key={item.name}
          onClick={() => handleNavigation(item.path)}
          disablePadding
          sx={{ display: 'block' }}
        >
          <ListItemButton
            sx={{
              maxHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: drawerOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationMenu;
