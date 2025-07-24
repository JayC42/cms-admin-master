import React, { useState } from 'react';
import { Drawer } from '@mui/material';
import { WinnerList } from './Winner.list.tsx';
import { WinnerRedeem } from './Winner.redeem.tsx';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import SectionList from '../common/SectionList.tsx';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '赢家一覽' },
  { key: 'redeem', label: '獎品兌換' },
];

export const Winner: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <WinnerList />;
      case 'redeem':
        return <WinnerRedeem />;
      default:
        return <div>All Pools</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="得獎者" />
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
