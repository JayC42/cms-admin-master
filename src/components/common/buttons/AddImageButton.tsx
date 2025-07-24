import { AddPhotoAlternate } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const AddImageButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <AddPhotoAlternate />
    </IconButton>
  );
};
