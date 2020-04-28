import React from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import Avatar from 'components/common/Avatar';

const UserAvatarPreview = ({
  user: {
    profileImage,
    firstName = '',
    lastName = ''
  } = {},
  updateUserProfileImage,
  onSettingClick
}) => {
  const userName = `${firstName} ${lastName && lastName[0]}.`;

  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };
  return (
    <div className='profile-preview'>
      <div className='avatar-holder'>
        <span className='user-name'>{userName}</span>
      </div>
    </div>
  );
};


const mapStateToProps = ({ user: { user } }) => ({ user });
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
