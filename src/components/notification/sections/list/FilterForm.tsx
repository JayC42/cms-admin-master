import React, { useMemo } from 'react';
import { GetNotificationListParams } from '../../../../services/notification/getList.notification.ts';
import { getFirstDayOfMonth } from '../../../../utils/getFirstDayOfMonth.ts';
import { getLastDayOfMonth } from '../../../../utils/getLastDayOfMonth.ts';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import { exportForm } from '../../../componentStyles.ts';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  NotificationType,
  useGetAllNotificationType,
} from '../../../../services/notification/getAllType.notification.ts';
import { GetGiftListParams } from '../../../../services/gift/getList.gift.ts';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  handleFormUpdate: (formData: GetNotificationListParams) => void;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate }) => {
  const [formData, setFormData] = React.useState<GetNotificationListParams>({
    startDate: getFirstDayOfMonth(),
    endDate: getLastDayOfMonth(),
    type: 'all',
  });
  const { data } = useGetAllNotificationType({});

  const types = useMemo(() => {
    const allType: NotificationType = {
      id: 'all',
      notificationType: 'all',
      label: '全部',
      isActive: true,
      isSystem: false,
    };
    return data?.items ? [allType, ...data.items] : [allType];
  }, [data]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const newData = {
      ...formData,
      type: event.target.value,
    };
    setFormData(newData);
    handleFormUpdate(newData);
  };

  const handleDateChange = (date: Date | null, field: keyof GetGiftListParams) => {
    if (!date) return;
    const newData = {
      ...formData,
      [field]: format(date, 'yyyy-MM-dd'),
    };
    setFormData(newData);
    handleFormUpdate(newData);
  };

  return (
    <div style={exportForm}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', marginRight: '0.5%' }}>
          <DatePicker
            label="開始日期"
            value={new Date(formData.startDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="消息發布時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', marginRight: '0.5%' }}>
          <DatePicker
            label="結束日期"
            value={new Date(formData.endDate)}
            onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
            format={'dd/MM/yyyy'}
            sx={{ flex: 1 }}
          />
          <Tooltip title="消息發布時間" placement="top">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <FormControl sx={{ width: '33%' }}>
          <InputLabel id="notification-type-label">通知種類</InputLabel>
          <Select
            name="type"
            label={'通知種類'}
            labelId="notification-type-label"
            value={formData.type || 'all'}
            onChange={handleSelectChange}
            variant={'outlined'}
            sx={{ textAlign: 'start' }}
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.notificationType}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </LocalizationProvider>
    </div>
  );
};
