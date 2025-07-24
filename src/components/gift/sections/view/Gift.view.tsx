import { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getLocalizedLabel } from '../../../../utils/getLocalizedLabel.ts';
import { GalleryList } from './GalleryList.tsx';
import { GiftPoolList } from './GiftPoolList.tsx';
import { useGetGiftByIdApi } from '../../../../services/gift/getById.gift.ts';
import { TitleRow } from './segments/TitleRow.tsx';
import { SubtitleRow } from './segments/SubtitleRow.tsx';
import { BasicInformation } from './segments/BasicInformation.tsx';
import { WinnerSelection } from './segments/WinnerSelection.tsx';
import { TimeInfo } from './segments/TimeInfo.tsx';
import { RedemptionRule } from './segments/RedemptionRule.tsx';
import { DeliveryOptions } from './segments/DeliveryOptions.tsx';
import { PoolRecords } from './segments/PoolRecords.tsx';
import { ImageSection } from './segments/ImageSection.tsx';

interface Props {
  open: boolean;
  giftId: string;
  onClose: () => void;
}

export const GiftView = ({ open, giftId = '', onClose }: Props) => {
  const [toggleShowImageDialog, setToggleShowImageDialog] = useState(false);
  const [toggleShowListDialog, setToggleShowListDialog] = useState(false);

  const { data } = useGetGiftByIdApi({
    pathParams: giftId,
    options: { enabled: Boolean(open && giftId) },
  });

  const label = data?.success ? getLocalizedLabel(data?.label) : null;

  return (
    <div>
      {data && data.success && label ? (
        <Dialog open={open} fullWidth maxWidth="lg">
          <DialogTitle sx={{ p: 0 }}>
            {/* Header Section */}
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              {/* Title and Badge Row */}
              <TitleRow
                title={label.title}
                label={data.label}
                badgeCode={data.badgeCode}
                id={data.id}
              />

              {/* Subtitle and Tags Row */}
              <SubtitleRow label={data.label} subTitle={label.subTitle} tags={data.tags} />
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <BasicInformation
                market={data.market}
                type={data.type}
                poolQuota={data.poolQuota}
                weightage={data.weightage}
              />

              <WinnerSelection
                autoSelectWinner={data.autoSelectWinner}
                winnerSelectionTime={data.winnerSelectionTime}
                redeemPerSlot={data.redeemOption.allowedRedeemPerSlot}
              />

              <TimeInfo
                timeToPublic={data.timeToPublic}
                timeToRelease={data.timeToRelease}
                timeToRemove={data.timeToRemove}
                createdAt={data.createdAt}
                updatedAt={data.updatedAt}
              />

              <RedemptionRule redeemOption={data.redeemOption} />

              <DeliveryOptions deliveryOption={data.deliveryOption} />

              <PoolRecords onListButtonClicked={() => setToggleShowListDialog(true)} />

              {/* Images Section */}
              <ImageSection
                imageLength={data.image.length}
                onShowImageDialogClicked={() => setToggleShowImageDialog(true)}
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} color="primary">
              關閉
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      {data && data.success ? (
        <>
          {/* Image Gallery Dialog */}
          <GalleryList
            open={toggleShowImageDialog}
            images={data.image}
            onClose={() => setToggleShowImageDialog(false)}
          />
          {/* Gift Pool List Dialog */}
          <GiftPoolList
            open={toggleShowListDialog}
            onClose={() => setToggleShowListDialog(false)}
            data={{ id: data.id, label: label ? `${label.title} ${label.subTitle}` : '' }}
          />
        </>
      ) : null}
    </div>
  );
};
