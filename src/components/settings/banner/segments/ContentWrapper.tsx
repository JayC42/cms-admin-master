import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

const Body = styled('div')`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    padding: 16px;
    gap: 16px;
  }
`;

interface Props {
  children: ReactNode;
}

const ContentWrapper = ({ children }: Props) => <Body>{children}</Body>;

export default ContentWrapper;
