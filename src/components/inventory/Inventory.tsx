import { KeyLabelPair } from '../../utils/KeyLabelPair';
import React, { useState } from 'react';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import { Drawer } from '@mui/material';
import { InventoryList } from './sections/list/Inventory.list.tsx';
import { InventoryHistoryList } from './sections/history/Inventory.history.tsx';
import SectionList from '../common/SectionList.tsx';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '禮品庫存一覽' },
  { key: 'history', label: '禮品庫存紀錄' },
];

export const Inventory: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');

  const renderSelectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <InventoryList />;
      case 'history':
        return <InventoryHistoryList />;
      default:
        return <div>All inventory</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="庫存" />
        <SectionList sections={SECTION} onItemSelected={setSelectedSelection} />
      </Drawer>
      <div>
        <div style={sectionBase}>
          <div style={canvas}>{renderSelectionContent()}</div>
        </div>
      </div>
    </div>
  );
};
