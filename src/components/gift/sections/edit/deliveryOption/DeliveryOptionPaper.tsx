import { Box, Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import React from 'react';

interface Props {
  deliveryOptions: string[];
  option: { value: string; label: string; description: string; icon: JSX.Element };
  onOptionToggle: (option: string) => void;
}

const DeliveryOptionPaper: React.FC<Props> = ({ deliveryOptions, option, onOptionToggle }) => {
  return (
    <Paper
      key={option.value}
      elevation={0}
      sx={{
        borderColor: deliveryOptions.includes(option.value) ? 'primary.main' : 'divider',
        ...sxStyles.optionsPaper,
      }}
    >
      <FormControlLabel
        value={option.value}
        control={
          <Checkbox
            checked={deliveryOptions.includes(option.value)}
            onChange={() => onOptionToggle(option.value)}
            sx={{ ml: 2 }}
          />
        }
        label={
          <Box sx={sxStyles.optionsLabel}>
            <Box
              sx={{
                color: deliveryOptions.includes(option.value) ? 'primary.main' : 'action.active',
              }}
            >
              {option.icon}
            </Box>
            <Box>
              <Typography variant="subtitle1">{option.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
            </Box>
          </Box>
        }
        sx={{
          margin: 0,
          width: '100%',
        }}
      />
    </Paper>
  );
};

export default DeliveryOptionPaper;

const sxStyles = {
  optionsPaper: {
    border: '1px solid',
    borderRadius: 2,
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: 'primary.main',
      bgcolor: 'action.hover',
    },
  },
  optionsLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    py: 2,
    pr: 2,
  },
};
