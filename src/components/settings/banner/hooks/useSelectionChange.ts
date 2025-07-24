import { useEffect, useState } from 'react';
import { BannerFormData, DEFAULT_BANNER_DATA } from '../common.ts';

const useSelectionChange = () => {
  const [formData, setFormData] = useState<BannerFormData>(DEFAULT_BANNER_DATA);
  const [selectedTab, setSelectedTab] = useState<string>('');

  useEffect(() => {
    if (formData.data.length > 0 && !selectedTab) {
      setSelectedTab(formData.data[0].locale);
    }
  }, [formData.data, selectedTab]);

  return {
    formData,
    setFormData,
    selectedTab,
    setSelectedTab,
  };
};

export default useSelectionChange;
