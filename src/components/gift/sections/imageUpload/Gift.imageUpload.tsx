import React, { useState } from 'react';
import { detailDialog, displayFlexRow } from '../../../componentStyles.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ImageGridUploader } from './ImageGridUploader.tsx';
import { Toast } from '../../../../utils/Toast.ts';
import { useUploadImage } from '../../../../services/gift/uploadImage.gift.ts';

interface Props {
  open: boolean;
  giftId: string;
  giftName: string;
  onClose: (success: boolean) => void;
}

export const GiftImageUpload: React.FC<Props> = ({ open, giftId, giftName, onClose }) => {
  const [fullImages, setFullImages] = useState<File[]>([]);

  const handleFullFileChange = (files: File[]) => {
    setFullImages([...files]);
  };

  const { mutateAsync } = useUploadImage();

  const onSubmit = async () => {
    const formData = new FormData();
    for (const file of fullImages) {
      const compressedBuffer = await compressImage(file);
      formData.append('full', file);
      formData.append('preview', compressedBuffer);
    }
    try {
      await mutateAsync({ data: formData, pathParams: giftId });
      Toast.success('圖片上傳成功。');
    } catch (error) {
      console.log(error);
      Toast.error('圖片上傳失敗。');
    }
  };

  const compressImage = async (file: File, maxWidth = 200, maxHeight = 200): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Failed to get canvas context.'));
            return;
          }
          let { width, height } = img;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            } else {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Canvas toBlob failed.'));
              }
            },
            file.type,
            0.8,
          );
        };

        img.onerror = (error) => reject(error);
        img.src = reader.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <Dialog open={open} style={detailDialog} fullWidth={true} maxWidth={'lg'}>
        <DialogTitle>{giftName}</DialogTitle>
        <DialogContent>
          <div style={displayFlexRow}>
            <ImageGridUploader
              destination="fullImages"
              label="上傳禮品全圖"
              style={{ width: '100%' }}
              onImageSelected={handleFullFileChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            上傳
          </Button>
          <Button onClick={() => onClose(false)} color="primary">
            關閉
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
