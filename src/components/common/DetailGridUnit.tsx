import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title: string;
  value: string | number | undefined;
  sm?: number;
}

export const DetailGridUnit: React.FC<Props> = ({ title, value, sm = 3 }) => {
  return (
    <Grid item xs={12} sm={sm}>
      <Typography
        variant="subtitle1"
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {title}：{value ? value : 'N/A'}
      </Typography>
    </Grid>
  );
};
