import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { BADGE_CODE_LIST } from '../../../../consts.ts';
import { TagInputComponent } from '../TagInputComponent.tsx';
import React from 'react';

interface Props {
  badgeCode: string[];
  handleChange: (e: SelectChangeEvent<string[]>) => void;
  tags: string[];
  onTagChange: (newTags: string[]) => void;
}

export const TagsInput = ({ badgeCode, handleChange, tags, onTagChange }: Props) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
      標籤設置
    </Typography>
    <Box sx={{ display: 'grid', gap: '24px' }}>
      <FormControl fullWidth>
        <InputLabel id="badge-code-label">特殊標籤</InputLabel>
        <Select
          variant="outlined"
          labelId="badge-code-label"
          label="特殊標籤"
          multiple
          value={badgeCode}
          onChange={(e) => handleChange(e)}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  sx={{
                    bgcolor: value === 'new' ? 'success.light' : 'warning.light',
                    color: value === 'new' ? 'success.dark' : 'warning.dark',
                  }}
                />
              ))}
            </Box>
          )}
        >
          {BADGE_CODE_LIST.map((badge) => (
            <MenuItem key={badge.key} value={badge.key}>
              {`${badge.label} (${badge.key})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TagInputComponent
        tags={tags}
        onTagChange={onTagChange}
        helperText="添加標籤以便將來進行偏好推薦"
      />
    </Box>
  </Box>
);
