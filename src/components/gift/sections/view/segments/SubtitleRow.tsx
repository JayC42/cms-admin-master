import Tooltip from '@mui/material/Tooltip';
import { Box, Typography } from '@mui/material';
import { TagsComponent } from '../../../../common/TagsComponent.tsx';
import React from 'react';
import type { TranslationObject } from '../../../../../models/TranslationObject.ts';

type Props = {
  label: TranslationObject[];
  subTitle: string;
  tags: string[];
};

export const SubtitleRow = ({ label, subTitle, tags }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Tooltip
        title={label.map((translation, index) => (
          <Box key={index}>
            <Typography variant="subtitle2">{translation.locale}:</Typography>
            <Typography>{translation.subTitle || '-'}</Typography>
          </Box>
        ))}
        placement="bottom-start"
        arrow
      >
        <Typography variant="subtitle1" color="text.secondary">
          {subTitle}
        </Typography>
      </Tooltip>
      <TagsComponent tags={tags} />
    </Box>
  );
};
