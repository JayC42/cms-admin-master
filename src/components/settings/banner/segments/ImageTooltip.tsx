import { IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';

const ImageTooltip = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        橫幅圖片
      </Typography>
      <Tooltip title="建議尺寸: 1920x1080px" placement="top">
        <IconButton size="small">
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};
export default ImageTooltip;
