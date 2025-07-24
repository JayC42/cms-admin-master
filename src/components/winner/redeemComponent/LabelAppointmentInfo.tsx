import { Alert, Box, Typography } from '@mui/material';
import React from 'react';
import { AppointmentInfo } from '../../../services/winner/getItem.winner.ts';

type Props = {
  appointmentInfo: AppointmentInfo;
};

const LabelAppointmentInfo = ({ appointmentInfo }: Props) => (
  <Alert severity="info" sx={{ mt: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      預約領取時間
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        mt: 1,
      }}
    >
      <Box>
        <Typography variant="caption" color="text.secondary">
          日期
        </Typography>
        <Typography variant="body2">{appointmentInfo.dateForCollection}</Typography>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          時段
        </Typography>
        <Typography variant="body2">{appointmentInfo.sessionForCollection}</Typography>
      </Box>
    </Box>
  </Alert>
);

export default LabelAppointmentInfo;
