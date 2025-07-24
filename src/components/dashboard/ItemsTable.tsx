import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useGetDashboardInfo } from '../../services/dashboard/getDashboardInfo.dashboard';

const ItemsTable = () => {
  const { data, isLoading, error } = useGetDashboardInfo();

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div>
        <Typography variant="h5" component="h2">
          Top 5 Popular Rewards
        </Typography>
        <Typography variant="body2" style={{ color: '#ff0000', marginTop: '10px' }}>
          Error loading data
        </Typography>
      </div>
    );
  }

  const itemData = data.topActiveRewards || [];

  return (
    <div>
      <Typography variant="h5" component="h2">
        Top 5 Popular Rewards
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="right">Redeemed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemData.map((row) => (
              <TableRow key={row.itemName}>
                <TableCell component="th" scope="row">
                  {row.itemName}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.category}
                </TableCell>
                <TableCell align="right">{row.sold}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemsTable;
