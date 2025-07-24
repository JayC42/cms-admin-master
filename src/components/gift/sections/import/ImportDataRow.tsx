import React from 'react';
import { Box, Chip, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { formatDate } from '../../../../utils/dateTimeFormatter';
import { DeleteButton, VisibilityButton } from '../../../common';
import { RewardCategoryListMap } from '../../../consts';
import { keyToLabel } from '../../../../utils/KeyLabelPair';
import { ExtractionDataObject } from './types/ExtractionDataObject.ts';

interface Props {
  data: ExtractionDataObject;
  onAction: (data: ExtractionDataObject, action: 'view' | 'delete') => void;
}

export const ImportDataRow: React.FC<Props> = ({ data, onAction }) => {
  const mainLabel = data.label.find((l) => l.title && l.subTitle) || data.label[0];

  return (
    <TableRow hover>
      <TableCell width="30%">
        <Box sx={{ maxWidth: '100%' }}>
          <Tooltip title={mainLabel.title}>
            <Typography noWrap fontWeight="medium">
              {mainLabel.title || '-'}
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" noWrap>
            {mainLabel.subTitle || '-'}
          </Typography>
        </Box>
      </TableCell>

      <TableCell width="10%">
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            label={keyToLabel(RewardCategoryListMap, data.type)}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </TableCell>

      <TableCell width="15%">
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {data.badgeCode?.map((badge) => (
            <Chip
              key={badge}
              label={badge}
              size="small"
              color={badge === 'new' ? 'success' : 'default'}
              variant="outlined"
            />
          ))}
        </Box>
      </TableCell>

      <TableCell width="15%" align="center">
        <Typography>{data.poolQuota}</Typography>
        <Typography variant="caption" color="text.secondary">
          贏家自動生成: {data.autoSelectWinner ? '是' : '否'}
        </Typography>
      </TableCell>

      <TableCell width="25%">
        <Typography noWrap>{formatDate(data.timeToPublic)}</Typography>
        {data.timeToRemove && (
          <Typography variant="caption" color="text.secondary" noWrap>
            結束: {formatDate(data.timeToRemove)}
          </Typography>
        )}
      </TableCell>

      <TableCell width="10%" align="right" sx={{ whiteSpace: 'nowrap' }}>
        <VisibilityButton onClick={() => onAction(data, 'view')} />
        <DeleteButton onClick={() => onAction(data, 'delete')} />
      </TableCell>
    </TableRow>
  );
};
