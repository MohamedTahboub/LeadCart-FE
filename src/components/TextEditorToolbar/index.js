import React, { useRef, useState, useEffect } from 'react';
import shortid from 'shortid';

import {
  convertToRaw,
  EditorState,
  createWithContent,
  ContentState,
  convertFromRaw
} from 'draft-js';
import Editor, {
  createEditorStateWithText,
  createEditorState
} from 'draft-js-plugins-editor';

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';

import createInlineToolbarPlugin, {
  Separator
} from 'draft-js-inline-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  // HeadlineOneButton,
  // HeadlineTwoButton,
  // HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,

  CodeBlockButton
} from 'draft-js-buttons';

import editorStyles from './style.css';

// const alignmentPlugin = createAlignmentPlugin();
// const { AlignmentTool } = alignmentPlugin;

// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;
// const plugins = [inlineToolbarPlugin];

const CustomInlineToolbarEditor = ({
  state,
  onEdited,
  rowTextState,
  ...props
}) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(rowTextState))
  );
  const [{ plugins, InlineToolbar }] = useState(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const { InlineToolbar } = inlineToolbarPlugin;
    const plugins = [inlineToolbarPlugin];
    return {
      plugins,
      InlineToolbar
    };
  });

  const editor = useRef(null);

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const focus = () => editor.current.focus();

  useEffect(() => {
    setEditorState(EditorState.createWithContent(convertFromRaw(rowTextState)));
  }, [rowTextState]);

  const onBlur = (state) => {
    const contentState = convertToRaw(editorState.getCurrentContent());
    onEdited && onEdited(contentState);
  };
  return (
    <div className={editorStyles.editor} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        onBlur={onBlur}
        plugins={plugins}
        ref={editor}
      />
      <InlineToolbar>
        {// may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <div className='flex-container '>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              <Separator {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
            </div>
          )}
      </InlineToolbar>
    </div>
  );
};

CustomInlineToolbarEditor.defaultProps = {
  rowTextState: convertToRaw(ContentState.createFromText('Editable Text'))
};
export default CustomInlineToolbarEditor;
