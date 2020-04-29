import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import { Anchor } from 'antd';
import { Modal } from 'components/Modals';
import Onboarding from 'components/Onboarding';

const { Link } = Anchor;

const UserAvatarPreview = ({
  user: {
    profileImage,
    firstName = '',
    lastName = ''
  } = {},
  updateUserProfileImage,
  onSettingClick
}) => {
  const [isOnboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const toggleOnboardingModalOpen = () => setOnboardingModalOpen(!isOnboardingModalOpen);

  const userName = `${firstName} ${lastName && lastName[0]}.`;

  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };

  return (
    <div className='center-content profile-preview d-col'>
      <div>
        <span className='ant-anchor-link-title' onClick={toggleOnboardingModalOpen}>Onboarding</span>
      </div>
      <div className='avatar-holder'>
        <span className='user-name'>{userName}</span>
      </div>
      <Modal isVisible={isOnboardingModalOpen} onClose={toggleOnboardingModalOpen}>
        <Onboarding />
      </Modal>
    </div>
  );
};


const mapStateToProps = ({ user: { user } }) => ({ user });
export default connect(mapStateToProps, { ...accountActions })(UserAvatarPreview);
