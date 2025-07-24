import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from '@mui/material';

interface LanguageOption {
  code: string;
  label: string;
}

interface Props {
  onSelectionComplete: (selectedLanguages: string[]) => void;
  sx?: SxProps<Theme>;
  input?: string[];
}

const languages: LanguageOption[] = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-HK', label: '繁体中文' },
  { code: 'ms-MY', label: '马来语' },
  { code: 'en-GB', label: '英语' },
];

const languageMap = new Map(languages.map((lang) => [lang.code, `${lang.label} (${lang.code})`]));

export const LanguageSelectionForm: React.FC<Props> = ({ onSelectionComplete, sx = {}, input }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (input) {
      setSelectedLanguages(input);
    }
  }, [input]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedLanguages(value);
  };

  const handleClose = () => {
    onSelectionComplete(selectedLanguages);
  };

  return (
    <FormControl sx={sx}>
      <InputLabel id="language-select-label">選擇語言</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        multiple
        value={selectedLanguages}
        onChange={handleChange}
        input={<OutlinedInput label="Select Languages" />}
        renderValue={(selected) =>
          (selected as string[])
            .map((code) => languageMap.get(code) || '')
            .filter((label) => label)
            .join(', ')
        }
        onClose={handleClose}
        variant={'outlined'}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <Checkbox checked={selectedLanguages.includes(language.code)} />
            <ListItemText primary={language.label + '(' + language.code + ')'} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelectionForm;
