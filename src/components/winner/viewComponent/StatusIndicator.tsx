import { keyToLabel } from '../../../utils/KeyLabelPair.ts';
import { WinnerStateListMap } from '../../consts.ts';
import { Chip } from '@mui/material';
import React from 'react';

type Props = {
  winnerStatus: string;
};

export const StatusIndicator = ({ winnerStatus }: Props) => {
  return (
    <Chip
      label={keyToLabel(WinnerStateListMap, winnerStatus)}
      color={
        winnerStatus === 'rewardRedeemed'
          ? 'success'
          : winnerStatus === 'winnerRegistered'
            ? 'primary'
            : 'default'
      }
      size="small"
    />
  );
};
