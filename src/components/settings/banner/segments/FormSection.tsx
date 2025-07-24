import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const Body = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

interface Props {
  children: ReactNode;
}

const FormSection = ({ children }: Props) => <Body>{children}</Body>;

export default FormSection;
