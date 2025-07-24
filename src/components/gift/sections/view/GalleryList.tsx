import { ImagePairObject } from '../../../../models/ImagePairObject.ts';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { detailDialog } from '../../../componentStyles.ts';

interface Props {
  open: boolean;
  images?: ImagePairObject[];
  onClose: () => void;
}

export const GalleryList: React.FC<Props> = ({ open, images, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);
  const selectedFullImage = images ? images[selectedImageIndex].fullImage : '';

  return (
    <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
      <DialogTitle sx={sxStyles.dialogTitle}>
        <div style={{ fontSize: '1.5rem', fontWeight: 500 }}>圖片預覽</div>
      </DialogTitle>
      <DialogContent sx={sxStyles.content}>
        {images && images.length > 0 ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
          >
            {/* Full image display with improved styling */}
            <div style={sxStyles.imageContainer}>
              {selectedFullImage ? (
                <img src={selectedFullImage} alt="full" style={sxStyles.fullImageContainer} />
              ) : (
                <p>No image available</p>
              )}
            </div>

            {/* Thumbnail container with improved styling */}
            <div style={sxStyles.thumbnailContainer}>
              {images.map((image, index) => (
                <div
                  key={index}
                  style={thumbnailStyles(selectedImageIndex, index)}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.previewImage}
                    alt={`preview ${index}`}
                    style={sxStyles.previewImage}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>沒有圖片</p>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ minWidth: '100px' }}>
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const sxStyles = {
  dialogTitle: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  content: { p: 3 },
  imageContainer: {
    width: '100%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  fullImageContainer: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
  },
  thumbnailContainer: {
    display: 'flex' as const,
    gap: '10px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center' as const,
    maxWidth: '800px',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
};

const thumbnailStyles = (selectedImageIndex: number, index: number) => ({
  width: '80px',
  height: '80px',
  border: selectedImageIndex === index ? '3px solid #1976d2' : '3px solid transparent',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});
