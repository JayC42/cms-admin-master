import { CheckCircle, Error, Schedule } from '@mui/icons-material';
import React from 'react';

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'rewardRedeemed':
      return {
        label: '已兌換',
        color: 'success' as const,
        icon: React.createElement(CheckCircle),
      };
    case 'winnerRegistered':
      return {
        label: '待兌換',
        color: 'primary' as const,
        icon: React.createElement(Schedule),
      };
    case 'winnerSelected':
      return {
        label: '未登記',
        color: 'warning' as const,
        icon: React.createElement(Error),
      };
    default:
      return {
        label: '未知狀態',
        color: 'default' as const,
        icon: React.createElement(Error),
      };
  }
};

export default getStatusConfig;
