import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import Avatar from 'components/common/Avatar'

const UserAvatarPreview = ({
  user: { profileImage, firstName = '', lastName = '' } = {},
  updateUserProfileImage, onSettingClick
}) => {
  const userName = `${firstName} ${lastName && lastName[0]}.`

  const onAvatarImageChange = ({ name, image }) => {
    updateUserProfileImage(image)
  }
  return (
    <div className='profile-preview'>
      <div className='avatar-holder'>
        <Avatar
          image={profileImage}
          name='user_profile_image'
          onChange={onAvatarImageChange}
        />
        <span onClick={onSettingClick} className='setting-short'>
          <i className='fas fa-cog' />
        </span>
        <span className='user-name'>{userName}</span>
      </div>
    </div>
  );
}


const mapStateToProps = ({ user: { user } }) => ({
  user
});
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
