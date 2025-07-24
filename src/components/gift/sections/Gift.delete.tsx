import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useRemoveGift } from '../../../services/gift/removeGift.ts';
import { detailDialog } from '../../componentStyles.ts';
import { Toast } from '../../../utils/Toast.ts';

interface Props {
  open: boolean;
  data: {
    giftId: string;
    giftName: string;
  };
  onClose: () => void;
}

export const GiftDelete: React.FC<Props> = ({ open, data, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value !== 'delete');
  };

  const { mutateAsync } = useRemoveGift();

  const handleDelete = async () => {
    try {
      await mutateAsync({ pathParams: data.giftId });
      Toast.success('禮品已經下架');
      onClose();
    } catch (e) {
      console.error('Failed to delete gift:', e);
      Toast.error('禮品下架失敗');
    }
  };

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>確定刪除獎品？（獎品：{data.giftName}）</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            variant="outlined"
            label="請輸入'delete'以確認刪除"
            value={inputValue}
            placeholder="delete"
            onChange={handleInputChange}
            helperText="必須正確輸入'delete'來啟用刪除按鈕"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            取消
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isButtonDisabled}>
            刪除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
