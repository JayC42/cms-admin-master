import { Toolbar, Typography } from '@mui/material';
import { sidebarMargin } from '../componentStyles.ts';
import React from 'react';

interface Props {
  title: string;
}

const ComponentToolbar: React.FC<Props> = ({ title }) => {
  return (
    <Toolbar style={sidebarMargin}>
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </Toolbar>
  );
};

export default ComponentToolbar;
