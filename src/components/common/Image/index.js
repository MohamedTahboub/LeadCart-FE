import React, { useState, useEffect, Component } from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';
// import { bytesToSize } from 'libs';


import './style.css';

export const Image = ({
  image: initImage = avatarLink,
  className = '',
  files,
  uploadFile,
  name = 'imageHolder',
  onChange
}) => {
  let fileInput = '';
  const onImageUpload = () => {
    fileInput.click();
  };

  const uploadImage = ({ target: { files, name: source } }) => {
    const file = files[0];

    if (file && !(file.size > 1024 ** 2)) {
      uploadFile({ file, type: 'products', source }, {
        onSuccess: (fileLink) => onChange({ name, value: fileLink })
      });
    }
  };

  const imageStyle = {
    backgroundImage: `url(${initImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div
      style={imageStyle}
      onClick={onImageUpload}
      className={`wrapped-image-container ${className}`}
      role='presentation'
    >
      <input
        name={name}
        onChange={uploadImage}
        style={{ display: 'none' }}
        ref={(ref) => fileInput = ref}
        type='file'
        accept='image/x-png,image/gif,image/jpeg'
      />
    </div>
  );
};

export default connect(({ files }) => ({ files }), { ...filesActions })(Image);
