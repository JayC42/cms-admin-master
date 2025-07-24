import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const EditButton: React.FC<Props> = ({ onClick, disabled = false }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <EditIcon />
    </IconButton>
  );
};
