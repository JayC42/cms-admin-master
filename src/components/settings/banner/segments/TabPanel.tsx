import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Body = styled('div')`
  padding: 24px 0;
`;

interface Props {
  key: string;
  hidden: boolean;
  children: ReactNode;
}

const TabPanel = ({ key, hidden, children }: Props) => (
  <Body key={key} role="tabpanel" hidden={hidden}>
    {children}
  </Body>
);

export default TabPanel;
