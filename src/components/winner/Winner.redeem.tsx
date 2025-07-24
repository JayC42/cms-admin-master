import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Toast } from '../../utils/Toast';
import { useGetWinnerItem } from '../../services/winner/getItem.winner.ts';
import { useRedeemWinner } from '../../services/winner/redeem.winner.ts';
import {
  TooltipRequiredDocument,
  UploadBox,
  UploadedFile,
  LabelAppointmentInfo,
  LabelWinnerInfo,
  GiftInfoSection,
  ConfirmationDialogAction,
  RedeemSummary,
} from './redeemComponent';

export const WinnerRedeem: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [uploadedFiles] = useState<File[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { refetch, data } = useGetWinnerItem({ pathParams: inputValue }, { enabled: false });
  const winner = data?.winner || null;
  const appointmentInfo = data?.appointmentInfo || [];
  const stockRemaining = data?.stock || 0;

  const { mutateAsync } = useRedeemWinner();
  const handleConfirmation = async () => {
    try {
      await mutateAsync({ data: { poolWinnerId: inputValue } });
      refetch();
      setOpenDialog(false);
      Toast.success('礼品兌換成功');
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <Box sx={{ minWidth: 1072, minHeight: 737, p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              label="請輸入兌換碼"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
              size="medium"
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={() => refetch()}
              sx={{
                height: 56,
                width: '100%',
              }}
            >
              查詢
            </Button>
          </Grid>
        </Grid>
      </Box>

      {winner && (
        <Grid container spacing={3} sx={{ height: 'calc(100% - 80px)' }}>
          <Grid item xs={4}>
            <GiftInfoSection data={winner} stockRemaining={stockRemaining} />
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <LabelWinnerInfo
                  gameUserData={winner.gameUserData}
                  timeToAnnouncement={winner.timeToAnnouncement}
                />

                {appointmentInfo?.[0] && (
                  <LabelAppointmentInfo appointmentInfo={appointmentInfo[0]} />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  文件上傳
                </Typography>

                <TooltipRequiredDocument />

                <UploadBox />

                {uploadedFiles.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      已上傳文件
                    </Typography>
                    {uploadedFiles.map((file, index) => (
                      <UploadedFile index={index} fileName={file.name} />
                    ))}
                  </Box>
                )}
              </CardContent>

              <Divider />

              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={
                    stockRemaining <= 0 || !winner || winner.winnerStatus !== 'winnerRegistered'
                  }
                  onClick={() => setOpenDialog(true)}
                >
                  確認兌換
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>確認兌換</DialogTitle>
        <DialogContent>
          <RedeemSummary data={winner} />
        </DialogContent>
        <ConfirmationDialogAction
          onConfirm={handleConfirmation}
          onCancel={() => setOpenDialog(false)}
        />
      </Dialog>
    </Box>
  );
};
