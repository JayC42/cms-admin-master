import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CmsDatePicker from '../../../common/CmsDateTimePicker.tsx';
import React from 'react';
import { styled } from '@mui/material/styles';
import { BannerFormData } from '../common.ts';

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
  startDate: Date;
  endDate: Date;
  onDateChange: (date: Date | null, field: keyof BannerFormData) => void;
}

const DateSegment: React.FC<Props> = ({ startDate, endDate, onDateChange }) => (
  <Body>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CmsDatePicker
        label="公開時間"
        value={startDate}
        onChange={(date) => onDateChange(date, 'startDate')}
        sx={{ width: '100%' }}
      />
      <CmsDatePicker
        label="結束的時間"
        value={endDate}
        onChange={(date) => onDateChange(date, 'endDate')}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  </Body>
);

export default DateSegment;
