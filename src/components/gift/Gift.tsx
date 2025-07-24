import React, { useState } from 'react';
import { canvas, fullScreenAbsolute, sectionBase } from '../componentStyles.ts';
import { Drawer } from '@mui/material';
import SectionList from '../common/SectionList.tsx';
import { GiftList } from './sections/Gift.list.tsx';
import { GiftFeatures } from './sections/Gift.feature.tsx';
import { GiftImports } from './sections/Gift.import.tsx';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';
import ComponentToolbar from '../common/ComponentToolbar.tsx';
import { GiftAddOrEdit } from './sections/Gift.addoredit.tsx';

const SECTION: KeyLabelPair[] = [
  { key: 'all', label: '所有礼品' },
  { key: 'add', label: '添加礼品' },
  { key: 'feature', label: '重点礼品' },
  { key: 'import', label: '导入' },
];

export const Gift: React.FC = () => {
  const [selectedSelection, setSelectedSelection] = useState<string>('all');
  const [selectedId, setSelectedId] = useState('');

  const handleEdit = (rewardId: string) => {
    setSelectedId(rewardId);
    setSelectedSelection('edit');
  };

  const handleEditCompleted = () => {
    setSelectedSelection('all');
  };

  const renderSectionContent = () => {
    switch (selectedSelection) {
      case 'all':
        return <GiftList onEdit={handleEdit} />;
      case 'add':
        return <GiftAddOrEdit onClose={handleEditCompleted} />;
      case 'edit':
        return <GiftAddOrEdit giftId={selectedId} onClose={handleEditCompleted} />;
      case 'feature':
        return <GiftFeatures onClose={handleEditCompleted} />;
      case 'import':
        return <GiftImports onClose={handleEditCompleted} />;
      default:
        return <div>All Rewards</div>;
    }
  };

  return (
    <div style={fullScreenAbsolute}>
      <Drawer variant="permanent" anchor="left">
        <ComponentToolbar title="禮品" />
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
