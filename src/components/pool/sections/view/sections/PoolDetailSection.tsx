import React from 'react';
import { Grid, Typography } from '@mui/material';
import { VisibilityButton } from '../../../../common';
import { DetailGridUnit } from '../../../../common/DetailGridUnit';
import { RewardCategoryListMap } from '../../../../consts';
import { formatDateTime } from '../../../../../utils/dateTimeFormatter';
import { keyToLabel } from '../../../../../utils/KeyLabelPair';
import { PoolDetail } from '../../../../../services/pools/getItem.pool';

interface Props {
  detail: PoolDetail;
  onGiftClick: () => void;
}

export const PoolDetailSection: React.FC<Props> = ({ detail, onGiftClick }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="subtitle1" style={{ alignContent: 'center' }}>
            禮品ID: {detail.giftId}
          </Typography>
          <VisibilityButton onClick={onGiftClick} />
        </div>
      </Grid>
      <DetailGridUnit title="禮品類型" value={keyToLabel(RewardCategoryListMap, detail.type)} />
      <DetailGridUnit title="獎池狀態" value={`${detail.joinedScore}/${detail.poolQuota}`} />
      <DetailGridUnit title="獎池輪次" value={detail.round} />
      <DetailGridUnit title="開啟時間" value={formatDateTime(detail.timeToOpen)} />
      <DetailGridUnit title="開獎時間" value={formatDateTime(detail.timeToAnnounceWinner)} />
    </Grid>
  );
};
