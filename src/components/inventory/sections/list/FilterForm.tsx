import { GetInventoryListParams } from '../../../../services/inventory/getList.inventory.ts';
import React, { useEffect, useState } from 'react';
import { exportForm } from '../../../componentStyles.ts';
import { TextField } from '@mui/material';

interface Props {
  handleFormUpdate: (formData: GetInventoryListParams) => void;
}

export const FilterForm: React.FC<Props> = ({ handleFormUpdate }) => {
  const [formData, setFormData] = useState<GetInventoryListParams>({ search: '' });
  const [debouncedFormData, setDebouncedFormData] = useState<GetInventoryListParams>(formData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFormData(formData);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    handleFormUpdate(debouncedFormData);
  }, [debouncedFormData, handleFormUpdate]);

  const handleChange = (
    input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof GetInventoryListParams,
  ) => {
    if (!input) return;
    setFormData((prev) => ({ ...prev, [field]: input.target.value }));
  };

  return (
    <div style={exportForm}>
      <TextField
        id="search"
        label="禮品名稱"
        type="text"
        variant="outlined"
        value={formData.search}
        placeholder="搜索禮品ID或名稱"
        onChange={(e) => handleChange(e, 'search')}
        sx={{ width: '100%', marginTop: '5px' }}
      />
    </div>
  );
};
