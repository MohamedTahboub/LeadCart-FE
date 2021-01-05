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

const { FlexBox, Title, Tooltip } = common;

const UserAvatarPreview = ({
  user,
  updateUserProfileImage,
  history,
  brands,
  ...props
}) => {
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

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

      <Title className='sidebar-avatar-name flex-1 text-center truncate' >
        {userName}
      </Title>

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
