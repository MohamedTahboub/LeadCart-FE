import React from 'react';
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
// import ImageUploader from 'quill-image-uploader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';
// import { ImageResize } from 'quill-image-resize-module';
import * as filesActions from 'actions/files';
import {
  formats,
  modules,
  headingFormats,
  headingModules
} from './config';

const Editor = ({
  value: htmlValue,
  theme = 'bubble',
  headingMode,
  onEdit,
  onBlur
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
      {...editorProps}
    // bounds='.app'
    //   placeholder={props.placeholder}
    />
  );
};
Editor.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onBlur: PropTypes.func.isRequired,
  headingMode: PropTypes.bool
};
Editor.defaultProps = {
  value: 'Add Your Description Here',
  onEdit: () => { },
  headingMode: false
};
export default connect(null, filesActions)(Editor);
