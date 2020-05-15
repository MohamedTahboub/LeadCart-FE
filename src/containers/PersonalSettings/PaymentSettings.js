import React, { useState } from 'react';
import { Button } from 'antd';
import Card from 'components/Card';
import { CreditCardDisplay } from 'components/CreditCardInputs';
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

const PaymentSettings = ({ creditCards }) => {

  return (
    <Section title='Payments'>
      <div className='mb-2'><strong>Owner Details:</strong></div>
      <div className='d-col justify-start ml-2'>
        <div className='d-flex mb-2 credit-cards-wrapper'>
          {
            creditCards && creditCards.map(({ cardNumber, isDefault }) => console.log('GetCardType(cardNumber)', GetCardType(cardNumber)) || (
              <Card className='mr-3 mb-2 credit-card-card'>
                <div className='d-col mb-2'>
                  <div className='d-flex justify-space-between align-center mb-2'>
                    {console.log('cardNumber', cardNumber)}
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
          <Button block type='primary'>Add credit card</Button>
        </div>
      </div>
    </Section>
  );
};

export default PaymentSettings;
