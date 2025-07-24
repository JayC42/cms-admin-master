import { IconButton, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react';
import { styled } from '@mui/material/styles';

const TextFieldsSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .field-with-tooltip {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
`;

interface Props {
  localeData: any;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    locale: string,
    field: 'title' | 'description',
  ) => void;
}

const TextInputSegment: React.FC<Props> = ({ localeData, handleInputChange }) => {
  return (
    <TextFieldsSection>
      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
        基本信息
      </Typography>
      <div className="field-with-tooltip">
        <TextField
          label="標題"
          value={localeData.title}
          onChange={(e) => handleInputChange(e, localeData.locale, 'title')}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
          }}
        />
        <Tooltip title="橫幅標題將顯示在圖片上方" placement="top">
          <IconButton size="small" sx={{ mt: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="field-with-tooltip">
        <TextField
          label="說明"
          value={localeData.description}
          onChange={(e) => {
            handleInputChange(e, localeData.locale, 'description');
          }}
          fullWidth
          multiline
          rows={8}
          sx={{
            '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
          }}
        />
        <Tooltip title="橫幅說明將顯示在標題下方" placement="top">
          <IconButton size="small" sx={{ mt: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </TextFieldsSection>
  );
};

export default TextInputSegment;
