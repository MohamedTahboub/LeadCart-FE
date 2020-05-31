import React from 'react';
import { Button } from 'components/Buttons';
import { InputField } from 'components/Inputs';
import Avatar from 'components/common/Avatar';

import './style.css';
// I got an error when I imported the section component, also, I replaced the section component with section elements
// import Section from 'Section';
const GeneralSettings = ({ user }) => {
  const onAvatarImageChange = () => { };

  return (
    <div className='d-flex'>
      <div>
        <section title='Account Details'>
          <div className=''>
            <InputField label='First name:' placeholder='John' />
            <InputField label='Last name:' placeholder='Doe' />
            <div className='d-flex justify-end'>
              <Button type='primary'>Update</Button>
            </div>
          </div>
        </section>
        <section title='Emails'>
          <span>{user.email}</span>
          <Button type='primary' size='small' className='ml-2'>Request email change</Button>
        </section>
        <section title='Password'>
          <InputField label='Old Password:' placeholder='Old password' />
          <InputField label='New Password:' placeholder='6+ alphanumeric' />
          <InputField label='Confirm Password:' placeholder='Same password goes here' />
          <div className='d-flex justify-end'>
            <Button type='primary'>Update</Button>
          </div>
        </section>
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
