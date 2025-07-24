import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import React from 'react';

type Props = {
  onListButtonClicked: () => void;
};

export const PoolRecords = ({ onListButtonClicked }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          獎池紀錄
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="outlined" onClick={onListButtonClicked} color="primary">
            查看紀錄
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
