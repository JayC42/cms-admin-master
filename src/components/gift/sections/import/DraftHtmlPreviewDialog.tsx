import React from 'react';
import { TranslationObject } from '../../../../models/TranslationObject';
import { detailDialog } from '../../../componentStyles.ts';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';

interface Props {
  open: boolean;
  labels: TranslationObject[];
  onClose: () => void;
}

export const DraftHtmlPreviewDialog: React.FC<Props> = ({ open, labels, onClose }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const validLabels = labels.filter((label) => label.description);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'xs'}>
        <DialogTitle>詳細信息預覽</DialogTitle>
        <DialogContent dividers>
          <Tabs value={selectedTab} onChange={handleChange}>
            {validLabels.map((label, index) => (
              <Tab label={label.locale} key={index} />
            ))}
          </Tabs>
          <div dangerouslySetInnerHTML={{ __html: validLabels[selectedTab].description }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
