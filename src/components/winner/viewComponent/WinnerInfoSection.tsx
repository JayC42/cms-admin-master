import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { formatDateTime } from '../../../utils/dateTimeFormatter.ts';
import { StatusIndicator } from './StatusIndicator.tsx';

type Props = {
  gameUserData: {
    userName: string;
    email: string;
    phoneNo: string;
    identityNo: string;
    fullName: string;
  };
  timeToAnnouncement: string;
  winnerStatus: string;
};

export const WinnerInfoSection: React.FC<Props> = ({
  gameUserData,
  timeToAnnouncement,
  winnerStatus,
}) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        獲獎者資料
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            用戶名稱
          </Typography>
          <Typography variant="body1">{gameUserData.userName}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            電郵地址
          </Typography>
          <Typography variant="body1">{gameUserData.email}</Typography>
        </Grid>

        {gameUserData.phoneNo !== '' && (
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              電話號碼
            </Typography>
            <Typography>{gameUserData.phoneNo}</Typography>
          </Grid>
        )}

        {gameUserData.identityNo !== '' && (
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              身份證號碼
            </Typography>
            <Typography>{gameUserData.identityNo}</Typography>
          </Grid>
        )}

        {gameUserData.fullName !== '' && (
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              身份證全名
            </Typography>
            <Typography>{gameUserData.fullName}</Typography>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            獲獎時間
          </Typography>
          <Typography variant="body1">{formatDateTime(timeToAnnouncement)}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            獲獎狀態
          </Typography>
          <StatusIndicator winnerStatus={winnerStatus} />
        </Grid>
      </Grid>
    </Paper>
  );
};
