import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { ClassicForm, FuturisticForm } from './components';
import { getAvailablePaymentMethods } from 'libs/specialFuncs';

const { LayoutSwitch } = common;

const CheckoutForm = (props) => {
  const { section, productCategory, stripePaymentSettings = {} } = props;
  const { styles: { theme = 'classic' } = {} } = section || {};
  const { state: { funnel: { paymentMethods: paymentMethodsNames } = {} } } = useContext();

  const hasFormThemesOptions = productCategory === 'checkout' || productCategory === 'opt-in';
  const paymentMethods = getAvailablePaymentMethods(paymentMethodsNames, stripePaymentSettings);


  // fallback in case data is missed up
  if (!hasFormThemesOptions)
    return <ClassicForm {...props} paymentMethods={paymentMethods} />;

  return (
    <LayoutSwitch active={theme}>
      <ClassicForm id='classic' {...props} paymentMethods={paymentMethods} />
      <FuturisticForm id='futuristic' {...props} paymentMethods={paymentMethods}/>
    </LayoutSwitch>
  );
};

CheckoutForm.propTypes = {};
CheckoutForm.defaultProps = { theme: 'classic' };

const mapStateToProps = ({ integrations = [] }) => {
  const stripeIntegration = integrations.find((integration) => integration.key === 'lc_stripe');
  const stripePaymentSettings = stripeIntegration?.settings;

  return { stripePaymentSettings };
};
export default connect(mapStateToProps)(CheckoutForm);
