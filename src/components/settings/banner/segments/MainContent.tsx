import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Body = styled('div')``;

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => <Body>{children}</Body>;

export default MainContent;
