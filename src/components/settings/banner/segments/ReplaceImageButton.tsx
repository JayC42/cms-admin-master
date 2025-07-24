import ImageUploader from '../../../common/ImageUploader.tsx';
import { Button } from '@mui/material';
import React from 'react';
import ReplaceIcon from '@mui/icons-material/Update';

interface Props {
  onFileSelected: (file: File | null, locale: string) => void;
  inputId: string;
}

const ReplaceImageButton = ({ onFileSelected, inputId }: Props) => {
  return (
    <Button
      component="label"
      size="small"
      startIcon={<ReplaceIcon />}
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        '&:hover': { backgroundColor: '#f8fafc' },
      }}
    >
      更換圖片
      <ImageUploader
        label="更換圖片"
        onFileSelected={(file) => onFileSelected(file, inputId)}
        maxImageDisplayHeight={300}
        sx={{ display: 'none' }}
        inputId={inputId}
      />
    </Button>
  );
};

export default ReplaceImageButton;
