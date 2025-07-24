import { InputProps, styled } from '@mui/material';
import React from 'react';

const Body = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type Props = InputProps;

const VisuallyHiddenInput: React.FC<Props> = () => <Body type="file" multiple />;

export default VisuallyHiddenInput;
