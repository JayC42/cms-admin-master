import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  Tab,
  Tabs,
  Paper,
  Grid,
  Stack,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmailIcon from '@mui/icons-material/Email';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { formatDate } from '../../../../utils/dateTimeFormatter';
import { RewardCategoryListMap } from '../../../consts';
import { BadgeComponent } from '../../../common/BadgeComponent';
import { TagsComponent } from '../../../common/TagsComponent';
import { keyToLabel } from '../../../../utils/KeyLabelPair';
import { ExtractionDataObject } from './types/ExtractionDataObject';
import { DraftHtmlPreviewDialog } from './DraftHtmlPreviewDialog';

interface Props {
  open: boolean;
  data: ExtractionDataObject;
  onClose: () => void;
}

const DeliveryIcon = {
  delivery: LocalShippingIcon,
  pickup: StorefrontIcon,
  email: EmailIcon,
};

export const ViewDraftDialog: React.FC<Props> = ({ open, data, onClose }) => {
  const [currentLocale, setCurrentLocale] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const renderTimeInfo = () => (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTimeIcon color="action" />
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">時間安排</Typography>
          <Typography variant="body2">開放時間：{formatDate(data.timeToPublic)}</Typography>
          <Typography variant="body2">發布時間：{formatDate(data.timeToRelease)}</Typography>
          <Typography variant="body2">
            結束時間：{data.timeToRemove ? formatDate(data.timeToRemove) : '永不過期'}
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          可兌換時段
        </Typography>
        {data.redeemTimeSlot ? (
          <Box sx={sxStyle.redeemTimeSlotBox}>
            <Grid container spacing={1} sx={{ pr: 1 }}>
              {data.redeemTimeSlot.map((slot) => (
                <Grid item key={slot}>
                  <Chip label={slot} size="small" variant="outlined" />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            使用系統預設時段
          </Typography>
        )}
      </Box>
    </Stack>
  );

  const renderDeliveryOptions = () => (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        領取方式
      </Typography>
      <Stack direction="row" spacing={1}>
        {data.deliveryOption.map((option) => {
          const Icon = DeliveryIcon[option as keyof typeof DeliveryIcon];
          return (
            <Chip
              key={option}
              icon={Icon ? <Icon /> : <div />}
              label={option}
              variant="outlined"
              size="small"
            />
          );
        })}
      </Stack>
    </Box>
  );

  const renderAutoSelection = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <AutorenewIcon color="action" />
      <Stack spacing={0.5}>
        <Typography variant="subtitle2">自動選擇</Typography>
        <Typography variant="body2">
          {data.autoSelectWinner ? `自動 (${data.winnerSelectionTime}分鐘)` : '手動'}
        </Typography>
      </Stack>
    </Box>
  );

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6">草稿（{data.id}）</Typography>
              <BadgeComponent badges={data.badgeCode} />
              <TagsComponent tags={data.tags} />
            </Box>
            <Chip
              label={keyToLabel(RewardCategoryListMap, data.type)}
              size="small"
              color="primary"
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Content Tabs */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Tabs
                value={currentLocale}
                onChange={(_, value) => setCurrentLocale(value)}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                {data.label.map((item, index) => (
                  <Tab key={item.locale} label={item.locale} value={index} />
                ))}
              </Tabs>
              <Box sx={{ p: 1 }}>
                <Typography variant="h6">{data.label[currentLocale].title || '-'}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {data.label[currentLocale].subTitle || '-'}
                </Typography>
              </Box>
            </Paper>

            <Divider />

            {/* Details Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {renderTimeInfo()}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  {renderAutoSelection()}
                  {renderDeliveryOptions()}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      配額設定
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">獎池上限：{data.poolQuota}</Typography>
                      <Typography variant="body2">
                        可兌換人數：{data.redeemCapacity || '使用系統預設值'}
                      </Typography>
                      <Typography variant="body2">
                        最大預約天數：{data.maximumAllowedAppointment || '使用系統預設值'}
                      </Typography>
                      <Typography variant="body2">
                        最小預約天數：{data.minimumAllowedAppointment || '使用系統預設值'}
                      </Typography>
                      <Typography variant="body2">
                        提醒天數：{data.secondReminder || '使用系統預設值'}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setPreviewOpen(true)} color="primary">
            詳情預覽
          </Button>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>

      <DraftHtmlPreviewDialog
        open={previewOpen}
        labels={data.label}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
};

const sxStyle = {
  redeemTimeSlotBox: {
    maxHeight: '120px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
      '&:hover': {
        background: '#666',
      },
    },
  },
};
