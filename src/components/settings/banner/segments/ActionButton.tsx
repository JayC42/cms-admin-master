import { Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

interface Props {
  label: string;
  onClick: () => void;
  variant: 'close' | 'update' | 'delete';
}

const Body = styled('div')<{ variant: string }>`
  ${({ variant }) =>
    variant === 'delete' &&
    `
    margin-right: auto;
  `}
`;

const buttonStyles = {
  close: {
    variant: 'outlined' as const,
    sx: {
      borderColor: '#cbd5e1',
      color: '#64748b',
      '&:hover': {
        borderColor: '#94a3b8',
        backgroundColor: '#f8fafc',
      },
    },
  },
  update: {
    variant: 'contained' as const,
    sx: {
      backgroundColor: '#0ea5e9',
      '&:hover': {
        backgroundColor: '#0284c7',
      },
    },
  },
  delete: {
    variant: 'contained' as const,
    sx: {
      backgroundColor: '#ef4444',
      '&:hover': {
        backgroundColor: '#dc2626',
      },
    },
  },
};

const ActionButton: React.FC<Props> = ({ label, onClick, variant }) => {
  const style = buttonStyles[variant];

  return (
    <Body variant={variant}>
      <Button onClick={onClick} variant={style.variant} sx={style.sx}>
        {label}
      </Button>
    </Body>
  );
};

export default ActionButton;
