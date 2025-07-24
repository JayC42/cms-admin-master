import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableContainer,
} from '@mui/material';
import React from 'react';
import { PoolDetailSection } from './sections/PoolDetailSection';
import { ParticipantsSection } from './sections/ParticipantsSection';
import { GiftView } from '../../../gift/sections/view/Gift.view';
import { detailDialog } from '../../../componentStyles';
import { useGetPoolItem } from '../../../../services/pools/getItem.pool';
import { getLocalizedLabel } from '../../../../utils/getLocalizedLabel';
import { useGetPoolParticipant } from '../../../../services/pools/getParticipant.pool';

interface PropData {
  poolId: string;
}

interface Props {
  open: boolean;
  data: PropData;
  onClose: () => void;
}

export const PoolInfo = ({ open, onClose, data }: Props) => {
  const [giftViewOpen, setGiftViewOpen] = React.useState(false);
  const { data: pool } = useGetPoolItem({
    pathParams: data.poolId,
    options: { enabled: Boolean(open && data.poolId) },
  });
  const { data: participant } = useGetPoolParticipant({
    pathParams: data.poolId,
    options: { enabled: Boolean(open && data.poolId) },
  });

  const participants = participant?.items;

  const handleGiftDetailClick = () => {
    setGiftViewOpen(true);
  };
  const detail = pool?.pool;
  if (!detail) {
    return (
      <Dialog open={open} style={detailDialog} fullWidth maxWidth="lg">
        <DialogTitle>{data.poolId}</DialogTitle>
        <DialogContent dividers>抱歉，沒有找到相關獎池</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    );
  }
  const label = getLocalizedLabel(detail.metadata.label);

  return (
    <Dialog open={open} style={detailDialog} fullWidth maxWidth="lg">
      <DialogTitle>{`${label?.title} (${label?.subTitle})`}</DialogTitle>
      <DialogContent dividers>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pool Details Section */}
          <Paper sx={{ p: 2.5 }}>
            <PoolDetailSection detail={detail} onGiftClick={handleGiftDetailClick} />
          </Paper>

          {/* Participants Table Section */}
          {participants ? (
            <TableContainer component={Paper}>
              <ParticipantsSection participants={participants} />
            </TableContainer>
          ) : null}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>

      <GiftView open={giftViewOpen} onClose={() => setGiftViewOpen(false)} giftId={detail.giftId} />
    </Dialog>
  );
};
