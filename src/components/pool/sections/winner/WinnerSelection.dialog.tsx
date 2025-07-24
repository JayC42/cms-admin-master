import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { RewardCategoryListMap } from '../../../consts.ts';
import { formatDateTime } from '../../../../utils/dateTimeFormatter.ts';
import { useGetPoolItem } from '../../../../services/pools/getItem.pool.ts';
import { getLocalizedLabel } from '../../../../utils/getLocalizedLabel.ts';
import { VisibilityButton } from '../../../common';
import { DetailGridUnit } from '../../../common/DetailGridUnit.tsx';
import { GiftView } from '../../../gift/sections/view/Gift.view.tsx';
import { PickedWinner, usePickWinner } from '../../../../services/pools/pickWinner.pool.ts';
import { keyToLabel } from '../../../../utils/KeyLabelPair.ts';

interface PropData {
  poolId: string;
}

interface Props {
  open: boolean;
  data: PropData;
  onClose: () => void;
}

export const WinnerSelection: React.FC<Props> = ({ open, data, onClose }) => {
  const [toggleViewDialogOpen, setToggleViewDialogOpen] = useState(false);
  const [winner, setWinner] = useState<PickedWinner | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickWinner = usePickWinner();

  const { data: pool } = useGetPoolItem(
    {
      pathParams: data.poolId,
      options: {
        enabled: Boolean(open && data.poolId),
      },
    },
    {
      onFreshFetched: () => {
        setWinner(null);
      },
    },
  );

  const detail = pool?.pool;

  if (!detail) {
    return (
      <Dialog open={open} sx={{ '& .MuiDialog-paper': { maxWidth: 'lg' } }}>
        <DialogTitle>No Data</DialogTitle>
        <DialogContent dividers>抱歉，沒有找到相關獎池</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const label = getLocalizedLabel(detail.metadata.label);

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          minHeight: '60vh',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle>
        <Tooltip title={`${label.title} (${label.subTitle})`}>
          <Typography noWrap variant="h6">
            {label.title} ({label.subTitle})
          </Typography>
        </Tooltip>
      </DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1">禮品ID: {detail.giftId}</Typography>
                <VisibilityButton onClick={() => setToggleViewDialogOpen(true)} sx={{ ml: 1 }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailGridUnit
                title="禮品類型"
                value={keyToLabel(RewardCategoryListMap, detail.type)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailGridUnit
                sm={12}
                title="獎池狀態"
                value={`${detail.joinedScore}/${detail.poolQuota}`}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailGridUnit title="獎池輪次" value={detail.round} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailGridUnit sm={12} title="開啟時間" value={formatDateTime(detail.timeToOpen)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailGridUnit sm={12} title="滿額時間" value={formatDateTime(detail.timeToClose)} />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          {!winner ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography>點擊確認選擇此獎池的贏家</Typography>
              <Button
                onClick={() => {
                  setIsLoading(true);
                  pickWinner
                    .mutateAsync({ req: {}, pathParams: data.poolId })
                    .then((response) => {
                      if (response.success) {
                        setWinner(response.output);
                      }
                    })
                    .catch((error) => {
                      console.error('Error picking winner:', error);
                      // Consider adding a toast/snackbar notification here
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }}
                variant="contained"
                sx={{ minWidth: 120 }}
                disabled={isLoading}
              >
                {isLoading ? '處理中...' : '確認'}
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" color="success.main">
                  贏家挑选成功
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">贏家名字: {winner.userName}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">贏家電郵: {winner.email}</Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>

      <GiftView
        open={toggleViewDialogOpen}
        onClose={() => setToggleViewDialogOpen(false)}
        giftId={detail.giftId}
      />
    </Dialog>
  );
};
