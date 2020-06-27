import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

import * as accountActions from 'actions/account';
import { Modal } from 'components/Modals';
import Avatar from 'components/common/Avatar';
import { SubscriptionPackageMinimal } from 'components/SubscriptionPackageMinimal';


const UserAvatarPreview = ({
  user,
  updateUserProfileImage,
  history,
  brands,
  ...rest
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
  const toggleUpgradeModalOpen = () => {
    setUpgradeModalOpen(!isUpgradeModalOpen);
  };
  return (
    <div className='center-content profile-preview d-col mt-2'>
      <div className='d-flex mb-2'>
        <Avatar
          size={32}
          image={profileImage}
          name='user_profile_image'
          onChange={onAvatarImageChange}
          className='mr-2'
        />
        <div className='avatar-holder'>
          <span className='user-name'>{userName}</span>
        </div>
      </div>
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
    </div>
  );
};


const mapStateToProps = (state) => {
  const { user: { user } } = state;
  return ({ user });
};
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
