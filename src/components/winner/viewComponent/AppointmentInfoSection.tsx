import { Grid, Paper, Typography } from '@mui/material';
import { formatDate } from '../../../utils/dateTimeFormatter.ts';
import React from 'react';
import { AppointmentInfo } from '../../../services/winner/getItem.winner.ts';

type Props = {
  appointmentInfo: AppointmentInfo;
};

export const AppointmentInfoSection = ({ appointmentInfo }: Props) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        領獎安排
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            領獎日期
          </Typography>
          <Typography variant="body1">{formatDate(appointmentInfo.dateForCollection)}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="text.secondary">
            領獎時段
          </Typography>
          <Typography variant="body1">{appointmentInfo.sessionForCollection}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
