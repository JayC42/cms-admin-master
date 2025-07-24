import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useGetDashboardInfo } from '../../services/dashboard/getDashboardInfo.dashboard';

const PlayersTable = () => {
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
          Top 5 Active Players
        </Typography>
        <Typography variant="body2" style={{ color: '#ff0000', marginTop: '10px' }}>
          Error loading data
        </Typography>
      </div>
    );
  }

  const playerData = data.topActivePlayers || [];

  return (
    <div>
      <Typography variant="h5" component="h2">
        Top 5 Active Players
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="right">Player ID</TableCell>
              <TableCell align="right">Games Played</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerData.map((row) => (
              <TableRow key={row.gameId}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {row.gameId}
                </TableCell>
                <TableCell align="right">{row.gamesPlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayersTable;
