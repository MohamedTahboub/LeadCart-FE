import React from 'react';
import { Button, Card } from 'antd';
import { Modal } from 'components/Modals';

import './style.css';

const StackCodesModal = ({ codes, ...props }) => (
  <Modal {...props}>
    <div>
      <h3>Codes</h3>
      <Card className='mb-2'>
        {
          codes ? codes.map((code) => (
            <h4 className='mb-2'>
              <span>{code.name}</span>
              <span>{code.code}</span>
            </h4>
          )) : 'No codes to display'
        }
      </Card>
      <Button>Add code</Button>
    </div>
  </Modal>
);

export default StackCodesModal;
