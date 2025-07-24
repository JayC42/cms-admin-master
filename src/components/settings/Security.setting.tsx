import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { KeyLabelPair } from '../../utils/KeyLabelPair.ts';

function createData(label: string, key: string): KeyLabelPair {
  return { key, label };
}

const rows = [createData('修改密碼', 'password')];

export const SecuritySetting: React.FC = () => {
  const handleOperation = (code: string) => {
    switch (code) {
      case 'password':
        console.log('Change password');
        break;
      default:
        console.log('Invalid operation');
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="Security Table">
          <TableBody>
            {rows.map((row, index: number) => (
              <TableRow key={index} onClick={() => handleOperation(row.key)}>
                <TableCell>{row.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
