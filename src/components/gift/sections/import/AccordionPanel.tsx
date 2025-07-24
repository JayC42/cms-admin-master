import { Typography, Badge, styled } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import React from 'react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface AccordionPanelProps {
  expanded: boolean;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  title: string;
  badgeCount?: number;
  children: React.ReactNode;
  ariaControls: string;
  id: string;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({
  expanded,
  handleChange,
  title,
  badgeCount,
  children,
  ariaControls,
  id,
}) => {
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary aria-controls={ariaControls} id={id}>
        {badgeCount !== undefined ? (
          <Badge color="error" badgeContent={badgeCount}>
            <Typography>{title}</Typography>
          </Badge>
        ) : (
          <Typography>{title}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ maxHeight: '60vh', overflow: 'auto' }}>{children}</AccordionDetails>
    </Accordion>
  );
};
export default AccordionPanel;
