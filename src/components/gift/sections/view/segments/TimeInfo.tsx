import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DetailGridUnit } from '../../../../common/DetailGridUnit.tsx';
import { formatDateTime } from '../../../../../utils/dateTimeFormatter.ts';
import React from 'react';

type Props = {
  timeToPublic: string;
  timeToRelease: string;
  timeToRemove: string;
  createdAt: string;
  updatedAt: string;
};

export const TimeInfo = ({
  timeToPublic,
  timeToRelease,
  timeToRemove,
  createdAt,
  updatedAt,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          時間設置
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <DetailGridUnit title="公開時間" value={formatDateTime(timeToPublic)} sm={4} />
          <DetailGridUnit title="發布時間" value={formatDateTime(timeToRelease)} sm={4} />
          <DetailGridUnit title="移除時間" value={formatDateTime(timeToRemove)} sm={4} />
          <DetailGridUnit title="創建時間" value={formatDateTime(createdAt)} sm={4} />
          <DetailGridUnit title="最後更新時間" value={formatDateTime(updatedAt)} sm={4} />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
