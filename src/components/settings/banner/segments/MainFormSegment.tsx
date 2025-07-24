import LanguageSelectionForm from '../../../common/LanguageSelectionForm.tsx';
import { styled, SxProps, Theme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import React from 'react';
import { Stack } from '@mui/material';

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const sxStyle = {
  languageSelectionForm: {
    '& .MuiFormControl-root': { width: '100%' },
    '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
  } as SxProps<Theme>,
  redirectionField: {
    '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
  },
};

interface Props {
  input: string[];
  redirectionLink?: string;
  onLanguageSelectionCompleted: (languages: string[]) => void;
  onInputChange: (value: string, field: string) => void;
}

export const MainFormSegment: React.FC<Props> = ({
  input,
  redirectionLink = '',
  onLanguageSelectionCompleted,
  onInputChange,
}) => {
  return (
    <Stack spacing={2}>
      <LanguageSelectionForm
        onSelectionComplete={onLanguageSelectionCompleted}
        input={input}
        sx={sxStyle.languageSelectionForm}
      />
      <TextField
        fullWidth
        label="重定向連結"
        value={redirectionLink}
        onChange={(e) => onInputChange(e.target.value, 'redirectionLink')}
      />
    </Stack>
  );
};

export default MainFormSegment;
