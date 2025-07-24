import { sidebarListItem, sidebarMargin } from '../componentStyles.ts';
import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';

type Props = {
  sections: KeyLabelPair[];
  onItemSelected: (key: string) => void;
};

const SectionList: React.FC<Props> = ({ sections, onItemSelected }) => {
  return (
    <List style={sidebarMargin}>
      {sections.map((section) => (
        <ListItem
          style={sidebarListItem}
          key={section.key}
          onClick={() => onItemSelected(section.key)}
        >
          <ListItemText>{section.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default SectionList;
