import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  title: string;
}

export const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
    </Typography>
  );
};
