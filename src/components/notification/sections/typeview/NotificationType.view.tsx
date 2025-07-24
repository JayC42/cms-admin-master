import React, { useState, useEffect } from 'react';
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
import { useEditNotificationTemplate } from '../../../../services/notification/editTemplate.notification.ts';
import { getLocaleDisplayName } from '../../../../utils/getLocaleDisplayName.ts';
import { TypeInfoSection } from './TypeInfoSection.tsx';
import MessageInput from './MessageInput.tsx';
import { Toast } from '../../../../utils/Toast.ts';
import { useGetNotificationTypeItem } from '../../../../services/notification/getItemType.notification.ts';

interface Props {
  open: boolean;
  notificationTypeId: string;
  onClose: () => void;
}

export const NotificationTypeView: React.FC<Props> = ({ open, notificationTypeId, onClose }) => {
  const [value, setValue] = useState(0);
  const [editData, setEditData] = useState<{
    [locale: string]: { title: string; description?: string };
  }>({});
  const { data, isSuccess } = useGetNotificationTypeItem({
    pathParams: notificationTypeId,
    options: {
      enabled: Boolean(open && notificationTypeId),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setEditData(
        data.output.label.reduce(
          (acc, item) => ({
            ...acc,
            [item.locale]: { title: item.title, description: item.description },
          }),
          {},
        ),
      );
    }
  }, [isSuccess]);

  const handleEditChange = (
    locale: string,
    field: 'title' | 'description',
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEditData((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [field]: event.target.value },
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { mutateAsync } = useEditNotificationTemplate();

  const saveChanges = async () => {
    const request = Object.entries(editData).map(([locale, { description }]) => ({
      locale,
      description: description || '',
    }));
    try {
      await mutateAsync({ pathParams: notificationTypeId, data: request });
      Toast.success('類型修改成功');
      onClose();
    } catch (e) {
      console.error('Error editing template:', e);
    }
  };
  const detail = data?.output;
  if (!detail) return null;

  return (
    <Dialog open={open} fullWidth maxWidth="md" sx={sxStyles.dialogFrame}>
      <DialogTitle sx={sxStyles.dialogTitle}>消息類型詳情</DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Info Section */}
          <TypeInfoSection id={detail.id} label={detail.notificationType} />

          {/* Edit Section */}
          <Paper elevation={0} sx={{ bgcolor: 'white' }}>
            <Tabs value={value} onChange={handleTabChange} sx={sxStyles.editTabs}>
              {detail.label.map((item, index) => (
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

            {detail.label.map((item, index) => (
              <Box role="tabpanel" hidden={value !== index} key={index} sx={{ px: 2, py: 1 }}>
                {value === index && (
                  <MessageInput
                    title={editData[item.locale]?.title || ''}
                    description={editData[item.locale]?.description || ''}
                    onInputChange={(name, e) => handleEditChange(item.locale, name, e)}
                  />
                )}
              </Box>
            ))}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={sxStyles.dialogActions}>
        <Button onClick={saveChanges} variant="contained" color="primary" sx={{ minWidth: 100 }}>
          修改
        </Button>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ minWidth: 100 }}>
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
  editTabs: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 2,
  },
  dialogActions: {
    p: 2,
    borderTop: 1,
    borderColor: 'divider',
  },
};
