import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { PoolInfo } from './sections/view/Pool.view.tsx';
import { detailDialog } from '../componentStyles.ts';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const PoolSearchDialog: React.FC<Props> = ({ open, onClose }) => {
  const [toggleDialogPoolInfo, setToggleDialogPoolInfo] = useState(false);
  const [poolId, setPoolId] = useState<string>('');

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>遊戲ID搜索</DialogTitle>
        <DialogContent>
          <TextField
            label="遊戲ID"
            variant="outlined"
            fullWidth
            sx={{ marginTop: '10px', marginBottom: '10px' }}
            onChange={(e) => setPoolId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setToggleDialogPoolInfo(true)}>搜索</Button>
          <Button onClick={() => onClose()}>關閉</Button>
        </DialogActions>
      </Dialog>
      <PoolInfo
        open={toggleDialogPoolInfo}
        onClose={() => setToggleDialogPoolInfo(false)}
        data={{ poolId }}
      />
    </div>
  );
};
