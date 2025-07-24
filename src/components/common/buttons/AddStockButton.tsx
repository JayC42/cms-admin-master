import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  onClick: () => void;
}

export const AddStockButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
};
