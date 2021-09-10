import React, { Fragment, useState } from 'react';
import common from 'components/common';
import creditsImage from 'assets/images/payment-cards.png';
import paypalImage from 'assets/images/paypal-thumbnail.png';
import cashOnDeliveryImage from 'assets/images/cod_icon.png';
import razorpayLogo from 'assets/images/brands/razorpay-logo.svg';
import PaymentGatewayImage from '../PaymentGatewayImage';
import sepaDirectDebtLogo from 'assets/images/sepa-direct-debt.png';
import stripeFPXLogo from 'assets/images/fpx_logo.png';
import { connect } from 'react-redux';

import { InputField, RadioGroup } from '../Inputs';

const { FlexBox, CheckCard, LayoutSwitch } = common;

const getPaymentImageByName = (name, offlinePayments = []) => {
  const images = {
    Paypal: paypalImage,
    Stripe: creditsImage,
    COD: cashOnDeliveryImage,
    Razorpay: razorpayLogo,
    SepaDirectDebt: sepaDirectDebtLogo,
    StripeFPX: stripeFPXLogo
  };
  const image = images[name];
  const offlineLogo = offlinePayments.find((payment) => payment.name === name);

  return image ? image : (offlineLogo && offlineLogo.logo);
};

const PaymentGatewaysOptions = ({
  methods = ['COD'],
  labels: paymentMethodsLabels = {},
  offlinePayments,
  theme = 'cards',
  translations = {}
}) => {

  const [active, setActive] = useState(methods[0]);
  const {
    cardNumberInputField: cardNumberInputFieldLabel = 'Card Number',
    cardCVCInputField: cardCVCInputFieldLabel = 'Expiry date',
    cardExpirationDateInputField: cardExpirationDateInputFieldLabel = 'CVV',
    cardExpirationDateInputPlaceholder = 'MM/YY'
    // ibanInputFields: ibanInputFieldsLabel
  } = translations;

  const paymentMethods = methods.map((method) => ({
    image: getPaymentImageByName(method, offlinePayments),
    name: method,
    label: paymentMethodsLabels[method] || method
  }));

  const onChange = (name) => {
    setActive(name);
  };

  return (
    <Fragment>

      <LayoutSwitch active={theme}>
        <FlexBox id='cards'>
          {paymentMethods.map((payment) => (
            <CheckCard
              {...payment}
              key={payment.name}
              active={active === payment.name}
              className='ml-3'
              onClick={() => onChange(payment.name)}
            />
          ))}
        </FlexBox>
        <PaymentGatewaysRadio id='radio' methods={paymentMethods} onSelect={onChange} active={active} />
      </LayoutSwitch>
      {active === 'Stripe' && (
        <Fragment>
          <FlexBox flex wrappable>
            <InputField
              flex
              label={cardNumberInputFieldLabel}
              placeholder='0000 0000 0000 0000'
            />
          </FlexBox>
          <FlexBox flex wrappable>
            <InputField
              flex
              label={cardExpirationDateInputFieldLabel}
              className='mr-3'
              // type='date'
              placeholder={cardExpirationDateInputPlaceholder}
            />
            <InputField
              flex
              label={cardCVCInputFieldLabel}
              type='password'
              placeholder='🔒 ****'
              inputProps={{ disabled: true }}
            />
          </FlexBox>
        </Fragment>
      )}
    </Fragment>

  );
};

const PaymentGatewaysRadio = ({ methods, onSelect, active }) => {

  const renderPaymentMethodsOptions = (methods.map((payment) => (
    ({
      label: (
        <FlexBox flex spaceBetween>
          <span>{payment.label}</span>
          <PaymentGatewayImage {...payment} />
        </FlexBox>
      ),
      value: payment.image,
      name: payment.name
    })
  )));

  return (
    <RadioGroup
      className='payment-methods-radio-group my-4'
      optionClassName='payment-method-radio-input'
      options={renderPaymentMethodsOptions}
      onChange={onSelect}
      name='published'
      value={active}
    />
  );
};
PaymentGatewaysOptions.propTypes = {};
const mapStateToProps = ({ integrations = [] }) => {
  const offlinePayments = integrations.filter(({ key }) => key === 'lc_offlinepayment');

  return { offlinePayments };
};
export default connect(mapStateToProps)(PaymentGatewaysOptions);
