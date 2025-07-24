import React from 'react';
import { PreviewImage } from './PreviewImage.tsx';
import { Tooltip } from '@mui/material';

type Props = {
  previewImageUrl: string;
  title: string;
  description: string;
};

export const Card: React.FC<Props> = ({ previewImageUrl, title, description }) => {
  return (
    <div style={cardContent}>
      <PreviewImage previewImageUrl={previewImageUrl} />
      <div style={tooltipArea}>
        <Tooltip title={title} placement="top">
          <div style={titleContent}>{title}</div>
        </Tooltip>
        <Tooltip title={description} placement="top">
          <div style={descriptionContent}>{description}</div>
        </Tooltip>
      </div>
    </div>
  );
};

const cardContent = {
  display: 'flex',
  flexDirection: 'row' as const,
  alignItems: 'center',
};

const tooltipArea = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'start',
  paddingLeft: '10px',
  width: 'calc(100% - 50px)',
};

const titleContent = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
};

const descriptionContent = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '12px',
  maxWidth: '100%',
};
