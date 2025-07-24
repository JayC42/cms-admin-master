import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, CircularProgress } from '@mui/material';
import { useGetDashboardInfo } from '../../services/dashboard/getDashboardInfo.dashboard';

const PFundLineChart = () => {
  const { data, isLoading, error } = useGetDashboardInfo();

  if (isLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div>
        <Typography variant="h5" component="h2">
          Overview of P Fund (By Category)
        </Typography>
        <div style={{ height: '6vh' }}></div>
        <Typography variant="body2" style={{ color: '#ff0000' }}>
          Error loading data
        </Typography>
      </div>
    );
  }

  // Transform API data to chart format
  const chartData =
    data.pastPFund?.map((monthData) => {
      const result: { [key: string]: string | number } = { month: monthData.month };
      monthData.data.forEach((item) => {
        result[item.name] = item.value;
      });
      return result;
    }) || [];

  return (
    <div>
      <Typography variant="h5" component="h2">
        Overview of P Fund (By Category)
      </Typography>
      <div style={{ height: '6vh' }}></div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="Food" type="monotone" dataKey="food" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line
            name="Electronic"
            type="monotone"
            dataKey="electronic"
            stroke="#3154d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PFundLineChart;
