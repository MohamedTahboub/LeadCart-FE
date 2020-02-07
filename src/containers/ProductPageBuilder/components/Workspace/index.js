import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import './style.css';
import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import dropAreaImage from '../../../../assets/images/dropAreaImage.png';

import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
} from './components';

const {
  Button,
  FlexBox,
  Title,
  EditableField
} = common;

const getLanguageLabel = (
  languages = [],
  {
    language: langId
  } = {}
) => {
  let language = languages.find((lang) => lang._id === langId);
  if (!language) language = defaultLanguage;

  return { ...formatLanguage(language), type: language.type };
};


const Workspace = ({
  className,
  translations,
  monitorSize = 'disktop',
  ...props
}) => {
  const workspaceClasses = clx({
    'product-workspace': true,
    [className]: className,
    [monitorSize]: monitorSize,

  });

  const activeLanguage = getLanguageLabel(translations);


  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox column className={workspaceClasses}>
        <FlexBox center='h-center'>
          <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
        </FlexBox>
        <BillingDetails
          // color={color}
          language={activeLanguage}
        />
        <PaymentMethods
          step={2}
          // onOptionSelected={onOptionSelected}
          methods={['Paypal', 'Stripe']}
          // onShowSetting
          // onFieldChange
          language={activeLanguage}
        />
        <OrderSummary
          price={32}
          productName='Growth hacking'
          // payment={product.payment}
          language={activeLanguage}
        />
        <CompleteOrderBtn
          // text={product.pagePreferences && product.pagePreferences.orderButtonText}
          // color={color}
          // onChange={onChange}
          language={activeLanguage}
        />
      </FlexBox>
    </FlexBox>
  );
};


const mapStateToProps = ({
  translations,
}) => ({
  translations,
});

Workspace.propTypes = {

};

export default connect(mapStateToProps)(Workspace);
