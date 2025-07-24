import { Box, IconButton, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { BadgeComponent } from '../../../../common/BadgeComponent.tsx';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useState } from 'react';
import type { TranslationObject } from '../../../../../models/TranslationObject.ts';

type Props = {
  title: string;
  label: TranslationObject[];
  badgeCode: string[];
  id: string;
};

export const TitleRow = ({ title, label, badgeCode, id }: Props) => {
  const [tooltipTitle, setTooltipTitle] = useState('複製禮品ID到剪貼板');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setTooltipTitle('已複製');
        setTimeout(() => setTooltipTitle('複製禮品ID到剪貼板'), 1000);
      },
      () => {
        setTooltipTitle('複製失敗');
      },
    );
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Tooltip
          title={label.map((translation, index) => (
            <Box key={index}>
              <Typography variant="subtitle2">{translation.locale}:</Typography>
              <Typography>{translation.title}</Typography>
            </Box>
          ))}
          placement="bottom-start"
          arrow
        >
          <Typography variant="h6">{title}</Typography>
        </Tooltip>
      </Box>
      <BadgeComponent badges={badgeCode} />
      <Tooltip title={tooltipTitle} placement="left" arrow>
        <IconButton onClick={() => copyToClipboard(id)} size="small">
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
