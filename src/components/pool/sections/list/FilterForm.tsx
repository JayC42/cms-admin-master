import { POOL_STATUS_LIST, REWARD_CATEGORY_LIST, SEARCH_CRITERIA } from '../../../consts.ts';
import React, { useEffect, useState } from 'react';
import { SelectChangeEvent, IconButton, Tooltip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { exportForm } from '../../../componentStyles.ts';
import { GetPoolListParams } from '../../../../services/pools/getList.pool.ts';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import { format } from 'date-fns';
import Dropdown from '../../../common/Dropdown.tsx';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface Props {
  handleFormUpdate: (formData: GetPoolListParams) => void;
  handlePoolSearch: () => void;
  onExport: (formData: GetPoolListParams) => void;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate, handlePoolSearch, onExport }) => {
  const [formData, setFormData] = useState<GetPoolListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
    poolStatus: 'all',
    searchBy: 'createdAt',
  });

  useEffect(() => {
    handleFormUpdate(formData);
  }, [formData, handleFormUpdate]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleDateChange = (date: Date | null, field: keyof GetPoolListParams) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, [field]: format(date, 'yyyy-MM-dd') }));
  };

  const handleExport = () => {
    onExport(formData);
  };

  return (
    <div style={exportForm}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="開始日期"
          value={new Date(formData.startDate)}
          onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
          format={'dd/MM/yyyy'}
          sx={{ width: '22%', marginRight: '0.5%' }}
        />
        <DatePicker
          label="結束日期"
          value={new Date(formData.endDate)}
          onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
          format={'dd/MM/yyyy'}
          sx={{ width: '22%', marginRight: '0.5%' }}
        />
        <Dropdown
          label="搜索範圍"
          listItem={SEARCH_CRITERIA}
          name="searchBy"
          onChange={(name, e) => handleSelectChange(e)}
          sx={{ width: '18%', marginRight: '0.5%' }}
          value={formData.searchBy || 'createdAt'}
        />
        <Dropdown
          label="禮品種類"
          listItem={REWARD_CATEGORY_LIST}
          name="type"
          onChange={(name, e) => handleSelectChange(e)}
          sx={{ width: '18%', marginRight: '0.5%' }}
          value={formData.type || 'all'}
        />
        <Dropdown
          label="獎池狀態"
          listItem={POOL_STATUS_LIST}
          name="poolStatus"
          onChange={(name, e) => handleSelectChange(e)}
          sx={{ width: '18%', marginRight: '0.5%' }}
          value={formData.poolStatus || 'all'}
        />
      </LocalizationProvider>
      <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="獎池查找">
          <IconButton onClick={handlePoolSearch}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="導出數據">
          <IconButton onClick={handleExport}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
