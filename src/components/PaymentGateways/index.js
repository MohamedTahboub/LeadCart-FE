import React, { Fragment, useState } from 'react';
import { getServiceBrand } from 'data/integrationsServices';
import { includesIgnoreCase, openNewWindow } from 'libs';

import common from 'components/common';
import { connect } from 'react-redux';

import './style.css';

const { MediumCard, InputRow } = common;


function Message ({ children }) {
  return (
    <div className='message-note'>
      <span className='message-content'>{children}</span>
    </div>
  );
}


const PaymentMethods = ({
  paymentsIntegrations = [],
  selected = [],
  name = 'paymentMethods',
  ...props
}) => {

  const [error, setError] = useState('');

  const isMethodExist = (paymentMethod) => paymentsIntegrations.find(({ name }) => includesIgnoreCase(name, paymentMethod));

  const onSelect = (paymentMethod) => () => {

    if (!selected.includes(paymentMethod) && selected.length >= 2)
      return setError('each product accepts two payment methods as max');

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
            className='template-payment-card'
            imgSrc={payment.logo}
            isActive={selected.includes(payment.name)}
            onClick={onSelect(payment.name)}
          />
        ))}
      </div>
      {error && <div className='adding-payment-error'>{error}</div>}
      <br />
      <InputRow>
        {paymentsIntegrations.length
          ? (
            <Message>
              you can add or remove the payment gateways integrations from:
              <span onClick={() => openNewWindow('/integrations')} className='bold-text underlined-text'>
                settings/integrations
              </span>
            </Message>
          )
          : (
            <Message>
              You Don't Have Any Payment Integration connected to Your Account, Add from
              <span onClick={() => openNewWindow('/settings/integrations')} className='bold-text underlined-text'>
                settings/integrations
              </span>
            </Message>
          )}
      </InputRow>
    </Fragment>
  );
};


const mapStateToProps = ({ integrations }) => {

  const integrationsList = integrations
    .filter((integration) => includesIgnoreCase(integration.category, 'payment'))
    .map((integration) => ({ logo: getServiceBrand(integration.key), ...integration }));

  return { paymentsIntegrations: integrationsList };
};
export default connect(mapStateToProps)(PaymentMethods);
