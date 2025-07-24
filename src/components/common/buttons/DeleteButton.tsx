import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const DeleteButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <DeleteIcon />
    </IconButton>
  );
};
