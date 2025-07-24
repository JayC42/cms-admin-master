import React from 'react';
import { Table, TableBody } from '@mui/material';
import { DataHeader, DataRow } from '../DataRow';

interface Props {
  participants: any[];
}

export const ParticipantsSection: React.FC<Props> = ({ participants }) => {
  return (
    <Table sx={{ minWidth: 500 }} aria-label="Pool Table" size="small">
      <DataHeader />
      <TableBody>
        {participants.map((row) => (
          <DataRow key={row.id} data={row} />
        ))}
      </TableBody>
    </Table>
  );
};
