import React from 'react';
import { connect } from 'react-redux';

import * as accountActions from 'actions/account';
import Avatar from 'components/common/Avatar';
import common from 'components/common';
import settingsIcon from '../../../../assets/images/user-settings.svg';

import './style.css';

const { FlexBox, Title, Tooltip } = common;

const UserAvatarPreview = ({
  user,
  updateUserProfileImage,
  history
}) => {

  const {
    profileImage,
    firstName = '',
    lastName = ''
  } = user || {};


  const userName = `${firstName} ${lastName && lastName[0]}.`;

  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };


  return (
    <FlexBox className='sidebar-avatar-container v-center'>
      <div className='sidebar-avatar-image-container' >
        <Avatar
          size={45}
          image={profileImage}
          name='user_profile_image'
          onChange={onAvatarImageChange}
          className='sidebar-avatar-image'
        />


        <Tooltip mouseEnterDelay={0.3} text='Personal Settings'>
          <FlexBox className='sidebar-avatar-settings-icon v-center h-center' onClick={() => history.push('/account')} >
            <img src={settingsIcon} alt='' />
          </FlexBox>
        </Tooltip>
      </div>

      <Title className='sidebar-avatar-name flex-1 text-center truncate letter-spacing-0' >
        {userName}
      </Title>
    </FlexBox>
  );
};


const mapStateToProps = (state) => {
  const { user: { user } } = state;
  return ({ user });
};
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
