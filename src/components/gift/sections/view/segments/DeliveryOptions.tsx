import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import React from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

type Props = {
  deliveryOption: string[];
};

const DELIVERY_ICONS = {
  delivery: <LocalShippingOutlinedIcon />,
  pickup: <StorefrontOutlinedIcon />,
  email: <EmailOutlinedIcon />,
};

const DELIVERY_LABELS = {
  delivery: '快遞配送',
  pickup: '自取點提貨',
  email: '電子郵件發送',
};

export const DeliveryOptions = ({ deliveryOption }: Props) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          配送方式
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {deliveryOption.map((option) => (
            <Chip
              key={option}
              icon={DELIVERY_ICONS[option as keyof typeof DELIVERY_ICONS]}
              label={DELIVERY_LABELS[option as keyof typeof DELIVERY_LABELS]}
              variant="outlined"
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
