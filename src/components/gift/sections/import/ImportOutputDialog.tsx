import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import React, { useState } from 'react';
import { detailDialog } from '../../../componentStyles.ts';
import { OutcomeDataHeader } from './OutcomeDataHeader.tsx';
import { OutcomeDataRow } from './OutcomeDataRow.tsx';
import { GiftImageUpload } from '../imageUpload/Gift.imageUpload.tsx';
import type { BatchCreateResponse } from '../../../../services/gift/batchCreate.gift.ts';

interface Props {
  open: boolean;
  response: BatchCreateResponse;
  onClose: () => void;
}

export const ImportOutputDialog: React.FC<Props> = ({ open, response, onClose }) => {
  const [giftId, setGiftId] = useState<string>('');
  const [giftName, setGiftName] = useState<string>('');
  const [toggleImageUploadDialogOpen, setToggleImageUploadDialogOpen] = useState(false);
  const [uploadedStatus, setUploadedStatus] = useState<{ [key: string]: boolean }>({});

  const onAction = (data: any) => {
    setGiftId(data.newGiftId);
    setGiftName(data.title);
    setToggleImageUploadDialogOpen(true);
  };

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>導入結果</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Output table" size="small">
              <OutcomeDataHeader />
              <TableBody>
                {response.createdGifts.map((gift, index) => (
                  <OutcomeDataRow
                    data={gift}
                    key={index}
                    onAction={onAction}
                    uploaded={uploadedStatus[gift.newGiftId]}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
      <GiftImageUpload
        open={toggleImageUploadDialogOpen}
        onClose={(success: boolean) => {
          setToggleImageUploadDialogOpen(false);
          if (success) {
            setUploadedStatus({ ...uploadedStatus, [giftId]: true });
          }
        }}
        giftId={giftId}
        giftName={giftName}
      />
    </div>
  );
};
