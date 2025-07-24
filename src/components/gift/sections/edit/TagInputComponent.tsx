import React from 'react';
import { Box, Chip, FormControl, TextField, Typography } from '@mui/material';

interface Props {
  tags: string[];
  onTagChange: (newTags: string[]) => void;
  helperText?: string;
  error?: boolean;
}

export const TagInputComponent: React.FC<Props> = ({
  tags,
  onTagChange,
  helperText,
  error = false,
}) => {
  const [tagInput, setTagInput] = React.useState<string>('');

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        onTagChange([...tags, trimmedTag]);
      }
      setTagInput('');
      e.preventDefault();
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    onTagChange(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <FormControl fullWidth error={error}>
      <TextField
        label="標籤（按空格鍵區分）"
        id="tags-input"
        value={tagInput}
        onChange={handleTagInput}
        onKeyPress={handleTagKeyPress}
        placeholder="按空格鍵區分標籤"
        fullWidth
        variant="outlined"
        error={error}
      />
      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'text.secondary'}
          sx={{ pl: '14px' }}
          textAlign={'left'}
        >
          {helperText}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          mt: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            minHeight: '32px',
            p: tags.length ? '4px 0' : 0,
          }}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </FormControl>
  );
};
