import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  onClick: () => void;
}

export const PreviousStepButton = ({ onClick }: Props) => (
  <Button variant="outlined" onClick={onClick} startIcon={<ArrowBackIcon />}>
    上一步
  </Button>
);
