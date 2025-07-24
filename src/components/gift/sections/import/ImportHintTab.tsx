import { Box, Tab, Tabs } from '@mui/material';
import { BasicDataTab } from './BasicData.tab.tsx';
import React, { useMemo, useState } from 'react';
import { TitleDataTab } from './TitleDataTab.tsx';
import { SubtitleDataTab } from './SubtitleData.tab.tsx';
import { DescriptionDataTab } from './DescriptionData.tab.tsx';
import { DeliveryTab } from './Delivery.tab.tsx';

interface Props {
  callRichTextGenerator: () => void;
}

type TabId = 'basicData' | 'title' | 'subTitle' | 'description' | 'delivery';

interface TabData {
  id: TabId;
  label: string;
  component: React.ComponentType<any>;
}

const TAB_DATA: TabData[] = [
  { id: 'basicData', label: '基礎數據', component: BasicDataTab },
  { id: 'title', label: '品牌', component: TitleDataTab },
  { id: 'subTitle', label: '型號', component: SubtitleDataTab },
  { id: 'description', label: '詳細說明', component: DescriptionDataTab },
  { id: 'delivery', label: '運送說明', component: DeliveryTab },
];

const tabDataMap = new Map(TAB_DATA.map((tab) => [tab.id, tab]));

const ImportHintTab: React.FC<Props> = ({ callRichTextGenerator }) => {
  const [activeTab, setActiveTab] = useState<TabId>('basicData');

  const handleChange = (event: React.SyntheticEvent, newValue: TabId) => {
    setActiveTab(newValue);
  };

  const renderActiveTab = useMemo(() => {
    const tabData = tabDataMap.get(activeTab);
    if (!tabData) return null;

    const TabComponent = tabData.component;
    if (activeTab === 'basicData' || activeTab === 'description') {
      return <TabComponent callRichTextGenerator={callRichTextGenerator} />;
    }
    return <TabComponent />;
  }, [activeTab, callRichTextGenerator]);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={activeTab} onChange={handleChange}>
        {TAB_DATA.map((tab) => (
          <Tab key={tab.id} value={tab.id} label={tab.label} />
        ))}
      </Tabs>
      {renderActiveTab}
    </Box>
  );
};

export default React.memo(ImportHintTab);
