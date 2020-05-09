import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { CreditCardDisplay } from 'components/CreditCardInputs';
import StackCodesModal from './StackCodesModal';

import './style.css';

// TEMP: temp variable
const codes = [{ name: 'Code_1', code: 'xF32uI31q' }, { name: 'Code_2', code: 'ir318keu2' }];

const PaymentSettings = ({ creditCards }) => {
  const [isStackCodesModalOpen, setStackcodesModalOpen] = useState(false);
  const toggleStackCodesModal = () => setStackcodesModalOpen(!isStackCodesModalOpen);

  return (
    <div className='d-flex justify-space-between align-start'>
      <Card>
        <div>Account credits: 3</div>
      </Card>
      <Card title='Payment methods'>
        {
          creditCards && creditCards.map((cardNumber) => (
            <div className='d-flex mb-2'>
              Card: <CreditCardDisplay value={cardNumber}/><Button type='danger'>DELETE</Button>
            </div>
          ))
        }
      </Card>
      <Card>
        <Button onClick={() => setStackcodesModalOpen(true)}>Stack more codes</Button>
      </Card>
      <StackCodesModal codes={codes} isVisible={isStackCodesModalOpen} onClose={toggleStackCodesModal}/>
    </div>
  );
};

export default PaymentSettings;
