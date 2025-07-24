import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
} from '@mui/material';
import { useGetSettingDetail, SettingInfo } from '../../services/setting/getDetail.setting.ts';
import { DetailGridUnit } from '../common/DetailGridUnit.tsx';
import React from 'react';

interface Props {
  open: boolean;
  data: { id: string };
  onClose: () => void;
}

export const ConfigInfo: React.FC<Props> = ({ open, data, onClose }) => {
  const { data: settings } = useGetSettingDetail({
    pathParams: data.id,
    options: { enabled: Boolean(open && data.id) },
  });

  const detail = settings?.setting;

  const renderValue = (value: SettingInfo['value']) => {
    if (Array.isArray(value)) {
      return (
        <List sx={{ p: 0 }}>
          {value.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                px: 2,
                py: 1,
                borderBottom: index !== value.length - 1 ? 1 : 0,
                borderColor: 'divider',
              }}
            >
              {typeof item === 'boolean' ? (
                <Chip
                  label={item ? 'True' : 'False'}
                  color={item ? 'success' : 'default'}
                  size="small"
                />
              ) : (
                <Typography>{item}</Typography>
              )}
            </ListItem>
          ))}
        </List>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <Chip label={value ? 'True' : 'False'} color={value ? 'success' : 'default'} size="small" />
      );
    }

    return <Typography>{value}</Typography>;
  };

  if (!detail) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '50vh',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: 3,
          py: 2,
        }}
      >
        {detail.item}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Info Section */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DetailGridUnit title="設定ID" value={detail.id} />
              <DetailGridUnit title="設定類型" value={detail.type} />
              {detail.description && <DetailGridUnit title="設定描述" value={detail.description} />}
            </Box>
          </Paper>

          {/* Value Section */}
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                當前設置
              </Typography>
              {renderValue(detail.value)}
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ minWidth: 100 }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
