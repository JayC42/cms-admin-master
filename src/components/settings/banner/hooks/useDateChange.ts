import { BannerFormData } from '../common.ts';
import React from 'react';

const useDateChange = (setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>) => {
  return (date: Date | null, field: keyof BannerFormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };
};

export default useDateChange;
