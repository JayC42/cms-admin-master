import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetSettingDetail } from '../../services/setting/getDetail.setting';
import { useUpdateSetting } from '../../services/setting/update.setting';

interface Props {
  open: boolean;
  data: { id: string };
  onClose: () => void;
}

export const ConfigEdit: React.FC<Props> = ({ open, data, onClose }) => {
  const [editingValues, setEditingValues] = useState<
    (string | number | boolean)[] | string | number | boolean
  >([]);
  const [error, setError] = useState<string>('');
  const { data: settings } = useGetSettingDetail(
    { pathParams: data.id, options: { enabled: Boolean(open && data.id) } },
    {
      onFreshFetched: (data) => {
        setEditingValues(data.setting.value);
      },
    },
  );
  const detail = settings?.setting;

  const handleAddItem = () => {
    if (Array.isArray(editingValues)) {
      const defaultValue =
        typeof editingValues[0] === 'number'
          ? 0
          : typeof editingValues[0] === 'boolean'
            ? false
            : '';
      setEditingValues([...editingValues, defaultValue]);
    }
  };

  const handleDeleteItem = (index: number) => {
    if (Array.isArray(editingValues)) {
      setEditingValues(editingValues.filter((_, i) => i !== index));
    }
  };

  const handleChangeItem = (index: number, value: string) => {
    if (Array.isArray(editingValues)) {
      const newValues = [...editingValues];
      if (typeof editingValues[0] === 'number') {
        newValues[index] = Number(value) || 0;
      } else if (typeof editingValues[0] === 'boolean') {
        newValues[index] = value.toLowerCase() === 'true';
      } else {
        newValues[index] = value;
      }
      setEditingValues(newValues);
    } else {
      if (typeof editingValues === 'number') {
        setEditingValues(Number(value) || 0);
      } else if (typeof editingValues === 'boolean') {
        setEditingValues(value.toLowerCase() === 'true');
      } else {
        setEditingValues(value);
      }
    }
  };

  const renderValueEditor = () => {
    if (Array.isArray(editingValues)) {
      return (
        <List sx={{ p: 0 }}>
          {editingValues.map((value, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 1,
                gap: 1,
              }}
            >
              {typeof value === 'boolean' ? (
                <TextField
                  select
                  value={value.toString()}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  fullWidth
                  size="small"
                  error={!!error}
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </TextField>
              ) : (
                <TextField
                  value={value}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  fullWidth
                  size="small"
                  error={!!error}
                  type={typeof value === 'number' ? 'number' : 'text'}
                />
              )}
              <IconButton onClick={() => handleDeleteItem(index)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAddItem} sx={{ mt: 1 }}>
            新增項目
          </Button>
        </List>
      );
    } else {
      if (typeof editingValues === 'boolean') {
        return (
          <TextField
            select
            value={editingValues.toString()}
            onChange={(e) => handleChangeItem(0, e.target.value)}
            fullWidth
            size="small"
            error={!!error}
          >
            <MenuItem value="true">True</MenuItem>
            <MenuItem value="false">False</MenuItem>
          </TextField>
        );
      }
      return (
        <TextField
          value={editingValues}
          onChange={(e) => handleChangeItem(0, e.target.value)}
          fullWidth
          size="small"
          error={!!error}
          type={typeof editingValues === 'number' ? 'number' : 'text'}
        />
      );
    }
  };
  const { mutateAsync } = useUpdateSetting();
  const onUpdate = async () => {
    if (!detail) return;

    try {
      const regex = new RegExp(detail.regex);

      if (Array.isArray(editingValues)) {
        const hasInvalidValue = editingValues.some((v) => !regex.test(String(v)));
        if (hasInvalidValue) {
          setError('某些值不符合規則要求');
          return;
        }
      }
      try {
        await mutateAsync({ pathParams: detail.id, data: { value: editingValues } });
        onClose();
      } catch (e) {
        setError('更新設定時發生錯誤');
      }
    } catch (error) {
      setError('處理更新時發生錯誤');
    }
  };

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
        {detail?.item || '設定編輯'}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Description Section */}
          {detail?.description && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Typography variant="body2" color="text.secondary">
                {detail.description}
              </Typography>
            </Paper>
          )}

          {/* Value Editor Section */}
          <Paper elevation={0} sx={{ p: 2 }}>
            {renderValueEditor()}
          </Paper>

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onUpdate} variant="contained" color="primary" sx={{ minWidth: 100 }}>
          保存
        </Button>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ minWidth: 100 }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
