import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { detailDialog } from '../../componentStyles.ts';
import { useDeleteNotificationType } from '../../../services/notification/deleteType.notification.ts';

interface Props {
  open: boolean;
  data: {
    notificationTypeId: string;
    notificationMessage: string;
  };
  onClose: () => void;
}

export const NotificationTypeDelete: React.FC<Props> = ({ open, onClose, data }) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsButtonDisabled(value !== 'deactivate');
  };

  const { mutateAsync } = useDeleteNotificationType();

  const handleDelete = async () => {
    try {
      await mutateAsync({ pathParams: data.notificationTypeId });
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>確定關閉此通知？（通知：{data.notificationMessage}）</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            variant="outlined"
            label="請輸入'deactivate'以確認關閉"
            value={inputValue}
            placeholder="deactivate"
            onChange={handleInputChange}
            helperText="必須正確輸入'deactivate'來啟用關閉按鈕"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            取消
          </Button>
          <Button onClick={handleDelete} color="secondary" disabled={isButtonDisabled}>
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
