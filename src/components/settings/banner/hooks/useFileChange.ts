import React from 'react';
import { BannerFormData } from '../common.ts';

const useFileChange = (setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>) => {
  return (file: File | null, locale: string) => {
    if (!file) return;

    setFormData((prevData: BannerFormData) => ({
      ...prevData,
      data: prevData.data.map((item) => (item.locale === locale ? { ...item, image: file } : item)),
    }));
  };
};

export default useFileChange;
