import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import React from 'react';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';

interface Props<T> {
  label: string;
  listItem: KeyLabelPair[];
  name: T;
  onChange: (name: T, e: SelectChangeEvent) => void;
  sx?: SxProps;
  value: string;
  error?: boolean;
  helperText?: string;
}

const Dropdown = <T extends string>({
  sx = {},
  value,
  listItem,
  onChange,
  label,
  name,
  error = false,
  helperText = '',
}: Props<T>) => {
  return (
    <FormControl fullWidth sx={sx} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(name, e)}
        label={label}
        name={name}
        sx={{ textAlign: 'start' }}
        variant="outlined"
      >
        {listItem.map((item) => (
          <MenuItem key={item.key} value={item.key}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText !== '' && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
