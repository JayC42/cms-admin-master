import { DialogActions } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DialogActionBar = ({ children }: Props) => (
  <DialogActions
    sx={{
      borderTop: '1px solid #e2e8f0',
      backgroundColor: 'white',
      padding: '16px 24px',
      gap: '12px',
      position: 'sticky',
      bottom: 0,
      zIndex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    }}
  >
    {children}
  </DialogActions>
);

export default DialogActionBar;
