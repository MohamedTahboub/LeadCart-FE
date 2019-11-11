import React, {
  useState, useEffect, lazy, Suspense
} from 'react';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css';
import { ImageResize } from 'quill-image-resize-module';
import * as filesActions from 'actions/files';
import { formats, modules } from './config';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageUploader', ImageUploader);

const Editor = ({ value: htmlValue, onEdit, uploadFile }) => {
  // const [html, setHtml] = useState('');

  // const onChange = (value) => {
  //   setHtml(value);
  //   setTimeout(() => {
  //     // onEdit(value);
  //   }, 200);
  // };

  // useEffect(() => {
  //   if (htmlValue !== html) setHtml(htmlValue);
  // }, [htmlValue]);
  const onUploadImage = (file) => new Promise((resolve, reject) => {
    uploadFile({
      file,
      type: 'products',
      source: 'quill.editor'
    }, {
      onSuccess: resolve,
      onFailed: reject
    });
  });
  modules.imageUploader.upload = onUploadImage;
  return (
    <ReactQuill
      theme='bubble'
      scrollingContainer='body'
      onChange={onEdit}
      value={htmlValue}
      modules={modules}
      formats={formats}
    // bounds='.app'
    //   placeholder={props.placeholder}
    />
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  onEdit: PropTypes.func
};
Editor.defaultProps = {
  value: 'Add Your Description Here',
  onEdit: () => { }
};
export default connect(null, filesActions)(Editor);


// export default (props) => (
//   <Suspense fallback={<span>Loading</span>}>
//     {lazy.apply(() => <EditorComponent {...props} />)}
//   </Suspense>
// );
