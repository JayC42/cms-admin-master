import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Body = styled('div')`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

interface Props {
  children: ReactNode;
}

const HeaderSection = ({ children }: Props) => <Body>{children}</Body>;

export default HeaderSection;
