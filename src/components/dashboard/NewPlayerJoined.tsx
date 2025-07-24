import { Typography, CircularProgress } from '@mui/material';
import { useGetDashboardInfo } from '../../services/dashboard/getDashboardInfo.dashboard';
import { format } from 'date-fns';

export const NewPlayerJoined: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardInfo();

  // Calculate the exact timestamp that matches backend logic
  const getTimestampText = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // 1 day ago
    date.setHours(0, 0, 0, 0); // Set to midnight

    const formattedDate = format(date, 'dd MMMM yyyy HH:mm');
    const timezoneAbbr =
      new Intl.DateTimeFormat('en', {
        timeZoneName: 'short',
      })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value || '';

    return `${formattedDate} ${timezoneAbbr}`;
  };

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h5" component="h2" style={{ color: '#000000' }}>
          Total Players Joined
        </Typography>
        <div style={{ height: '3vh' }}></div>
        <Typography variant="body2" style={{ color: '#ff0000' }}>
          Error loading data
        </Typography>
      </div>
    );
  }

  const { currentPlayer, playersAdded } = data.info;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5" component="h2" style={{ color: '#000000' }}>
        Total Users
      </Typography>
      <div style={{ height: '3vh' }}></div>
      <Typography variant="subtitle1" style={{ color: '#101010' }}>
        {currentPlayer}
      </Typography>
      <Typography variant="subtitle2" style={{ color: '#FF0000' }}>
        +{playersAdded} since {getTimestampText()}
      </Typography>
    </div>
  );
};
