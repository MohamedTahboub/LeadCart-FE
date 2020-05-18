import React from 'react';
import { Button, Table } from 'antd';
import Card from 'components/Card';
import Section from './Section';
import { CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
import { GetCardType } from 'helpers/common';
import CreditCardVisa from 'assets/images/icons/credit-card-visa.png';
import CreditCardAMEX from 'assets/images/icons/credit-card-amex.png';
import CreditCardJCB from 'assets/images/icons/credit-card-jcb.png';
import CreditCardMaestro from 'assets/images/icons/credit-card-maestro.png';
import CreditCardDiscover from 'assets/images/icons/credit-card-discover.png';
import CreditCardMasterCard from 'assets/images/icons/credit-card-master-card.png';
import CreditCardDinersClub from 'assets/images/icons/credit-card-diners-club-international.png';
import CreditCardDefault from 'assets/images/icons/credit-card-default.png';

import './style.css';

const columns = [{
  title: 'Item Type',
  dataIndex: 'itemType',
  key: 'itemType'
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description'
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity'
}, {
  title: 'Unit Price',
  dataIndex: 'unitPrice',
  key: 'unitPrice',
  render: (text) => `$${text}`
}, {
  title: 'Amount',
  dataIndex: 'amount',
  key: 'amount',
  render: (text, record) => `$${record.unitPrice * record.quantity}`
}];

const _dataSource = [
  {
    itemType: 'Package',
    description: 'Lifetime Premium Package',
    quantity: 1,
    unitPrice: 299.99
  }
];

const CreditCardRenderer = ({ type, ...props }) => {
  switch (type) {
  case 'visa': return <img alt='' src={CreditCardVisa} {...props} />;
  case 'amex': return <img alt='' src={CreditCardAMEX} {...props} />;
  case 'jcb': return <img alt='' src={CreditCardJCB} {...props} />;
  case 'maestro': return <img alt='' src={CreditCardMaestro} {...props} />;
  case 'discover': return <img alt='' src={CreditCardDiscover} {...props} />;
  case 'mastercard': return <img alt='' src={CreditCardMasterCard} {...props} />;
  case 'diners-club-international': return <img alt='' src={CreditCardDinersClub} {...props} />;
  default: return <img alt='' src={CreditCardDefault} {...props} />;
  }
};


const PaymentSettings = ({ creditCards, dataSource = _dataSource }) => {

  return (
    <React.Fragment>
      <Section title='Payment Methods'>
        <div className='d-col justify-start'>
          <div className='d-flex mb-2 credit-cards-wrapper'>
            {
              creditCards && creditCards.map(({ cardNumber, isDefault }) => (
                <Card className='mr-3 mb-2 credit-card-card'>
                  <div className='d-col mb-2'>
                    <div className='d-flex justify-space-between align-center mb-2'>
                      <CreditCardRenderer type={GetCardType(cardNumber)} style={{ height: 42 }}/>
                      {
                        isDefault ?
                          <CheckCircleTwoTone twoToneColor='#52c41a' style={{ fontSize: 20 }} /> :
                          <DeleteOutlined className='btn-soft delete-credit-card' style={{ fontSize: 18 }}/>

                      }
                    </div>
                    <h3 className='pr-5 m-0'>
                      ***{cardNumber.slice(-4)}
                    </h3>
                  </div>
                </Card>
              ))
            }
          </div>
          <div className='add-credit-card-button-wrapper'>
            <Button block type='primary'>Add payment method</Button>
          </div>
        </div>
      </Section>
      <Section title='Invoices'>
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      </Section>
    </React.Fragment>
  );
};

export default PaymentSettings;
