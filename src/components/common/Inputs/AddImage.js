import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as fileUploadingActions from 'actions/files';

const AddImage = ({
  color = 'primary-color',
  name,
  value,
  onClick,
  className = '',
  imageClassName = '',
  suffixIcon,
  inputRef,
  children,
  notes,
  ...props
}) => {
  const [image, setImage] = useState(value);
  let imageFieldRef = '';

  useEffect(() => {
    if (value !== image) setImage(value);
    // eslint-disable-next-line
  }, [value]);

  const onAddImage = () => {
    if (imageFieldRef) imageFieldRef.click();
  };


  const onImageUpload = (e) => {
    const [file] = e.target.files || [];
    if (!file) return;
    props.uploadFile({
      file,
      type: 'products',
      source: props.source
    }, {
      onSuccess: (url) => {
        setImage(url);
        props.onUploaded && props.onUploaded(url);
      }
    });
  };

  return (
    <div className={`add-input-field-holder ${className}`}>
      <div
        ref={inputRef}
        onClick={onAddImage}
        className={`add-elements-container ${imageClassName}`}
        role='presentation'
      >
        <span className={`add-element-circle ${color}`}>
          <i className='fas fa-plus' />
        </span>
        <span className='add-input-field'>{children}</span>
        <span className='add-element-notes'>{notes}</span>
        {suffixIcon && <span className='add-element-suffix-element'>{suffixIcon}</span>}
      </div>
      <input
        onChange={onImageUpload}
        style={{ display: 'none' }}
        ref={(ref) => {imageFieldRef = ref;}}
        type='file'
        name='myImage'
        accept='image/*'
      />

      {image && (
        <img src={image} alt={name} className='uploaded-thumbnail' />
      )}
    </div>
  );
};
const mapStateToProps = ({ files }) => ({ files });
export default connect(mapStateToProps, fileUploadingActions)(AddImage);
