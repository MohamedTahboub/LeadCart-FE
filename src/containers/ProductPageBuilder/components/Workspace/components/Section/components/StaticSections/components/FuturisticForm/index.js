import React, { Fragment } from 'react';

import CheckoutForm from './CheckoutForm';
import OptInForm from './OptInForm';

import './style.css';


const FlatForm = ({ language, section, productCategory }) => {
  return (
    <Fragment>
      {productCategory === 'checkout' && <CheckoutForm language={language} section={section} />}
      {productCategory === 'opt-in' && <OptInForm language={language} section={section} />}
    </Fragment>
  );
};

FlatForm.propTypes = {};

export default FlatForm;
