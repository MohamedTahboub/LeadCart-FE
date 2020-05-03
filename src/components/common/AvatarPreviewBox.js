import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import { Anchor, Tag, Tooltip } from 'antd';
import { Modal } from 'components/Modals';
import Onboarding from 'components/Onboarding';
import Avatar from 'components/common/Avatar';
import { SubscriptionPackageMinimal } from 'components/SubscriptionPackageMinimal';

const { Link } = Anchor;

const UserAvatarPreview = ({
  user: {
    profileImage,
    firstName = '',
    lastName = '',
    packageType
  } = {},
  updateUserProfileImage,
  onSettingClick
}) => {
  const [isOnboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const toggleOnboardingModalOpen = () => setOnboardingModalOpen(!isOnboardingModalOpen);
  const [isUpgradeModalOpen, setUpgradeModalOpen] = useState(false);

  const userName = `${firstName} ${lastName && lastName[0]}.`;

  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };
  const toggleUpgradeModalOpen = () => {
    setUpgradeModalOpen(!isUpgradeModalOpen);
  };
  return (
    <div className='center-content profile-preview d-col'>
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
      {/*<Modal isVisible={isOnboardingModalOpen} onClose={toggleOnboardingModalOpen}>
        <Onboarding />
      </Modal>*/}
      {
        packageType !== 'Premium' && (
          <Fragment>
            <div>
              <Tooltip title={`Upgrade to ${packageType === 'Basic' ? 'Pro' : 'Premium'}`}>
                <Tag className='ant-anchor-link-title' onClick={toggleUpgradeModalOpen} color='#1890FF'>UPGRADE</Tag>
              </Tooltip>
            </div>
            <Modal isVisible={isUpgradeModalOpen} className='compress-modal' onClose={toggleUpgradeModalOpen}>
              <SubscriptionPackageMinimal nextPackage={packageType === 'Basic' ? 'Pro' : 'Premium'} />
            </Modal>
          </Fragment>
        )
      }
    </div>
  );
};


const mapStateToProps = ({ user: { user } }) => ({ user });
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
