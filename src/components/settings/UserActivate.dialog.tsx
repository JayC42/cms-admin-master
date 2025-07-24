import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { detailDialog } from '../componentStyles.ts';
import { useEnableUser } from '../../services/user/enable.user.ts';
import React from 'react';
import { useDisableUser } from '../../services/user/disable.user.ts';
import { Toast } from '../../utils/Toast.ts';

interface Props {
  open: boolean;
  data: { id: string; userName: string; isActive: boolean } | undefined;
  onClose: () => void;
}

export const UserActivate: React.FC<Props> = ({ open, data, onClose }) => {
  const { mutateAsync: mutateAsyncEnable } = useEnableUser();
  const handleEnable = async () => {
    if (!data) return;
    try {
      await mutateAsyncEnable({ data: { userId: data.id } });
      Toast.success('用户已被解冻');
      onClose();
    } catch (e) {
      Toast.error((e as { message?: string })?.message || '');
    }
  };
  const { mutateAsync } = useDisableUser();
  const handleDisable = async () => {
    if (!data) return;
    try {
      await mutateAsync({ data: { userId: data.id } });

      Toast.success('用户已被凍結');
      onClose();
    } catch (e) {
      Toast.error((e as { message?: string })?.message || '');
    }
  };

  return (
    <div>
      {data && (
        <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
          <DialogTitle>
            {data.isActive ? '確認凍結該用戶？' : '確認解凍該用戶？'}（用戶：{data.userName})
          </DialogTitle>
          <DialogContent dividers>
            <p>
              {data.isActive
                ? '確認凍結該用戶？凍結之後，該用戶的所有權限都將會被收回。'
                : '確認解凍該用戶？解凍後，該用戶將恢復其先前的權限。'}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              取消
            </Button>
            {data.isActive ? (
              <Button onClick={handleDisable} color="secondary">
                凍結
              </Button>
            ) : (
              <Button onClick={handleEnable} color="primary">
                解凍
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
