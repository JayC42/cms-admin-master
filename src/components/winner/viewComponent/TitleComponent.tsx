import { Box, DialogTitle, Typography } from '@mui/material';
import { CopyableId } from './CopyableId.tsx';
import React from 'react';
import type { TranslationObject } from '../../../models/TranslationObject.ts';

type Props = {
  id: string;
  label: TranslationObject;
};

export const TitleComponent: React.FC<Props> = ({ id, label }) => {
  return (
    <DialogTitle
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '24px',
      }}
    >
      <Typography variant="h6" component="div">
        {label.title} - {label.subTitle}
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <CopyableId id={id} label="獲獎ID" />
      </Box>
    </DialogTitle>
  );
};
