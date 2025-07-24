import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Body = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .image-container {
    min-height: 250px;
    max-height: 300px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8fafc;
    border: 2px dashed #e2e8f0;
    transition: all 0.2s ease-in-out;

    &:hover {
      border-color: #94a3b8;
    }
  }

  .image-controls {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 8px;
  }
`;

interface Props {
  children: ReactNode;
}

const ImageSection = ({ children }: Props) => <Body>{children}</Body>;

export default ImageSection;
