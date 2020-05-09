import React from 'react';
import { Input } from 'antd';

import './style.css';

const GeneralSettings = (props) => (
  <div className='d-col'>
    <label>Name</label>
    <Input placeholder='John Doe' />
  </div>
);

export default GeneralSettings;
