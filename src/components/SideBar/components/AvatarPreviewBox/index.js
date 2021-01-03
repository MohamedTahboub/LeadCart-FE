import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

import * as accountActions from 'actions/account';
import { Modal } from 'components/Modals';
import Avatar from 'components/common/Avatar';
import { SubscriptionPackageMinimal } from 'components/SubscriptionPackageMinimal';
import common from 'components/common';
import settingsIcon from '../../../../assets/images/user-settings.svg';

import './style.css';

const { FlexBox, Title } = common;

const UserAvatarPreview = ({
  user,
  updateUserProfileImage,
  history,
  brands,
  ...props
}) => {
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const [isSettingsMenuOpened, setIsSettingsMenuOpened] = useState(false);


  const {
    profileImage,
    firstName = '',
    lastName = '',
    packageType
  } = user || {};


  const userName = `${firstName} ${lastName && lastName[0]}.`;

  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };


  const toggleUpgradeModalOpen = () => {
    setUpgradeModalOpen(!isUpgradeModalOpen);
  };


  const toggleSettingsMenuOpened = () => {
    setIsSettingsMenuOpened(!isSettingsMenuOpened);
  };


  const onNavigateBySettingsMenu = (link) => {
    history.push(link);
    toggleSettingsMenuOpened();
  };


  return (
    <FlexBox className='sidebar-avatar-container v-center'>
      <div className='sidebar-avatar-image-container' onClick={toggleSettingsMenuOpened} >
        <div className='sidebar-avatar-image' style={{ backgroundImage: `url(${profileImage})` }} />
        <div className='sidebar-avatar-settings-icon' style={{ backgroundImage: `url(${settingsIcon})` }} />
      </div>

      <Title className='sidebar-avatar-name flex-1 text-center truncate' >
        {userName}
      </Title>

      {isSettingsMenuOpened &&
        <FlexBox className='sidebar-avatar-settings-menu v-center h-center' column>
          <Avatar
            size={40}
            image={profileImage}
            name='user_profile_image'
            onChange={onAvatarImageChange}
            className='sidebar-avatar-changeable-img mb-2'
          />
          <p className='sidebar-avatar-settings-menu-item' onClick={() => onNavigateBySettingsMenu('/account')} >Personal Settings</p>
          <p className='sidebar-avatar-settings-menu-item' onClick={() => onNavigateBySettingsMenu('/sub-accounts')} >Sub-Accounts Settings</p>
        </FlexBox>
      }


      {/*
      <FlexBox>
        {
          packageType !== 'Premium' && (
            <Fragment>
              <div className='hide-element'>
                <Tag className='ant-anchor-link-title' onClick={toggleUpgradeModalOpen} color='#1890FF'>UPGRADE TO {packageType === 'Basic' ? 'PRO' : 'PREMIUM'}</Tag>
              </div>

              <Modal isVisible={isUpgradeModalOpen} className='compress-modal minimal-subscription-modal' onClose={toggleUpgradeModalOpen}>
                <SubscriptionPackageMinimal brands={brands} user={user} history={history} nextPackage={packageType === 'Basic' ? 'Pro' : 'Premium'}
                  closeModal={toggleUpgradeModalOpen}
                />
              </Modal>
            </Fragment>
          )
        }
      </FlexBox>
       */}

    </FlexBox>
  );
};


const mapStateToProps = (state) => {
  const { user: { user } } = state;
  return ({ user });
};
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
