import { Button, SxProps, Theme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';

interface Props {
  label: string;
  onFileSelected: (file: File | null) => void;
  maxImageWidth?: number;
  maxImageHeight?: number;
  maxFileSize?: number;
  maxImageDisplayHeight?: number;
  sx?: SxProps<Theme>;
  inputId: string;
  defaultImageUrl?: string;
}

export const ImageUploader: React.FC<Props> = ({
  label,
  onFileSelected,
  maxImageWidth,
  maxImageHeight,
  maxFileSize,
  maxImageDisplayHeight,
  sx,
  inputId,
  defaultImageUrl,
}) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(
    `${defaultImageUrl}_${inputId}` || null,
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      setImageSrc(null);
      onFileSelected(null);
      return;
    }

    if (maxFileSize && file.size > maxFileSize) {
      alert('File size should not exceed ' + (maxFileSize / 1024 / 1024).toFixed(2) + ' MB');
      onFileSelected(null);
      return;
    }

    const img = new Image();
    const src = URL.createObjectURL(file);
    img.src = src;
    img.onload = () => {
      if (maxImageWidth && img.width > maxImageWidth) {
        alert(`Image width should not exceed ${maxImageWidth}px`);
        onFileSelected(null);
      } else if (maxImageHeight && img.height > maxImageHeight) {
        alert(`Image height should not exceed ${maxImageHeight}px`);
        onFileSelected(null);
      } else {
        setImageSrc(src); // Set image source for preview
        onFileSelected(file); // Pass valid file back to parent
      }
    };
  };

  return (
    <div style={sx as React.CSSProperties}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={inputId}
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor={inputId}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          {label}
        </Button>
      </label>
      {imageSrc && (
        <div style={{ marginLeft: '10px' }}>
          <img
            src={imageSrc}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: maxImageDisplayHeight }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
