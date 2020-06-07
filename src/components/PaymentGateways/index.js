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

  const isMethodExist = (paymentKey) => paymentsIntegrations.find(({ key }) => includesIgnoreCase(key, paymentKey));

  const onSelect = (key) => () => {

    if (!selected.includes(key) && selected.length >= 2)
      return setError('each product accepts two payment methods as max');

    if (isMethodExist(key)) {
      props.onChange({
        target: {
          name,
          value: selected.includes(key)
            ? selected.filter((m) => !includesIgnoreCase(m, key))
            : [...selected, key]
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
            key={payment.key}
            className='template-payment-card'
            imgSrc={payment.logo}
            isActive={selected.includes(payment.key)}
            onClick={onSelect(payment.key)}
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
