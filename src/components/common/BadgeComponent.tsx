import { Chip } from '@mui/material';
import React from 'react';

interface Props {
  badges?: string[];
}

export const BadgeComponent: React.FC<Props> = ({ badges }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div style={{ marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
      {badges.map((badge, index) => (
        <Chip
          label={badge}
          key={index}
          style={{ marginRight: '5px', color: '#3f51b5', fontSize: '1rem' }}
        />
      ))}
    </div>
  );
};
