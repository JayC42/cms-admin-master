import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload } from '@mui/icons-material';
import { VisuallyHiddenInput } from './index.ts';

const Body = styled('label')(({ theme }) => ({
  display: 'block',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    opacity: 0.9,
  },
}));

interface Props {}

const UploadBox: React.FC<Props> = () => (
  <Body sx={{ flex: 1 }}>
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
      <Typography variant="subtitle2" gutterBottom>
        拖放文件至此處或點擊上傳
      </Typography>
      <Typography variant="caption" color="text.secondary">
        支持：PDF, JPG, PNG (最大 10MB)
      </Typography>
      <VisuallyHiddenInput />
    </Box>
  </Body>
);

export default UploadBox;
