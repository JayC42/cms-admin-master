import React, { useEffect } from 'react';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import { exportForm } from '../../../componentStyles.ts';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { REWARD_CATEGORY_LIST } from '../../../consts.ts';
import { format } from 'date-fns';
import Dropdown from '../../../common/Dropdown.tsx';
import ExportButton from '../../../common/ContentSpecificPart/ExportButton.tsx';
import { GetGiftListParams } from '../../../../services/gift/getList.gift.ts';
import { Box, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  handleFormUpdate: (formData: GetGiftListParams) => void;
  onExport: (formData: GetGiftListParams) => void;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate, onExport }) => {
  const [formData, setFormData] = React.useState<GetGiftListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
  });

  useEffect(() => {
    handleFormUpdate(formData);
  }, [formData, handleFormUpdate]);

  const handleSelectChange = <K extends keyof GetGiftListParams>(field: K, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | null, field: keyof GetGiftListParams) => {
    if (!date) return;
    setFormData((prev) => ({
      ...prev,
      [field]: format(date, 'yyyy-MM-dd'),
    }));
  };

  const handleExport = () => {
    onExport(formData);
  };

  return (
    <div style={exportForm}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', marginRight: '1%' }}>
          <DatePicker
            label="開始日期"
            value={new Date(formData.startDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="可參與的開始時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', marginRight: '1%' }}>
          <DatePicker
            label="結束日期"
            value={new Date(formData.endDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="可參與的結束時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Dropdown<keyof GetGiftListParams>
          label="禮品種類"
          listItem={REWARD_CATEGORY_LIST}
          name="type"
          onChange={(name, e) => handleSelectChange(name, e.target.value)}
          sx={{ width: '20%', marginRight: '1%' }}
          value={formData.type ? formData.type : ''}
        />
      </LocalizationProvider>
      <ExportButton width="10%" onClick={handleExport} label="數據導出" />
    </div>
  );
};
