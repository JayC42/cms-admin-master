import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DetailGridUnit } from '../../../../common/DetailGridUnit.tsx';
import { keyToLabel } from '../../../../../utils/KeyLabelPair.ts';
import { RewardCategoryListMap } from '../../../../consts.ts';
import React from 'react';

type Props = {
  type: string;
  poolQuota: string | number;
  weightage: string | number;
  market: string;
};

export const BasicInformation = ({ type, poolQuota, weightage, market }: Props) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          基本資訊
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <DetailGridUnit title="獎品類型" value={keyToLabel(RewardCategoryListMap, type)} />
          <DetailGridUnit title="獎池上限" value={poolQuota} />
          <DetailGridUnit title="權重" value={weightage} />
          <DetailGridUnit title="市場" value={market} />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
