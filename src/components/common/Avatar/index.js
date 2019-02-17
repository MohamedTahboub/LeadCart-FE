import React, { useState, useEffect, Component } from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';



const Avatar = ({ image: initImage = avatarLink, className = '', files, uploadFile, name = 'avatar', onChange }) => {
    const [state, setState] = useState({ image: initImage })
    this.fileInput = ''
    const uploadUserImage = () => {
        this.fileInput.click();
    };

    const onImageUpload = ({ target: { files } }) => {
        const file = files[0]
        if (file) {
            uploadFile({ file, type: 'products', source: name });
            setState({...state, uploading: true })
        }
    };

    useEffect(() => {
        const image = files[name]
        if (state.uploading && image) {
            setState({ ...state, uploading: false, image })
            onChange({ name, image })
        }
    })
    return (
        <span className={`change-avatar-layer ${className}`}>
            <span onClick={uploadUserImage} className='change-avatar-image'>
                <i className='fas fa-camera' />
            </span>
            <img className='user-avatar ' src={state.image} alt='user avatar' />
            <input
                onChange={onImageUpload}
                style={{ display: 'none' }} ref={(ref) => this.fileInput = ref} type='file' name='myImage'
                accept='image/x-png,image/gif,image/jpeg'
            />
        </span>
    )
}

export default connect(({ files }) => ({ files }), { ...filesActions })(Avatar);
