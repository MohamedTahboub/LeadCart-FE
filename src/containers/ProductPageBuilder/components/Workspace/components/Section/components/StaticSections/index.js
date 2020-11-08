import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import { ClassicForm, FuturisticForm } from './components';

const { LayoutSwitch } = common;

const CheckoutForm = (props) => {
  const { styles: { theme = 'classic' } = {}, type } = props.section || {};

  // fallback in case data is missed up
  if (props.productCategory !== 'checkout')
    return <ClassicForm {...props} />;

  return (
    <LayoutSwitch active={theme}>
      <ClassicForm id='classic' {...props} />
      <FuturisticForm id='futuristic' {...props} />
    </LayoutSwitch>
  );
};

CheckoutForm.propTypes = {};
CheckoutForm.defaultProps = { theme: 'classic' };

export default CheckoutForm;
