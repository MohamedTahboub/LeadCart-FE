import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import './style.css';
import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import dropAreaImage from '../../../../assets/images/dropAreaImage.png';
import sampleProductData from './sampleProductData.js';
import { useContext } from '../../actions';

import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
  Section,
  DropZone
} from './components';

const {
  Button,
  FlexBox,
  Title,
  EditableField
} = common;

const CommonStaticPart = ({ language }) => (
  <Fragment>
    <BillingDetails
      // color={color}
      language={language}
    />
    <PaymentMethods
      step={2}
      // onOptionSelected={onOptionSelected}
      methods={['Paypal', 'Stripe']}
      // onShowSetting
      // onFieldChange
      language={language}
    />
    <OrderSummary
      price={32}
      productName='Growth hacking'
      // payment={product.payment}
      language={language}
    />
    <CompleteOrderBtn
      // text={product.pagePreferences && product.pagePreferences.orderButtonText}
      // color={color}
      // onChange={onChange}
      language={language}
    />
  </Fragment>
);


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
  const {
    state: {
      modals: {
        sectionSettings: activeSection
      } = {},
      product: {
        sections = [],
        maxSectionsOrder
      } = {}
    },
    actions
  } = useContext();


  const workspaceClasses = clx({
    'product-workspace': true,
    [className]: className,
    [monitorSize]: monitorSize,

  });

  const activeLanguage = getLanguageLabel(translations);


  const onSectionSettings = (id) => {
    actions.toggleSectionSettingModal(id);
  };

  const onSectionOrderChange = (id, newOrder) => {
    const newSections = sections.map((section) => {
      // console.log('section.id === id', section.id === id);
      if (section.id === id) return { ...section, order: newOrder };
      return section;
    }).sort((a, b) => (a.order > b.order ? 1 : -1));
    actions.onProductFieldChange({ sections: newSections });
  };


  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox column className={workspaceClasses}>
        <DropZone>
          {!sections.length && (
            <FlexBox center='h-center'>
              <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
            </FlexBox>
          )}
          {
            sections.map((section, index) => (
              <Section
                key={`${section.id}_${index}`}
                {...section}
                onSetting={onSectionSettings}
                onSectionOrderChange={onSectionOrderChange}
                maxOrder={maxSectionsOrder}
                active={activeSection === section.id}
              />
            ))
          }
        </DropZone>
        <CommonStaticPart language={activeLanguage} />
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
