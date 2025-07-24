import { Alert, Box, Typography } from '@mui/material';
import React from 'react';

const TooltipRequiredDocument = () => (
  <Alert severity="info" sx={{ mb: 2 }}>
    <Typography variant="subtitle2">所需文件：</Typography>
    <Box component="ul" sx={{ m: 0, pl: 2 }}>
      <li>已簽署的領取確認書</li>
    </Box>
  </Alert>
);

export default TooltipRequiredDocument;
