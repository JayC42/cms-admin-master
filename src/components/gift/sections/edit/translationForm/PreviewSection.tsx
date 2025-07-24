import { Box, Typography } from '@mui/material';
import React from 'react';
import { TranslationObject } from '../../../../../models/TranslationObject.ts';

type Props = {
  input: TranslationObject;
};

export const PreviewSection = ({ input }: Props) => (
  <Box
    sx={{
      flex: '1 1 37%',
      position: 'sticky',
      top: 24,
      height: 'fit-content',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      bgcolor: 'background.paper',
    }}
  >
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
      禮品預覽
    </Typography>
    <Typography
      variant="h5"
      sx={{
        mb: 1,
        fontWeight: 500,
        color: 'text.primary',
      }}
    >
      {input.title || '禮品品牌'}
    </Typography>
    <Typography
      variant="subtitle1"
      sx={{
        mb: 3,
        color: 'text.secondary',
      }}
    >
      {input.subTitle || '禮品型號'}
    </Typography>
    <Box
      sx={{
        textAlign: 'initial',
        '& img': { maxWidth: '100%' },
        '& p': { mb: 1 },
      }}
      dangerouslySetInnerHTML={{ __html: input.description }}
    />
  </Box>
);
