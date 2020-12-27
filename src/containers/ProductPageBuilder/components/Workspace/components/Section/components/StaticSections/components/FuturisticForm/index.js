import React, { Fragment } from 'react';

import CheckoutForm from './CheckoutForm';
import OptInForm from './OptInForm';

import './style.css';


const FlatForm = ({ language, section, productCategory, ...props }) => {
  return (
    <Fragment>
      {productCategory === 'checkout' && <CheckoutForm {...props} language={language} section={section} />}
      {productCategory === 'opt-in' && <OptInForm {...props} language={language} section={section} />}
    </Fragment>
  );
};

FlatForm.propTypes = {};

export default FlatForm;
