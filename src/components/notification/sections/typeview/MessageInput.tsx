import { Box, Stack, TextField } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  description: string;
  onInputChange: (
    name: 'title' | 'description',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

const MessageInput = ({ title, description, onInputChange }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="顯示標題"
          variant="outlined"
          value={title}
          onChange={(e) => onInputChange('title', e)}
        />
        <TextField
          fullWidth
          label="類型模板"
          multiline
          rows={4}
          value={description}
          onChange={(e) => onInputChange('description', e)}
        />
      </Stack>
    </Box>
  );
};

export default MessageInput;
