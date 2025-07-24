import { Box, Paper } from '@mui/material';
import { DetailGridUnit } from '../../../common/DetailGridUnit.tsx';
import React from 'react';

type Props = {
  id: string;
  label: string;
};

export const TypeInfoSection: React.FC<Props> = ({ id, label }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <DetailGridUnit title="類型ID" value={id} sm={6} />
        <DetailGridUnit title="消息標籤" value={label || 'N/A'} sm={6} />
      </Box>
    </Paper>
  );
};
