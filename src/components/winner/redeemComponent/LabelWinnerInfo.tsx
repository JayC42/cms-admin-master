import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  gameUserData: {
    userName: string;
    email: string;
    phoneNo: string;
    identityNo: string;
    fullName: string;
  };
  timeToAnnouncement: string;
};

const LabelWinnerInfo: React.FC<Props> = ({ gameUserData, timeToAnnouncement }: Props) => (
  <>
    <Typography variant="h6" gutterBottom color="primary">
      獲獎者資料
    </Typography>

    <Box
      sx={{
        display: 'grid',
        gap: 3,
        mb: 'auto',
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          用戶名字
        </Typography>
        <Typography>{gameUserData.userName}</Typography>
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          電郵地址
        </Typography>
        <Typography>{gameUserData.email}</Typography>
      </Box>

      {gameUserData.phoneNo !== '' && (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            電話號碼
          </Typography>
          <Typography>{gameUserData.phoneNo}</Typography>
        </Box>
      )}

      {gameUserData.identityNo !== '' && (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            身份證號碼
          </Typography>
          <Typography>{gameUserData.identityNo}</Typography>
        </Box>
      )}

      {gameUserData.fullName !== '' && (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            身份證全名
          </Typography>
          <Typography>{gameUserData.fullName}</Typography>
        </Box>
      )}

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          獲獎時間
        </Typography>
        <Typography>{new Date(timeToAnnouncement).toLocaleDateString('zh-HK')}</Typography>
      </Box>
    </Box>
  </>
);

export default LabelWinnerInfo;
