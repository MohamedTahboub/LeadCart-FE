import React from 'react';
import avatarLink from 'assets/images/avatar.jpg';

export default ({ user, onSettingClick, ...props }) => (
  <div className='profile-preview'>
    <div className='avatar-holder'>
      <img className='user-avatar' src={avatarLink} alt='user avatar' />
      <span onClick={onSettingClick} className='setting-short'>
        <i className='fas fa-cog' />
      </span>
      <span className='user-name'>{`${user.firstName} ${user.lastName && user.lastName[0]}.`}</span>
    </div>
  </div>
);
