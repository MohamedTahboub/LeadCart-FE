import React, { Fragment, useState } from 'react';
import clx from 'classnames';
import { getServiceBrand } from 'data/integrationsServices';
import { includesIgnoreCase, openNewWindow } from 'libs';
import { codDeliveryPayment } from 'data/defaults';
import common from 'components/common';
import { connect } from 'react-redux';

import './style.css';

const { MediumCard, FlexBox } = common;

function Message ({ children }) {
  return (
    <div className='message-note'>
      <span className='message-content'>{children}</span>
    </div>
  );
}

const notSupportedCurrenciesByPaypal = ['MYR', 'INR'];
const getNotSupportedThisMessage = (currency) => `${currency} currency not supported by PayPal`;
const PaymentMethods = ({
  paymentsIntegrations = [],
  selected = [],
  name = 'paymentMethods',
  currency,
  ...props
}) => {

  const [error, setError] = useState('');
  const isSupportedByPaypal = (payment) => payment === 'Paypal' ? notSupportedCurrenciesByPaypal.includes(currency) : false;

  const isMethodExist = (paymentMethod) => paymentsIntegrations.find(({ name }) => includesIgnoreCase(name, paymentMethod));

  const onSelect = (paymentMethod) => () => {

    if (!selected.includes(paymentMethod) && selected.length >= 4)
      return setError('Each funnel accepts just four payment methods');

    if (isMethodExist(paymentMethod)) {
      props.onChange({
        target: {
          name,
          value: selected.includes(paymentMethod)
            ? selected.filter((method) => !includesIgnoreCase(method, paymentMethod))
            : [...selected, paymentMethod]
        }
      });
      setError('');
    }
  };

  return (
    <Fragment>
      <div className='payment-methods-cards-container'>
        {paymentsIntegrations.map((payment) => (
          <MediumCard
            key={payment.name}
            className={clx('template-payment-card', payment.className)}
            imgSrc={payment.logo}
            isActive={selected.includes(payment.name)}
            onClick={onSelect(payment.name)}
            warningInfo={isSupportedByPaypal(payment.name) && getNotSupportedThisMessage(currency)}
          />
        ))}
      </div>
      {error && <div className='adding-payment-error'>{error}</div>}
      <br />
      <FlexBox center='h-center'>
        {paymentsIntegrations.length
          ? (
            <Message>
              you can add or remove the payment gateways integrations from:
              <span onClick={() => openNewWindow('/integrations')} className='mx-1 bold-text underlined-text item-clickable'>
                Integrations
              </span>
            </Message>
          )
          : (
            <Message>
              You Don't Have Any Payment Integration connected to Your Account, Add from
              <span onClick={() => openNewWindow('/integrations')} className='mx-1 bold-text underlined-text item-clickable'>
                Integrations
              </span>
            </Message>
          )}
      </FlexBox>
    </Fragment>
  );
};


const mapStateToProps = ({ integrations }) => {

  const integrationsList = [codDeliveryPayment, ...integrations
    .filter((integration) => includesIgnoreCase(integration.category, 'payment'))
    .map((integration) => ({ logo: getServiceBrand(integration.key), ...integration }))];

  return { paymentsIntegrations: integrationsList };
};
export default connect(mapStateToProps)(PaymentMethods);
