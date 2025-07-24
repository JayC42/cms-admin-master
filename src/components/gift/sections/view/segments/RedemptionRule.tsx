import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DetailGridUnit } from '../../../../common/DetailGridUnit.tsx';
import React from 'react';

type Props = {
  redeemOption: {
    allowedRedeemPerSlot: number;
    maximumAllowedAppointment: number;
    minimumAllowedAppointment: number;
    redeemSession: string[];
    winnerSecondReminder: number;
  };
};

export const RedemptionRule = ({ redeemOption }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          兌換規則
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {redeemOption.minimumAllowedAppointment && (
            <DetailGridUnit
              title="最早可預約時間"
              value={`${redeemOption.minimumAllowedAppointment}天`}
            />
          )}
          {redeemOption.maximumAllowedAppointment && (
            <DetailGridUnit
              title="最遲可預約時間"
              value={`${redeemOption.maximumAllowedAppointment}天`}
            />
          )}
          {redeemOption.winnerSecondReminder && (
            <DetailGridUnit title="二次提醒時間" value={`${redeemOption.winnerSecondReminder}天`} />
          )}
          {redeemOption.redeemSession && redeemOption.redeemSession.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                可預約時段
              </Typography>
              <Box sx={sxStyle.boxForAppointment}>
                {redeemOption.redeemSession.map((slot, index) => (
                  <Chip
                    key={index}
                    label={slot}
                    variant="outlined"
                    size="small"
                    sx={sxStyle.chipForAppointment}
                  />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const sxStyle = {
  boxForAppointment: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  },
  chipForAppointment: {
    bgcolor: 'background.paper',
    '&:hover': {
      bgcolor: 'action.hover',
    },
  },
};
