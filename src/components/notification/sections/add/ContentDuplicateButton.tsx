import { IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';

type Props = {
  onClick: () => void;
};

const ContentDuplicateButton = ({ onClick }: Props) => {
  return (
    <Tooltip title="從簡體中文複製">
      <IconButton size="small" onClick={onClick}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ContentDuplicateButton;
