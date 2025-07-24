import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import React from 'react';

type Props = {
  imageLength: number;
  onShowImageDialogClicked: () => void;
};

export const ImageSection = ({ imageLength, onShowImageDialogClicked }: Props) => {
  if (imageLength === 0) {
    return null;
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          圖片
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button variant="outlined" onClick={onShowImageDialogClicked} startIcon={<ImageIcon />}>
          查看圖片 ({imageLength})
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};
