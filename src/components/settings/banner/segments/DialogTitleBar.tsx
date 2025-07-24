import { DialogTitle, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DialogTitleBarProps {
  title: string;
  onClose: () => void;
}

const DialogTitleBar = ({ title, onClose }: DialogTitleBarProps) => (
  <DialogTitle
    sx={{
      borderBottom: '1px solid #e2e8f0',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    <IconButton onClick={onClose} size="small">
      <CloseIcon />
    </IconButton>
  </DialogTitle>
);

export default DialogTitleBar;
