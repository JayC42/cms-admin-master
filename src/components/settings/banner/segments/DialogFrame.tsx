import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

// Create the styled component
const Body = styled(Dialog)`
  // Scrollbar styling
  .custom-scrollbar {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  }

  .MuiDialog-paper {
    background-color: #f8fafc;
    max-height: 90vh;

    @media (max-width: 1280px) {
      max-height: 95vh;
    }

    // Apply scrollbar styling
    .custom-scrollbar {
      @extend .custom-scrollbar;
    }
  }

  // Apply scrollbar styling to MuiDialogContent-root
  .MuiDialogContent-root {
    .custom-scrollbar {
      @extend .custom-scrollbar;
    }
  }
`;

// Define the component props
type Props = DialogProps & {
  open: boolean;
  onClose: () => void;
};

// Create the reusable component
const DialogFrame: React.FC<Props> = ({ open, onClose, children, ...props }) => {
  return (
    <Body open={open} onClose={onClose} fullWidth maxWidth="xl" {...props}>
      {children}
    </Body>
  );
};

export default DialogFrame;
