import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  InputAdornment,
  DialogProps,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { detailDialog } from '../../../componentStyles';
import { useAddInventory } from '../../../../services/inventory/add.inventory.ts';

interface Props {
  open: boolean;
  giftId: string;
  giftName: string;
  onClose: () => void;
}

export const AddStock: React.FC<Props> = ({ open, giftId, giftName, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const amount = parseInt(value);
    if (!isNaN(amount) && amount > 0) {
      setError('');
    } else if (value !== '') {
      setError('請輸入有效的數量');
    }
  };

  const { mutateAsync } = useAddInventory();

  const handleAdd = async () => {
    const amount = parseInt(inputValue);
    if (isNaN(amount) || amount <= 0) {
      setError('請輸入有效的數量');
      return;
    }
    try {
      await mutateAsync({ data: { giftId, amount } });
      setInputValue('');
      setError('');
      onClose();
    } catch (e) {
      console.error('Failed to add inventory:', e);
      setError('更新庫存失敗，請稍後再試');
    }
  };

  const handleClose = () => {
    setInputValue('');
    setError('');
    onClose();
  };

  return (
    <DialogFrame open={open} onClose={handleClose}>
      <DialogTitle sx={sxStyles.dialogTitle}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
          更新庫存
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={sxStyles.typographySubtitle}>
          {giftName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={sxStyles.contentBox}>
          <TextField
            fullWidth
            variant="outlined"
            label="進貨數量"
            value={inputValue}
            onChange={handleInputChange}
            type="number"
            error={!!error}
            helperText={error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddCircleOutline color="action" />
                </InputAdornment>
              ),
            }}
            sx={sxStyles.inputTextField}
            autoFocus
          />
        </Box>
      </DialogContent>

      <DialogActions sx={sxStyles.dialogActions}>
        <Button onClick={handleClose} sx={sxStyles.buttonClose}>
          取消
        </Button>
        <Button
          onClick={handleAdd}
          variant="contained"
          disabled={!inputValue || !!error}
          sx={sxStyles.buttonAdd}
        >
          確認
        </Button>
      </DialogActions>
    </DialogFrame>
  );
};

type DialogFrameProps = DialogProps & {
  open: boolean;
  onClose: () => void;
};

const DialogFrame: React.FC<DialogFrameProps> = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={sxStyles.dialogPaperFrame}
      style={detailDialog}
    >
      {children}
    </Dialog>
  );
};

const sxStyles = {
  dialogPaperFrame: {
    borderRadius: '12px',
  },
  dialogTitle: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    padding: '24px',
    pb: 2,
  },
  typographySubtitle: {
    mt: 0.5,
    fontSize: '0.875rem',
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    pt: 4,
  },
  inputTextField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& .MuiInputLabel-root': {
      background: '#fff',
      px: 0.5,
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
  },
  dialogActions: {
    padding: '24px',
    pt: 2,
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    gap: 1,
  },
  buttonClose: {
    minWidth: '100px',
    borderRadius: '6px',
    px: 3,
  },
  buttonAdd: {
    minWidth: '100px',
    borderRadius: '6px',
    px: 3,
  },
};
