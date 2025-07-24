import { Box, Chip, Grid, Typography } from '@mui/material';
import { getStatusConfig, maskId } from './index.ts';
import { getLocalizedLabel } from '../../../utils/getLocalizedLabel.ts';
import React from 'react';
import { WinnerDetail } from '../../../services/winner/getItem.winner.ts';

type Props = {
  data: WinnerDetail | null;
};

const RedeemSummary = ({ data }: Props) => {
  if (!data) return;
  const localizedLabel = getLocalizedLabel(data.label);
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        確定要兌換以下獎品嗎？
      </Typography>

      {data && (
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  兌換狀態
                </Typography>
                <Chip {...getStatusConfig(data.winnerStatus)} size="small" />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                獲品名稱
              </Typography>
              <Typography variant="subtitle1">
                {localizedLabel.title} - {localizedLabel.subTitle}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                獲獎者
              </Typography>
              <Typography variant="subtitle1">{data.gameUserData.userName}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                兌換碼
              </Typography>
              <Typography variant="subtitle1">{maskId(data.id)}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default RedeemSummary;
