import ImageUploader from '../../../common/ImageUploader.tsx';
import { Button } from '@mui/material';
import React from 'react';

interface Props {
  onFileSelected: (file: File | null, locale: string) => void;
  inputId: string;
}

const UploadImageButton = ({ onFileSelected, inputId }: Props) => {
  return (
    <Button
      component="label"
      variant="outlined"
      sx={{
        borderColor: '#cbd5e1',
        color: '#64748b',
        '&:hover': {
          borderColor: '#94a3b8',
          backgroundColor: '#f8fafc',
        },
      }}
    >
      上傳圖片
      <ImageUploader
        label="上傳圖片"
        onFileSelected={(file) => onFileSelected(file, inputId)}
        maxImageDisplayHeight={300}
        sx={{ display: 'none' }}
        inputId={inputId}
      />
    </Button>
  );
};

export default UploadImageButton;
