import React from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';
import * as accountActions from 'actions/account';

const UserAvatarPreview = ({
  user, onSettingClick, profileImage = avatarLink, newUpdatedAvatarImage, updateUserProfileImage, ...props
}) => {
  let fileInput = {};
  let uploaded = false;
  const onImageUpload = (e) => {
    props.uploadFile({ file: e.target.files[0], type: 'profile', source: 'user_profile_image' });
    uploaded = false;
  };

  const uploadUserImage = () => {
    fileInput.click();
  };

  if (newUpdatedAvatarImage && !uploaded) {
    updateUserProfileImage(newUpdatedAvatarImage);
    uploaded = true;
  }
  return (
    <div className='profile-preview'>
      <div className='avatar-holder'>
        <span className='change-avatar-layer'>
          <span onClick={uploadUserImage} className='change-avatar-image'>
            <i className='fas fa-camera' />
          </span>
          <img className='user-avatar ' src={profileImage !== 'URL' ? profileImage : avatarLink} alt='user avatar' />
        </span>
        <span onClick={onSettingClick} className='setting-short'>
          <i className='fas fa-cog' />
        </span>
        <span className='user-name'>{`${user.firstName} ${user.lastName && user.lastName[0]}.`}</span>
      </div>
      <input
        onChange={onImageUpload}
        style={{ display: 'none' }} ref={(ref) => fileInput = ref} type='file' name='myImage'
        accept='image/x-png,image/gif,image/jpeg'
      />
    </div>
  );
};
const mapStateToProps = ({ user: { user: { profileImage } }, files: { user_profile_image: newUpdatedAvatarImage } }) => ({
  profileImage, newUpdatedAvatarImage
});
export default connect(mapStateToProps, { ...accountActions, ...filesActions })(UserAvatarPreview);
