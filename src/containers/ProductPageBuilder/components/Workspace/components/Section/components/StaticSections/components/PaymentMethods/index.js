import React, { Fragment, useState } from 'react';
import common from 'components/common';
import creditsImage from 'assets/images/payment-cards.png';
import paypalImage from 'assets/images/paypal-thumbnail.png';
import creditCardImage from 'assets/images/credit-card-demo.gif';
import payOnDeliveryImage from 'assets/images/cod_icon.png';
import sepaDirectDebtLogo from 'assets/images/sepa-direct-debt.png';
import stripeFPXLogo from 'assets/images/fpx_logo.png';
import razorpayLogo from 'assets/images/brands/razorpay-logo.svg';
import { connect } from 'react-redux';

import { useContext } from '../../../../../../../../actions';
import './style.css';


const { FlexBox, CycleStepTitle, RadioImageCard } = common;

const PaymentSelectionDemo = ({ method }) => {
  if (method !== 'Stripe')
    return null;


  return (
    <FlexBox center='h-center'>
      <img
        src={creditCardImage}
        alt='paypal brand'
        className={'template-payment-gateway-demo credit-card'}
      />
    </FlexBox>
  );
};
const defaultPaymentsMethods = [{
  name: 'Stripe',
  title: 'Stripe',
  logo: creditsImage
},
{
  name: 'Paypal',
  title: 'Paypal',
  logo: paypalImage
}];

const getMethodDetails = (name, offlinePayments = [], translations = {}) => {
  const {
    creditCards: creditCardsTitle = 'Credit Cards',
    payPal: payPalTitle = 'PayPal',
    sepaDirectDebt: sepaDirectDebtTitle = 'SEPA Direct Debt',
    StripeFPXTitle = 'FPX'
  } = translations;
  const knownMethods = [
    {
      name: 'Stripe',
      title: creditCardsTitle,
      logo: creditsImage
    },
    {
      name: 'SepaDirectDebt',
      title: sepaDirectDebtTitle,
      logo: sepaDirectDebtLogo
    },
    {
      name: 'StripeFPX',
      title: StripeFPXTitle,
      logo: stripeFPXLogo
    },
    {
      name: 'Paypal',
      title: payPalTitle,
      logo: paypalImage
    },
    {
      name: 'COD',
      logo: payOnDeliveryImage,
      title: 'Cash on Delivery'
    },
    {
      name: 'Razorpay',
      title: payPalTitle,
      logo: razorpayLogo
    },
    ...offlinePayments.map((offlinePayment) => ({ title: offlinePayment.name, ...offlinePayment }))
  ];

  const details = knownMethods.find((method) => method.name === name);

  return details ? details : { name, title: name };
};

const PaymentMethods = ({
  language = {},
  step = 2,
  twoStepCheckout,
  methods: paymentMethods,
  offlinePayments
}) => {
  console.log('paymentMethods', paymentMethods);
  const { state: { product: { custom: { shippingDetails } = {} } } } = useContext();
  const [method, setMethod] = useState(0);
  const { paymentMethods: paymentMethodsTitle = 'Payment Method' } = language.checkout || {};

  const methodsList = Array.isArray(paymentMethods) ? paymentMethods.map((name) => {
    const methodDetails = getMethodDetails(name, offlinePayments, language.checkout);
    return methodDetails;
  }) : defaultPaymentsMethods;


  return (
    <Fragment>
      <div className='template-payment-methods-container'>
        {
          shippingDetails || !twoStepCheckout ? (
            <CycleStepTitle
              step={step}
              className='underlined template-payment-method-title'
            >
              {paymentMethodsTitle}
            </CycleStepTitle>
          ) :
            (
              <div className='black-title'>{paymentMethodsTitle}</div>
            )
        }
        {methodsList.map((method) => {
          return (
            <RadioImageCard
              title={method.title}
              name='payment-type'
              image={method.logo}
              onClick={() => setMethod(method.name)}
            />
          );
        })}
      </div>
      <PaymentSelectionDemo method={method} />
    </Fragment>
  );
};
const mapStateToProps = ({ integrations = [] }) => {
  const offlinePayments = integrations.filter(({ key }) => key === 'lc_offlinepayment');

  return { offlinePayments };
};
export default connect(mapStateToProps)(PaymentMethods);
