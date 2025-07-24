import { Box, Stack, TextField } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  subTitle: string;
  onInputChange: (name: 'title' | 'subTitle', e: any) => void;
};

const MessageInput = ({ title, subTitle, onInputChange }: Props) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="標題"
          value={title}
          onChange={(e) => onInputChange('title', e)}
        />
        <TextField
          fullWidth
          label="內容"
          multiline
          rows={4}
          value={subTitle}
          onChange={(e) => onInputChange('subTitle', e)}
        />
      </Stack>
    </Box>
  );
};

export default MessageInput;
