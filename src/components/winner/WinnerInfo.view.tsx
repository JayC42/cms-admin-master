import { Button, Dialog, DialogActions, DialogContent, Box } from '@mui/material';
import { useGetWinnerItem } from '../../services/winner/getItem.winner.ts';
import { getLocalizedLabel } from '../../utils/getLocalizedLabel.ts';
import { AppointmentInfoSection } from './viewComponent/AppointmentInfoSection.tsx';
import { TitleComponent } from './viewComponent/TitleComponent.tsx';
import { WinnerInfoSection } from './viewComponent/WinnerInfoSection.tsx';
import { PrizeInfoSection } from './viewComponent/PrizeInfoSection.tsx';

interface Props {
  open: boolean;
  winnerId: string;
  onClose: () => void;
}

export const WinnerInfo = ({ open, winnerId, onClose }: Props) => {
  const { data } = useGetWinnerItem({
    pathParams: winnerId,
    options: { enabled: Boolean(open && winnerId) },
  });
  const detail = data?.winner;
  const appointmentInfo = data?.appointmentInfo;
  if (!detail) return null;

  const label = getLocalizedLabel(detail.label);

  return (
    <Dialog open={open} fullWidth maxWidth="lg">
      <TitleComponent id={detail.id} label={label} />

      <DialogContent sx={{ padding: '24px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <WinnerInfoSection
            gameUserData={detail.gameUserData}
            timeToAnnouncement={detail.timeToAnnouncement}
            winnerStatus={detail.winnerStatus}
          />
          <PrizeInfoSection poolId={detail.poolId} giftType={detail.giftType} />
          {appointmentInfo && appointmentInfo.length > 0 ? (
            <AppointmentInfoSection appointmentInfo={appointmentInfo[0]} />
          ) : null}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Button onClick={onClose} variant="contained" sx={{ minWidth: '120px' }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
