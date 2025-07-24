import { Alert, Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import { WinnerDetail } from '../../../services/winner/getItem.winner.ts';
import { getLocalizedLabel } from '../../../utils/getLocalizedLabel.ts';
import { keyToLabel } from '../../../utils/KeyLabelPair.ts';
import { RewardCategoryListMap } from '../../consts.ts';
import { getStatusConfig } from './index.ts';

type Props = {
  data: WinnerDetail;
  stockRemaining: number;
};

const GiftInfoSection = ({ data, stockRemaining }: Props) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" color="primary">
          獎品資訊
        </Typography>
        {data.winnerStatus && <Chip {...getStatusConfig(data.winnerStatus)} size="small" />}
      </Box>

      <Alert severity={stockRemaining > 0 ? 'success' : 'error'} sx={{ my: 2 }}>
        現存數量：{stockRemaining}
      </Alert>

      <Box sx={{ mb: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          {getLocalizedLabel(data.label, 'en-GB').title}
        </Typography>
        <Typography color="text.secondary">
          {getLocalizedLabel(data.label, 'en-GB').subTitle}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          '& > div': {
            display: 'grid',
            gap: 0.5,
          },
        }}
      >
        <Box>
          <Typography variant="body2" color="text.secondary">
            獎品類型
          </Typography>
          <Typography>{keyToLabel(RewardCategoryListMap, data.giftType)}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            產品ID
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.giftId}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            遊戲ID
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.poolId}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default GiftInfoSection;
