import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';
import { getLocaleDisplayName } from '../../../../utils/getLocaleDisplayName.ts';
import { useNotificationData } from './hooks/useNotificationData.ts';
import { InfoSection } from './InfoSection.tsx';
import { DetailMessageBox } from './DetailMessageBox.tsx';

interface Props {
  open: boolean;
  notificationId: string;
  onClose: () => void;
}

export const NotificationView: React.FC<Props> = ({ open, notificationId, onClose }) => {
  const [value, setValue] = useState(0);

  const { notificationTypes, detail } = useNotificationData(notificationId);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!detail) return null;

  return (
    <Dialog open={open} fullWidth maxWidth="md" sx={sxStyles.dialogFrame}>
      <DialogTitle sx={sxStyles.dialogTitle}>消息詳情</DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Info Section */}
          <InfoSection detail={detail} notificationTypes={notificationTypes} />

          {/* Message Content Section */}
          <Paper elevation={0} sx={{ bgcolor: 'white' }}>
            <Tabs value={value} onChange={handleChange} sx={sxStyles.messageContentTabs}>
              {detail.message.map((item, index) => (
                <Tab
                  label={getLocaleDisplayName(item.locale)}
                  key={index}
                  sx={{
                    fontWeight: value === index ? 600 : 400,
                    minWidth: 100,
                  }}
                />
              ))}
            </Tabs>

            {detail.message.map((item, index) => (
              <DetailMessageBox value={value} index={index} item={item} />
            ))}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} variant="outlined" color="primary" sx={{ minWidth: 100 }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const sxStyles = {
  dialogFrame: {
    '& .MuiDialog-paper': {
      minHeight: '60vh',
      maxHeight: '80vh',
    },
  },
  dialogTitle: {
    borderBottom: 1,
    borderColor: 'divider',
    px: 3,
    py: 2,
  },
  messageContentTabs: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 2,
  },
};
