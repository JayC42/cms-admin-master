import { ListItem, ListItemText, Drawer, List } from '@mui/material';
import React, { useState } from 'react';
import { AddUser } from './Settings.user.add.tsx';
import { SettingsUserList } from './Settings.user.list.tsx';
import { EditUser } from './Settings.user.edit.tsx';
import { SettingsRoleList } from './Settings.role.list.tsx';
import { SettingsConfigList } from './Settings.config.tsx';
import { SettingsBanner } from './Settings.banner.tsx';
import {
  canvas,
  fullScreenAbsolute,
  sectionBase,
  sidebarListItem,
  sidebarMargin,
} from '../componentStyles.ts';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '所有用户' },
  { key: 'add', label: '添加新用户' },
  { key: 'role', label: '權限' },
  { key: 'config', label: '配置' },
  { key: 'banner', label: '公告' },
];

export const Settings: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');
  const [selectedId, setSelectedId] = useState('');

  const handleEdit = (userId: string) => {
    setSelectedId(userId);
    setSelectedSelection('edit');
  };

  const handleEditCompleted = () => {
    setSelectedSelection('all');
  };

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <SettingsUserList onEdit={handleEdit} />;
      case 'add':
        return <AddUser onClose={handleEditCompleted} />;
      case 'edit':
        return <EditUser userId={selectedId} onClose={handleEditCompleted} />;
      case 'role':
        return <SettingsRoleList />;
      case 'config':
        return <SettingsConfigList />;
      case 'banner':
        return <SettingsBanner />;
      default:
        return <div>All Settings</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="设置" />
        <List style={sidebarMargin}>
          {SECTION.map((section) => (
            <ListItem
              style={sidebarListItem}
              button
              key={section.key}
              onClick={() => setSelectedSelection(section.key)}
            >
              <ListItemText primary={section.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div>
        <div style={sectionBase}>
          <div style={canvas}>{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
};
