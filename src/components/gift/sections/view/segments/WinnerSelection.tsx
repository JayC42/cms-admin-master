import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DetailGridUnit } from '../../../../common/DetailGridUnit.tsx';
import React from 'react';

type Props = {
  autoSelectWinner: boolean;
  winnerSelectionTime: number;
  redeemPerSlot: number;
};

export const WinnerSelection = ({
  autoSelectWinner,
  winnerSelectionTime,
  redeemPerSlot,
}: Props) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          贏家選擇設置
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <DetailGridUnit
            title="自動選擇得獎者"
            value={autoSelectWinner ? `是(${winnerSelectionTime}分鐘)` : '否'}
          />
          {redeemPerSlot && <DetailGridUnit title="每個時段兌換人數上限" value={redeemPerSlot} />}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
