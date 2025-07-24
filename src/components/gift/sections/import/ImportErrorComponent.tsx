import { Typography } from '@mui/material';
import React from 'react';
import { ExtractionErrorObject } from './types/ExtractionErrorObject.ts';

interface Props {
  errorMessage: ExtractionErrorObject[];
}

export const ImportErrorComponent: React.FC<Props> = ({ errorMessage }) => {
  if (errorMessage.length === 0) {
    return (
      <div>
        <Typography>沒有錯誤信息</Typography>
      </div>
    );
  } else {
    return (
      <div>
        {errorMessage.map((error) => (
          <div
            key={error.index}
            style={{ textAlign: 'left' }}
            dangerouslySetInnerHTML={{
              __html: `${error.index}報錯：<br>${error.error}`,
            }}
          />
        ))}
      </div>
    );
  }
};
