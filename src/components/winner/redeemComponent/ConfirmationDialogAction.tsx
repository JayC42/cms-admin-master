import { Button, DialogActions } from '@mui/material';
import React from 'react';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationDialogAction = ({ onCancel, onConfirm }: Props) => (
  <DialogActions sx={{ px: 3, pb: 3 }}>
    <Button onClick={onCancel} variant="outlined" size="large" sx={{ minWidth: 120 }}>
      取消
    </Button>
    <Button
      onClick={onConfirm}
      variant="contained"
      color="primary"
      size="large"
      sx={{ minWidth: 120 }}
    >
      確認
    </Button>
  </DialogActions>
);

export default ConfirmationDialogAction;
