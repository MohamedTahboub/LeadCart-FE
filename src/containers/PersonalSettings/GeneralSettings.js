import React, { useState } from 'react';
import { Button } from 'components/Buttons';
import Section from './Section';
import { InputField } from 'components/Inputs';
import Avatar from 'components/common/Avatar';
import { notification } from 'libs';

import './style.css';

const GeneralSettings = ({ user, onChangeAccountDetails, onChangeAccountPassword }) => {
  const [detailsForm, setDetailsForm] = useState({ firstName: user.firstName, lastName: user.lastName });
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

  const onAvatarImageChange = () => {};

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
            />
            <InputField
              label='Last name:'
              placeholder='Doe'
              name='lastName'
              value={detailsForm.lastName}
              onChange={handleDetailsFormChange}
            />
            <div className='d-flex justify-end'>
              <Button type='primary' onClick={handleDetailsFormSubmit}>Update</Button>
            </div>
          </div>
        </Section>
        <Section title='Emails'>
          <span>{user.email}</span>
          <Button type='primary' size='small' className='ml-2'>Request email change</Button>
        </Section>
        <Section title='Password'>
          <InputField
            label='Old Password:'
            type='password'
            placeholder='Old password'
            name='currentPassword'
            onChange={handlePasswordFormChange}
          />
          <InputField
            label='New Password:'
            type='password'
            placeholder='6+ alphanumeric'
            name='newPassword'
            onChange={handlePasswordFormChange}
          />
          <InputField
            label='Confirm Password:'
            type='password'
            placeholder='Same password goes here'
            name='newPasswordConfirmation'
            onChange={handlePasswordFormChange}
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

export default (GeneralSettings);
