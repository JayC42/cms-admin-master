import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Dropdown from '../../../../common/Dropdown.tsx';
import { MARKET_LIST } from '../../../../consts.ts';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { RedeemConfiguration } from '../types/RedeemConfiguration.type.ts';

interface Props {
  market: string;
  onMarketChange: (name: keyof RedeemConfiguration, e: SelectChangeEvent) => void;
  editingValues?: string[];
  setEditingValues: (values: string[]) => void;
}

export const MarketAndTimeSlots = ({
  market,
  onMarketChange,
  editingValues = [],
  setEditingValues,
}: Props) => {
  const handleAddItem = () => {
    setEditingValues([...editingValues, '']);
  };

  const handleDeleteItem = (index: number) => {
    setEditingValues(editingValues.filter((_, i) => i !== index));
  };

  const handleChangeItem = (index: number, value: string) => {
    setEditingValues(editingValues.map((v, i) => (i === index ? value : v)));
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
        市場與時段
      </Typography>
      <Box sx={{ display: 'grid', gap: '24px' }}>
        <Dropdown<keyof RedeemConfiguration>
          label="目標市場"
          listItem={MARKET_LIST}
          name="market"
          onChange={onMarketChange}
          value={market ?? 'Malaysia'}
        />

        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="subtitle2">兌換時間段</Typography>
            <Button startIcon={<AddIcon />} onClick={handleAddItem} size="small">
              添加時間段
            </Button>
          </Box>

          <List
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              maxHeight: '200px',
              overflow: 'auto',
            }}
          >
            {editingValues.map((value, index) => (
              <ListItem
                key={index}
                sx={{
                  borderBottom: index !== editingValues.length - 1 ? '1px solid #e0e0e0' : 'none',
                  p: 1,
                }}
              >
                <TextField
                  value={value}
                  onChange={(e) => handleChangeItem(index, e.target.value)}
                  size="small"
                  fullWidth
                  placeholder="輸入時間段"
                />
                <IconButton onClick={() => handleDeleteItem(index)} size="small" sx={{ ml: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
