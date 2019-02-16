import React, { Component } from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import { connect } from 'react-redux';
import * as filesActions from 'actions/files';
import * as accountActions from 'actions/account';

class UserAvatarPreview extends Component {
  state = {

    uploaded: false
  }

  fileInput = ''

  onImageUpload = (e) => {
    this.props.uploadFile({ file: e.target.files[0], type: 'profile', source: 'user_profile_image' });
    this.setState({
      uploaded: true
    });
  };

  uploadUserImage = () => {
    this.fileInput.click();
  };

  componentDidUpdate () {
    const { newUpdatedAvatarImage, updateUserProfileImage } = this.props;

    if (newUpdatedAvatarImage && this.state.uploaded) {
      updateUserProfileImage(newUpdatedAvatarImage);
      this.setState({
        uploaded: false
      });
    }
  }

  render () {
    const { user, onSettingClick, profileImage = avatarLink } = this.props;
    return (
      <div className='profile-preview'>
        <div className='avatar-holder'>
          <span className='change-avatar-layer'>
            <span onClick={this.uploadUserImage} className='change-avatar-image'>
              <i className='fas fa-camera' />
            </span>
            <img className='user-avatar ' src={profileImage} alt='user avatar' />
          </span>
          <span onClick={onSettingClick} className='setting-short'>
            <i className='fas fa-cog' />
          </span>
          <span className='user-name'>{`${user.firstName} ${user.lastName && user.lastName[0]}.`}</span>
        </div>
        <input
          onChange={this.onImageUpload}
          style={{ display: 'none' }} ref={(ref) => this.fileInput = ref} type='file' name='myImage'
          accept='image/x-png,image/gif,image/jpeg'
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { user },files: { user_profile_image: newUpdatedAvatarImage } }) => ({
  profileImage: user.profileImage !== 'URL' ? user.profileImage : undefined,
  newUpdatedAvatarImage,
  user
});
export default connect(mapStateToProps, { ...accountActions, ...filesActions })(UserAvatarPreview);
