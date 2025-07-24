import { GetInventoryHistoryParams } from '../../../../services/inventory/getHistory.inventory.ts';
import React, { useEffect, useState } from 'react';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import { format } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { exportForm } from '../../../componentStyles.ts';
import { Box, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  handleFormUpdate: (formData: GetInventoryHistoryParams) => void;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate }) => {
  const [formData, setFormData] = useState<GetInventoryHistoryParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
  });

  useEffect(() => {
    handleFormUpdate(formData);
  }, [formData, handleFormUpdate]);

  const handleDateChange = (date: Date | null, field: keyof GetInventoryHistoryParams) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, [field]: format(date, 'yyyy-MM-dd') }));
  };

  return (
    <div style={exportForm}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '49.5%', marginRight: '1%' }}>
          <DatePicker
            label="開始日期"
            value={new Date(formData.startDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="紀錄創建時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '49.5%' }}>
          <DatePicker
            label="結束日期"
            value={new Date(formData.endDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="紀錄創建時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </LocalizationProvider>
    </div>
  );
};
