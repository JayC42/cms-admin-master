import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { detailDialog } from '../../componentStyles.ts';
import { useDeleteNotification } from '../../../services/notification/delete.notification.ts';

interface Props {
  open: boolean;
  data: {
    notificationId: string;
    notificationMessage: string;
  };
  onClose: () => void;
}

export const NotificationDelete: React.FC<Props> = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value !== 'delete');
  };

  const { mutateAsync } = useDeleteNotification();

  const handleDelete = async () => {
    try {
      await mutateAsync({ pathParams: data.notificationId });
      onClose();
    } catch (e) {
      console.error('Error deleting notification:', e); // Log error on failure
    }
  };

  useEffect(() => {
    setInputValue('');
    setIsButtonDisabled(true);
  }, [data]);

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>確定刪除此通知？（通知：{data.notificationMessage}）</DialogTitle>
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
