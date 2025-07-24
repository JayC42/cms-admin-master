import { InsertDriveFile } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  index: number;
  fileName: string;
}

const UploadedFile: React.FC<Props> = ({ index, fileName }) => (
  <Box
    key={index}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      p: 1,
      bgcolor: 'background.default',
      borderRadius: 1,
      mt: 1,
    }}
  >
    <InsertDriveFile color="primary" />
    <Typography variant="body2">{fileName}</Typography>
  </Box>
);

export default UploadedFile;
