import React from 'react';
import 'react-quill/dist/quill.bubble.css';
import 'quill-mention/dist/quill.mention.css';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import {
  formats,
  headingFormats,
  headingModules,
  mentionModule,
  modules
} from './config';

import './style.css';

const Editor = ({
  value: htmlValue,
  theme = 'bubble',
  headingMode,
  onEdit,
  onBlur,
  bounds,
  isMentionsSupported,
  className
}) => {
  const editorProps = {
    modules: headingMode ? headingModules : modules,
    formats: headingMode ? headingFormats : formats
  };

  if (isMentionsSupported)
    editorProps.modules.mention = mentionModule;


  return (
    <ReactQuill
      className={className}
      theme={theme}
      scrollingContainer='body'
      onChange={onEdit}
      onBlur={onBlur}
      value={htmlValue}
      bounds={bounds}
      {...editorProps}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onBlur: PropTypes.func,
  headingMode: PropTypes.bool
};

Editor.defaultProps = {
  value: 'Add Your Description Here',
  onEdit: () => { },
  headingMode: false
};

export default Editor;
