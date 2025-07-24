import React, { forwardRef } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { RewardCategoryListMap } from '../../../consts.ts';
import { formatDate } from '../../../../utils/dateTimeFormatter.ts';
import { DeleteButton, EditButton, VisibilityButton } from '../../../common';
import { getLocalizedLabel } from '../../../../utils/getLocalizedLabel.ts';
import { DataRowThumbnail } from '../../../common/DataRowThumbnail.tsx';
import { AddImageButton } from '../../../common/buttons/AddImageButton.tsx';
import { keyToLabel } from '../../../../utils/KeyLabelPair.ts';
import { GiftListItem } from '../../../../services/gift/getList.gift.ts';

export type RowAction = 'view' | 'edit' | 'imageUpload' | 'delete';

interface Props {
  data: GiftListItem;
  onAction: (object: GiftListItem, action: RowAction) => void;
}

export const DataRow = forwardRef<HTMLTableRowElement, Props>(({ data, onAction }, ref) => {
  const removalDate = data.timeToRemove ? new Date(data.timeToRemove) : null;
  const currentDate = new Date();
  const isDeletionAllowed = removalDate ? currentDate < removalDate : true;
  const label = getLocalizedLabel(data.label);

  const opacityStyle = { opacity: isDeletionAllowed ? 1 : 0.5 };
  return (
    <TableRow ref={ref} key={data.id} style={{ width: '100%' }}>
      <TableCell component="th" scope="row" style={{ maxWidth: 'calc(30vw - 780px)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'clip',
            ...opacityStyle,
          }}
          title={`${label.title} - ${label.subTitle}`}
        >
          <DataRowThumbnail imageList={data.image} />
          <span
            style={{ marginLeft: '8px', maxWidth: 'calc(30vw - 780px)' }}
          >{`${label.title} - ${label.subTitle}`}</span>
        </div>
      </TableCell>
      <TableCell align="right" style={{ width: 110 }}>
        {data.poolQuota}
      </TableCell>
      <TableCell align="right" style={{ width: 110 }}>
        {keyToLabel(RewardCategoryListMap, data.type)}
      </TableCell>
      <TableCell align="right" style={{ width: 180 }}>
        {formatDate(data.timeToPublic)}
      </TableCell>
      <TableCell align="right" style={{ width: 180 }}>
        {formatDate(data.timeToRelease)}
      </TableCell>
      <TableCell align="center" style={{ width: 200 }}>
        <VisibilityButton onClick={() => onAction(data, 'view')} />
        <AddImageButton onClick={() => onAction(data, 'imageUpload')} />
        <EditButton onClick={() => onAction(data, 'edit')} />
        <DeleteButton onClick={() => onAction(data, 'delete')} disabled={!isDeletionAllowed} />
      </TableCell>
    </TableRow>
  );
});
