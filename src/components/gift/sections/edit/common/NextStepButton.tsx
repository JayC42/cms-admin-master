import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';

interface Props {
  onClick: () => void;
}

export const NextStepButton = ({ onClick }: Props) => (
  <Button variant="contained" onClick={onClick} endIcon={<ArrowForwardIcon />}>
    下一步
  </Button>
);
