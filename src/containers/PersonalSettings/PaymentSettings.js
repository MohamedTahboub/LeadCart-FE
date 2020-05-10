import React, { useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import Card from 'components/Card';
import { CreditCardDisplay } from 'components/CreditCardInputs';
import StackCodesModal from './StackCodesModal';
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons';

import './style.css';

// TEMP: temp variable
const codes = [{ name: 'Code_1', code: 'xF32uI31q' }, { name: 'Code_2', code: 'ir318keu2' }];

const PaymentSettings = ({ creditCards }) => {
  const [isStackCodesModalOpen, setStackcodesModalOpen] = useState(false);
  const toggleStackCodesModal = () => setStackcodesModalOpen(!isStackCodesModalOpen);

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col span={8}>
          <Card title='Account credits'>
            <div>You have: 3 credits</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Payment methods'>
            {
              creditCards && creditCards.map((cardNumber) => (
                <div className='d-flex align-center mb-2'>
                  Card: <CreditCardDisplay value={cardNumber}/><Button size='small' danger><DeleteOutlined /></Button>
                </div>
              ))
            }
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={(
              <div className='d-flex justify-space-between'>
                <span>Code stack</span>
                <Button onClick={toggleStackCodesModal} size='small' shape='circle'>
                  <UnorderedListOutlined />
                </Button>
              </div>
            )}
          >
            <Row gutter={[0, 0]} className='mb-2'>Stacked codes: 3</Row>
            <Row gutter={[8, 0]}>
              <Col span={16}>
                <Input size='small'/>
              </Col>
              <Col span={8}>
                <Button onClick={() => setStackcodesModalOpen(true)} size='small' type='dashed'>Redeem</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <StackCodesModal codes={codes} isVisible={isStackCodesModalOpen} onClose={toggleStackCodesModal}/>
    </div>
  );
};

export default PaymentSettings;
