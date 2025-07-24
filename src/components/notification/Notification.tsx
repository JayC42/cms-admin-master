import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';
import React, { useState } from 'react';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import { Drawer } from '@mui/material';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import { NotificationList } from './sections/Notification.list.tsx';
import { AddNotification } from './sections/Notification.add.tsx';
import { NotificationTypeList } from './sections/NotificationType.list.tsx';
import SectionList from '../common/SectionList.tsx';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '通知一覽' },
  { key: 'create', label: '新增通知' },
  { key: 'type', label: '通知類型' },
];

export const Notification: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');

  const handleEditCompleted = () => {
    setSelectedSelection('all');
  };

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <NotificationList />;
      case 'create':
        return <AddNotification onClose={handleEditCompleted} />;
      case 'type':
        return <NotificationTypeList />;
      default:
        return <div>All Notifications</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title={'通知'}></ComponentToolbar>
        <SectionList sections={SECTION} onItemSelected={setSelectedSelection} />
      </Drawer>
      <div>
        <div style={sectionBase}>
          <div style={canvas}>{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
};
