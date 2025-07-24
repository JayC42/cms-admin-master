import { Paper } from '@mui/material';
import React from 'react';

interface Props {
  tags?: string[];
}

export const TagsComponent: React.FC<Props> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div style={{ marginLeft: '5px', display: 'flex', flexDirection: 'row' }}>
      {tags.map((tag, index) => (
        <Paper key={index} style={{ marginRight: '5px', color: '#3f51b5', fontSize: '0.8rem' }}>
          {tag}
        </Paper>
      ))}
    </div>
  );
};
