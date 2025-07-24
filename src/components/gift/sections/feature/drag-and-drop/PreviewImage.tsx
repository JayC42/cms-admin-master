import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import React from 'react';

type Props = {
  previewImageUrl: string | null;
};

const styles = {
  container: {
    width: '50px',
    height: '50px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  icon: {
    width: '30px',
    height: '30px',
    color: '#bdc3c7',
  },
};

export const PreviewImage: React.FC<Props> = ({ previewImageUrl = null }) => {
  return (
    <div style={styles.container}>
      {previewImageUrl ? (
        <img style={styles.image} src={previewImageUrl} alt="Image Preview" />
      ) : (
        <BrokenImageIcon style={styles.icon} />
      )}
    </div>
  );
};
