import { ImagePairObject } from '../../models/ImagePairObject.ts';
import React from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

interface Props {
  imageList?: ImagePairObject[];
  image?: string;
}

export const DataRowThumbnail: React.FC<Props> = ({ imageList, image }) => {
  const imageUrl = image || imageList?.[0]?.previewImage;

  return imageUrl ? (
    <img style={{ width: '40px', height: '40px' }} src={imageUrl} alt="Image Preview" />
  ) : (
    <BrokenImageIcon style={{ width: '40px', height: '40px' }} />
  );
};
