import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';
import { Drawer } from '@mui/material';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import SectionList from '../common/SectionList.tsx';
import React, { useState } from 'react';
import { OfflineEventInfo } from './OfflineEvent.info.tsx';

const SECTION: KeyLabelPair[] = [{ key: 'info', label: '活動信息' }];

export const OfflineEvent = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('info');

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'info':
        return <OfflineEventInfo />;
      default:
        return <div>Offline event</div>;
    }
  };
  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="線下活動" />
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
