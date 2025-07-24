import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material';

const Body = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

type Props = BoxProps & {
  src: string;
  alt: string;
  onClick?: () => void;
};

const PreviewImage = ({ src, alt, onClick }: Props) => (
  <Body src={src} alt={alt} onClick={onClick} />
);

export default PreviewImage;
