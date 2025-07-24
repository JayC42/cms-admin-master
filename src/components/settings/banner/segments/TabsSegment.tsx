import { Tab, Tabs } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import React from 'react';
import { LocaleData } from '../common.ts';
import { getLocaleDisplayName } from '../../../../utils/getLocaleDisplayName.ts';

interface Props {
  selectedTab: string;
  setSelectedTab: (newValue: string) => void;
  data: LocaleData[];
}

const sxStyle = {
  tabs: {
    borderBottom: 1,
    borderColor: 'divider',
    '& .MuiTab-root': {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
  },
};

const TabsSegment: React.FC<Props> = ({ selectedTab, setSelectedTab, data }) => {
  return (
    <Tabs
      value={selectedTab}
      onChange={(_, newValue) => setSelectedTab(newValue)}
      sx={sxStyle.tabs}
    >
      {data.map((locale) => (
        <Tab
          key={locale.locale}
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LanguageIcon sx={{ fontSize: 20 }} />
              {getLocaleDisplayName(locale.locale)}
            </span>
          }
          value={locale.locale}
        />
      ))}
    </Tabs>
  );
};

export default TabsSegment;
