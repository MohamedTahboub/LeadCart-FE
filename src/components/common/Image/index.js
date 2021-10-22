import React, { useRef } from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';


import './style.css';
import { isFunction } from 'libs/checks';

export const Image = ({
  image: initImage = avatarLink,
  className = '',
  // files,
  uploadFile,
  name = 'imageHolder',
  onBeforeBrowser,
  onChange
}) => {
  const fileInput = useRef(null);

  const onImageUpload = () => {
    if (isFunction(onBeforeBrowser))
      return onBeforeBrowser({ fileInput, name });

    if (isFunction(fileInput?.current?.click)) fileInput.current.click();
  };

  const uploadImage = ({ target: { files, name: source } }) => {
    const file = files[0];

    if (file && !(file.size > 1024 ** 2))
      uploadFile({ file, type: 'products', source }, { onSuccess: (fileLink) => onChange({ name, value: fileLink }) });

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
        ref={fileInput}
        type='file'
        accept='image/x-png,image/gif,image/jpeg'
      />
    </div>
  );
};

export default connect(({ files }) => ({ files }), { ...filesActions })(Image);
