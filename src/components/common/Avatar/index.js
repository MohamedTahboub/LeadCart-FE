import React, { useState, useEffect } from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';


const Avatar = ({
  image: initImage = avatarLink,
  className = '',
  files,
  uploadFile,
  name = 'avatar',
  onChange
}) => {
  const [state, setState] = useState({ image: initImage });
  let fileInput = '';
  const uploadUserImage = () => {
    fileInput.click();
  };

  const onImageUpload = ({ target: { files, name: source } }) => {
    const file = files[0];
    if (file) {
      uploadFile({ file, type: 'products', source });
      setState({ ...state, uploading: true });
    }
  };
  useEffect(() => {
    if (state.uploading && files[name]) {
      setState({ ...state, uploading: false, image: files[name] });
      onChange({ name, image: files[name] });
    }
  });

  return (
    <span className={`change-avatar-layer ${className}`}>
      <span onClick={uploadUserImage} className='change-avatar-image'>
        <i className='fas fa-camera' />
      </span>
      <img className='user-avatar ' src={state.image} alt='user avatar' />
      <input
        name={name}
        onChange={onImageUpload}
        style={{ display: 'none' }} ref={(ref) => fileInput = ref} type='file'
        accept='image/x-png,image/gif,image/jpeg'
      />
    </span>
  );
};

export default connect(({ files }) => ({ files }), { ...filesActions })(Avatar);
