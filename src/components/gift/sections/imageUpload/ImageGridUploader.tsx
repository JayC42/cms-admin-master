import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';

interface Props {
  destination: string;
  label: string;
  style?: React.CSSProperties;
  onImageSelected: (files: File[]) => void;
}

type ImageFile = {
  file: File;
  preview: string; // Blob URL for the preview
};

export const ImageGridUploader: React.FC<Props> = ({
  destination,
  label,
  style,
  onImageSelected,
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const allowedFiles = files.filter((file) => file.type.startsWith('image/'));
      const newImages = allowedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => {
        prev.forEach((image) => URL.revokeObjectURL(image.preview));
        return [...prev, ...newImages];
      });
      onImageSelected([...images.map((img) => img.file), ...allowedFiles]);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    setImages((currentImages) => {
      const updatedImages = currentImages.filter((_, i) => i !== index);

      const deletedImage = currentImages[index];
      if (deletedImage) {
        URL.revokeObjectURL(deletedImage.preview);
      }

      onImageSelected(updatedImages.map((img) => img.file));
      return updatedImages;
    });
  };

  const renderImageGrid = (imageFiles: ImageFile[]) => {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {imageFiles.map((image, index) => (
          <div
            key={index}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <img src={image.preview} alt={`preview-${index}`} style={{ width: '100%' }} />
            <Button style={{ color: 'red' }} onClick={() => handleDeleteImage(index)}>
              移除
            </Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={style}>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Button onClick={handleButtonClick} variant="contained">
          {label}
        </Button>
      </div>
      <div style={{ margin: '15px' }}></div>
      <input
        type="file"
        ref={fileInputRef}
        id={destination}
        style={{ display: 'none' }}
        multiple
        onChange={handleFileChange}
        accept={'image/*'}
      />
      {images.length > 0 && renderImageGrid(images)}
    </div>
  );
};
