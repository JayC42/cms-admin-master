import { IconButton, SxProps, Theme } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Props {
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export const VisibilityButton: React.FC<Props> = ({ onClick, sx = {} }) => {
  return (
    <IconButton onClick={onClick} sx={sx}>
      <VisibilityIcon />
    </IconButton>
  );
};
