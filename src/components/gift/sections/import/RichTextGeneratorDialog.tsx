import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import RichTextEditor from '../../../common/RichTextEditor/RichTextEditor.tsx';

interface Props {
  open: boolean;
  onClose: () => void;
}
export const RichTextGeneratorDialog: React.FC<Props> = ({ open, onClose }) => {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth={true} maxWidth={'lg'}>
      <DialogTitle>HTML生成工具</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ maxWidth: '68%' }}>
            <RichTextEditor onChange={(editor) => handleContentChange(editor.getHTML())} />
          </div>
          <div
            style={{
              width: '30%',
              marginLeft: '2%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ textAlign: 'center', fontSize: '25px' }}>HTML代碼（點擊代碼複製）</div>
            <div
              style={{
                height: '1px',
                backgroundColor: 'grey',
                opacity: '0.5',
                margin: '1px',
              }}
            ></div>
            <div>{content}</div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="secondary">
          關閉
        </Button>
      </DialogActions>
    </Dialog>
  );
};
