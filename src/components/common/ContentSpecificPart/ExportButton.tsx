import { Button } from '@mui/material';
import React from 'react';

interface Props {
  width: string;
  onClick: () => void;
  label: string;
}

const ExportButton: React.FC<Props> = ({ width, onClick, label }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ width: width, height: '56px' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ExportButton;
