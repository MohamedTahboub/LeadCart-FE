import React from 'react';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import './style.css';
import {
  formats,
  headingFormats,
  headingModules,
  modules
} from './config';

const Editor = ({
  value: htmlValue,
  theme = 'bubble',
  headingMode,
  onEdit,
  onBlur,
  bounds
  // uploadFile
}) => {
  const editorProps = {
    modules: headingMode ? headingModules : modules,
    formats: headingMode ? headingFormats : formats
  };
  return (
    <ReactQuill
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
