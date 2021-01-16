import React, { useEffect, useState } from 'react';
import { Button } from 'components/Buttons';
import Section from './Section';
import { InputField } from 'components/Inputs';
import Avatar from 'components/common/Avatar';
import { notification } from 'libs';
import * as accountActions from 'actions/account';

import './style.css';
import { connect } from 'react-redux';
import { FlexBox } from 'components/common/boxes';

const GeneralSettings = ({ user, updateUserProfileImage, onChangeAccountDetails, onChangeAccountPassword, updateAccountEmail }) => {
  const [detailsForm, setDetailsForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  const [passwordForm, setPasswordForm] = useState({});

  const handleFormChange = (event) => (form, formSetter) => {
    const { target: { name, value } } = event;
    formSetter({ ...form, [name]: value });
  };
  const handleDetailsFormChange = (event) => handleFormChange(event)(detailsForm, setDetailsForm);
  const handlePasswordFormChange = (event) => handleFormChange(event)(passwordForm, setPasswordForm);

  const handleDetailsFormSubmit = () => {
    const { firstName, lastName } = detailsForm;
    onChangeAccountDetails(
      { firstName, lastName },
      {
        onSuccess: () => notification.success('User information updated.'),
        onFailed: (error) => notification.failed(error)
      }
    );
  };
  const handlePasswordFormSubmit = () => {
    const { currentPassword, newPassword, newPasswordConfirmation } = passwordForm;
    if (newPassword !== newPasswordConfirmation) return notification.failed('Passwords must match');
    if (!(/^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/g).test(newPassword))
      return notification.failed('New password must contain: \nAt least 1 letter, \n1 digit \nAnd must be at least 6 letters in length.');
    onChangeAccountPassword(
      { newPassword, newPasswordConfirmation, currentPassword },
      {
        onSuccess: () => {
          notification.success('Password have been changed successfully');
          setPasswordForm({});
        },
        onFailed: (error) => notification.failed(error)
      }
    );
  };

  const onEmailChange = () => {
    const newEmail = detailsForm.email;
    if (user.email === newEmail) return;

    updateAccountEmail({ email: newEmail }, {
      onSuccess: () => {
        notification.success('your account email updated successfully');
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });

  };
  const onAvatarImageChange = ({ image }) => {
    updateUserProfileImage(image);
  };

  return (
    <div className='d-flex'>
      <div>
        <Section title='Account Details'>
          <div className=''>
            <InputField
              label='First name:'
              placeholder='John'
              name='firstName'
              value={detailsForm.firstName}
              onChange={handleDetailsFormChange}
              autocomplete='off'
            />
            <InputField
              label='Last name:'
              placeholder='Doe'
              name='lastName'
              value={detailsForm.lastName}
              onChange={handleDetailsFormChange}
              autocomplete='off'
            />
            <div className='d-flex justify-end'>
              <Button type='primary' size='small' onClick={handleDetailsFormSubmit}>Update</Button>
            </div>
          </div>
        </Section>
        <Section title='Account Email'>
          <FlexBox column>
            <InputField
              label='Email:'
              name='email'
              value={detailsForm.email}
              onChange={handleDetailsFormChange}
              autocomplete='off'
            />
            <FlexBox flex flexEnd>
              <Button onClick={onEmailChange} type='primary' size='small' className='ml-2'
                disabled={user.email === detailsForm.email || !detailsForm.email}
              >
                Change
              </Button>
            </FlexBox>
          </FlexBox>
        </Section>
        <Section title='Password'>
          <InputField
            label='Old Password:'
            type='password'
            placeholder='Old password'
            name='currentPassword'
            onChange={handlePasswordFormChange}
            autocomplete='off'
          />
          <InputField
            label='New Password:'
            type='password'
            placeholder='6+ alphanumeric'
            name='newPassword'
            onChange={handlePasswordFormChange}
            autocomplete='off'
          />
          <InputField
            label='Confirm Password:'
            type='password'
            placeholder='Confirm New Password'
            name='newPasswordConfirmation'
            onChange={handlePasswordFormChange}
            autocomplete='off'
          />
          <div className='d-flex justify-end'>
            <Button type='primary' onClick={handlePasswordFormSubmit}>Update</Button>
          </div>
        </Section>
      </div>
      <div className='m-5'>
        <Avatar
          size={128}
          image={user.profileImage}
          name='user_profile_image'
          onChange={onAvatarImageChange}
          className='mr-2'
        />
      </div>
    </div>
  );
};

export default connect(null, accountActions)(GeneralSettings);
