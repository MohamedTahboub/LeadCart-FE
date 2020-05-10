import React from 'react';
import { Button, Col, Input, Row } from 'antd';

import './style.css';

const SecuritySettings = (props) => (
  <div>
    <Row gutter={[0, 28]}>
      <label>Password</label>
      <Input placeholder='6+ alphanumeric'/>
    </Row>
    <Row gutter={[0, 28]}>
      <label>Password confirm</label>
      <Input placeholder='Same password goes here'/>
    </Row>
    <Row gutter={[0, 0]}>
      <Button type='primary'>Save</Button>
    </Row>
  </div>
);

export default SecuritySettings;
