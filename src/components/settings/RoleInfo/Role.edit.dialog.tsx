import { RoleData } from '../../../models/RoleData.ts';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { detailDialog } from '../../componentStyles.ts';
import { useEditRole } from '../../../services/user/editRole.user.ts';
import { useGetAllModule } from '../../../services/user/getAllModule.user.ts';
import { Toast } from '../../../utils/Toast.ts';

interface Props {
  open: boolean;
  data: RoleData | undefined;
  onClose: () => void;
}

export const RoleInfo: React.FC<Props> = ({ open, data, onClose }) => {
  const { data: allModule } = useGetAllModule(null, { refetchOnMount: !!data });
  const [availableModule, setAvailableModule] = useState<string[]>(data ? data.allowedModule : []);
  const moduleList = allModule?.moduleKey;

  const handleToggleModule = (module: string) => {
    if (availableModule?.includes(module)) {
      setAvailableModule(availableModule.filter((m) => m !== module));
    } else {
      setAvailableModule([...availableModule, module]);
    }
  };
  const { mutateAsync } = useEditRole();
  const handleSave = async () => {
    if (!data) return;
    try {
      await mutateAsync({ pathParams: data.id, data: { allowedModule: availableModule } });
      Toast.success('權限修改成功');
      onClose();
    } catch (e) {
      Toast.error(`權限修改成失敗：${(e as Record<string, unknown>)?.message}`);
      onClose();
    }
  };

  return (
    <div>
      {data && (
        <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
          {/* Dialog Title */}
          <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
              權限：{data.name}
            </Typography>
          </DialogTitle>

          {/* Dialog Content */}
          <DialogContent dividers>
            <Grid container spacing={2}>
              {moduleList?.map((module) => (
                <Grid item xs={12} sm={6} md={4} key={module}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={availableModule.includes(module)}
                        onChange={() => handleToggleModule(module)}
                        color="primary"
                      />
                    }
                    label={<Typography variant="body1">{module}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          {/* Dialog Actions */}
          <DialogActions>
            <Button onClick={onClose} color="primary" variant="outlined">
              取消
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
