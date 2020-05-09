import React from 'react';
import { Input } from 'antd';

import './style.css';

const SecuritySettings = (props) => (
  <div className='d-col'>
    <label>Email</label>
    <Input placeholder='John.Doe@domain.co'/>
    <label>Password</label>
    <Input placeholder='6+ alphanumeric'/>
    <label>Password confirm</label>
    <Input />
  </div>
);

export default SecuritySettings;
