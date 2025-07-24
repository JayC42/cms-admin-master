import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { RewardType } from '../../consts.ts';
import ExportButton from '../../common/ContentSpecificPart/ExportButton.tsx';

interface Props {
  handleFormUpdate: (startDate: string, endDate: string) => void;
  handleAdd: () => void;
}

interface IFormData {
  startDate: Date | null;
  endDate: Date | null;
  type: RewardType;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate, handleAdd }) => {
  const [formData, setFormData] = useState<{ startDate: Date; endDate: Date }>({
    startDate: new Date(new Date().setDate(1)),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1, 0)),
  });

  useEffect(() => {
    handleFormUpdate(
      format(formData.startDate, 'yyyy-MM-dd'),
      format(formData.endDate, 'yyyy-MM-dd'),
    );
  }, [formData, handleFormUpdate]);

  const handleDateChange = (value: Date | null, field: keyof IFormData) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="開始日期"
          value={formData.startDate}
          onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
          format={'dd/MM/yyyy'}
          sx={{ width: '44%', marginRight: '1%' }}
        />
        <DatePicker
          label="結束日期"
          value={formData.endDate}
          onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
          format={'dd/MM/yyyy'}
          sx={{ width: '44%', marginRight: '1%' }}
        />
      </LocalizationProvider>
      <ExportButton width="10%" onClick={handleAdd} label="添加" />
    </div>
  );
};
