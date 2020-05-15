import React from 'react';
import { Button } from 'components/Buttons';
import Section from './Section';
import { InputField } from 'components/Inputs';
import Avatar from 'components/common/Avatar';

import './style.css';

const GeneralSettings = ({ user }) => {
  const onAvatarImageChange = () => {};

  return (
    <div className='d-flex'>
      <div>
        <Section title='Account Details'>
          <div className='mb-2'><strong>Used Credit Card:</strong></div>
          <div className='ml-2'>
            <InputField label='First name:' placeholder='John'/>
            <InputField label='Last name:' placeholder='Doe' />
            <div className='d-flex justify-end'>
              <Button type='primary'>Update</Button>
            </div>
          </div>
        </Section>
        <Section title='Emails'>
          <span>{user.email}</span>
          <Button type='primary' size='small' className='ml-2'>Request email change</Button>
        </Section>
        <Section title='Password'>
          <InputField label='Old Password:' placeholder='Old password' />
          <InputField label='New Password:' placeholder='6+ alphanumeric' />
          <InputField label='Confirm Password:' placeholder='Same password goes here' />
          <div className='d-flex justify-end'>
            <Button type='primary'>Update</Button>
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

export default GeneralSettings;
