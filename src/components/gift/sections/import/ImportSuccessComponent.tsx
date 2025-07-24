import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ImportDataHeader } from './ImportDataHeader.tsx';
import { ImportDataRow } from './ImportDataRow.tsx';
import { ViewDraftDialog } from './ViewDraftDialog.tsx';
import { ExtractionDataObject } from './types/ExtractionDataObject.ts';

interface Props {
  giftObject: ExtractionDataObject[];
  onRemove: (target: ExtractionDataObject) => void;
}

export const ImportSuccessComponent: React.FC<Props> = ({ giftObject, onRemove }) => {
  const [toggleViewDialog, setToggleViewDialog] = useState(false);

  const [passingData, setPassingData] = useState<ExtractionDataObject | null>(null);

  if (giftObject.length === 0) {
    return (
      <div>
        <Typography>沒有禮品信息上傳</Typography>
      </div>
    );
  } else {
    const onAction = (data: ExtractionDataObject, action: string) => {
      switch (action) {
        case 'view':
          setToggleViewDialog(true);
          setPassingData(data);
          break;
        case 'delete':
          onRemove(data);
          break;
        default:
          break;
      }
    };

    return (
      <div>
        <TableContainer sx={{ width: '100%' }}>
          <Table aria-label="Import Table" size="small">
            <ImportDataHeader />
            <TableBody>
              {giftObject.map((gift, index) => (
                <ImportDataRow key={index} data={gift} onAction={onAction} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {passingData && (
          <ViewDraftDialog
            open={toggleViewDialog}
            data={passingData}
            onClose={() => setToggleViewDialog(false)}
          />
        )}
      </div>
    );
  }
};
