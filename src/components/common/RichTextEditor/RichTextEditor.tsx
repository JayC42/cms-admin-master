import './RichTextEditor.styles.scss';
import { EditorProvider, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { TextStyle, TextStyleOptions } from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import React from 'react';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import YouTube from '@tiptap/extension-youtube';
import MenuBar from './MenuBar.tsx';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
  YouTube.configure({
    controls: false,
    nocookie: true,
  }),
];

type Props = {
  locale?: string;
  content?: string;
  onChange: (editor: Editor) => void;
};

const RichTextEditor: React.FC<Props> = ({ content = '', onChange }) => {
  return (
    <div style={{ height: '40vh', width: '100%', border: '1px solid black', overflow: 'auto' }}>
      <EditorProvider
        slotBefore={<MenuBar content={content} />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => {
          onChange(editor);
        }}
      ></EditorProvider>
    </div>
  );
};

export default RichTextEditor;
