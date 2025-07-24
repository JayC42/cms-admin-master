import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetPoolListByIdApi } from '../../../../services/gift/getPoolListById.ts';
import { DataHeader, DataRow } from './PoolData.tsx';

interface Props {
  open: boolean;
  data: {
    id: string;
    label: string;
  };
  onClose: () => void;
}

export const GiftPoolList = ({ open, onClose, data }: Props) => {
  const { data: pool } = useGetPoolListByIdApi({
    pathParams: data.id,
    options: { enabled: Boolean(open && data.id?.trim()) },
  });

  const poolList = pool?.success ? pool.items : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            獎池紀錄
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {data.label}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <DataHeader />
            <TableBody>
              {poolList.map((pool) => (
                <DataRow key={pool.id} data={pool} />
              ))}
              {poolList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">暫無獎池紀錄</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} color="primary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
