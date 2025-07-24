import React, { useEffect } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import {
  RiBold,
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiStrikethrough,
} from 'react-icons/ri';
import { FaHighlighter, FaYoutube } from 'react-icons/fa';
import { ImClearFormatting } from 'react-icons/im';
import { VscClearAll, VscNewline } from 'react-icons/vsc';
import { BsTextParagraph } from 'react-icons/bs';
import { GrBlockQuote } from 'react-icons/gr';
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdHorizontalRule,
} from 'react-icons/md';
import { IoMdRedo, IoMdUndo } from 'react-icons/io';

const MenuBar: React.FC<{ content?: string }> = ({ content }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!editor) return;
    if (editor.isEmpty) {
      if (content === undefined) {
        return;
      }
      editor.commands.setContent(content || '', true, {
        preserveWhitespace: true,
      });
    }
  }, [content, editor]);

  if (!editor) return null;

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 320,
        height: 180,
      });
    }
  };

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <RiBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <RiItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <RiStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <RiCodeSSlashLine />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
        >
          <FaHighlighter />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <ImClearFormatting />
        </button>
        <div className="divider"></div>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <VscClearAll />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <BsTextParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          <RiH1 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <RiH2 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <RiH3 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          <RiH4 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          <RiH5 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          <RiH6 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <RiListUnordered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <RiListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBoxLine />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <GrBlockQuote />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MdHorizontalRule />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <VscNewline />
        </button>

        <div className="divider"></div>

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <MdFormatAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          <MdFormatAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <MdFormatAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        >
          <MdFormatAlignJustify />
        </button>

        <div className="divider"></div>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <IoMdUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <IoMdRedo />
        </button>

        <div className="divider"></div>

        <button id="add" onClick={addYoutubeVideo}>
          <FaYoutube />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
