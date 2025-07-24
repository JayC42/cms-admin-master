import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
}

export const HeaderTitle = ({ title }: Props) => (
  <Typography variant="h6" sx={{ fontWeight: 500 }}>
    {title}
  </Typography>
);
