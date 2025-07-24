import { BannerFormData } from '../common.ts';
import React from 'react';

const useInputChange = (setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>) => {
  return (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    locale: string,
    field: 'title' | 'description',
  ) => {
    const { value } = event.target;

    setFormData((prevData: BannerFormData) => ({
      ...prevData,
      data: prevData.data.map((item) =>
        item.locale === locale ? { ...item, [field]: value } : item,
      ),
    }));
  };
};

export default useInputChange;
