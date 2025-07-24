import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { PoolList } from './sections/list/Pool.list.tsx';
import { PoolWinner } from './sections/winner/Pool.winner.tsx';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import SectionList from '../common/SectionList.tsx';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '遊戲池一覽' },
  { key: 'winner', label: '得獎者挑選' },
];

export const Pool: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <PoolList />;
      case 'winner':
        return <PoolWinner />;
      default:
        return <div>All Pools</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="遊戲池" />
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
