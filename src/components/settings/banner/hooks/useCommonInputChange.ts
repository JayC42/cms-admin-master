import React from 'react';
import { BannerFormData } from '../common.ts';

const useCommonInputChange = (
  setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>,
) => {
  return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      redirectionLink: value,
    }));
  };
};

export default useCommonInputChange;
