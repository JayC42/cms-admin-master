import { Typography, CircularProgress } from '@mui/material';
import { useGetDashboardInfo } from '../../services/dashboard/getDashboardInfo.dashboard';

export const TotalPFundComponent: React.FC = () => {
  const { data, isLoading, error } = useGetDashboardInfo();

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
          Total Joined P Fund
        </Typography>
        <div style={{ height: '3vh' }}></div>
        <Typography variant="body2" style={{ color: '#ff0000' }}>
          Error loading data
        </Typography>
      </div>
    );
  }

  const { totalPfund, newPfund } = data.info;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h5" component="h2" style={{ color: '#000000' }}>
        Total Joined P Fund
      </Typography>
      <div style={{ height: '3vh' }}></div>
      <Typography variant="subtitle1" style={{ color: '#101010' }}>
        {totalPfund}
      </Typography>
      <Typography variant="subtitle2" style={{ color: '#FF0000' }}>
        +{newPfund} recently
      </Typography>
    </div>
  );
};
