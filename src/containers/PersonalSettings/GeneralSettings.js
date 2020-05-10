import React, { Fragment, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import SecuritySettings from './SecuritySettings';
import { Modal } from 'components/Modals';

import './style.css';

const GeneralSettings = (props) => {
  const [isSecuritySettingsVisible, setSecuritySettingsModalVisible] = useState(false);
  const toggleSecuritySettingsModal = () => setSecuritySettingsModalVisible(!isSecuritySettingsVisible);
  return (
    <Fragment>
      <Row align='bottom' className='mb-3'>
        <Col span={8}>
          <label>Full name</label>
          <Input placeholder='John Doe' />
        </Col>
        <Col span={8} offset={1}>
          <label>Email</label>
          <Input placeholder='John.Doe@domain.co' />
        </Col>
        <Col span={5} offset={2}>
          <Button type='primary'>Update</Button>
        </Col>
      </Row>
      <Row>
        <Col offset={19} span={5}>
          <Button type='default' onClick={() => setSecuritySettingsModalVisible(true)}>Reset password</Button>
        </Col>
      </Row>
      <Modal isVisible={isSecuritySettingsVisible} onClose={toggleSecuritySettingsModal}>
        <SecuritySettings />
      </Modal>
    </Fragment>
  );
};

export default GeneralSettings;
