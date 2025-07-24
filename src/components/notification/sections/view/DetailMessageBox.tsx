import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  value: number;
  index: number;
  item: {
    locale: string;
    title: string;
    message: string;
  };
};

export const DetailMessageBox = ({ value, index, item }: Props) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`message-tabpanel-${index}`}
      aria-labelledby={`message-tab-${index}`}
      key={index}
      sx={{ px: 2, py: 1 }}
    >
      {value === index && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" sx={sxStyles.detailTitleTypography}>
            {item.title}
          </Typography>
          <Typography variant="body1" sx={sxStyles.detailMessageTypography}>
            {item.message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const sxStyles = {
  detailTitleTypography: {
    fontWeight: 600,
    color: 'primary.main',
  },
  detailMessageTypography: {
    whiteSpace: 'pre-wrap',
    color: 'text.primary',
    lineHeight: 1.6,
  },
};
