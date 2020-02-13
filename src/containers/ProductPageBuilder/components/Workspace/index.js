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


import {
  BillingDetails,
  CompleteOrderBtn,
  OrderSummary,
  PaymentMethods,
  Section,
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
  const [fields, setFields] = useState(sampleProductData);
  const [activeSection, setActiveSection] = useState();

  const workspaceClasses = clx({
    'product-workspace': true,
    [className]: className,
    [monitorSize]: monitorSize,

  });

  const activeLanguage = getLanguageLabel(translations);


  // const { sections = [] } = fields;

  // const hasSections = sections.length;
  const onSectionSettings = (id) => {
    setActiveSection(id);
  };

  const onSectionOrderChange = (id, newOrder) => {
    setFields({
      ...fields,
      sections: fields.sections.map((section) => {
        // console.log('section.id === id', section.id === id);
        if (section.id === id) return { ...section, order: newOrder };
        return section;
      })
    });
  };

  const sortedSections = fields.sections.sort((a, b) => (a.order > b.order ? 1 : -1));

  const maxSectionOrder = Math.max(...fields.sections.map(({ order }) => order));
  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox column className={workspaceClasses}>
        {!fields.sections.length && (
          <FlexBox center='h-center'>
            <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
          </FlexBox>
        )}
        {
          sortedSections.map((section, index) => (
            <Section
              key={`${section.id}_${index}`}
              {...section}
              onSetting={onSectionSettings}
              onSectionOrderChange={onSectionOrderChange}
              maxOrder={maxSectionOrder}
              active={activeSection === section.id}
            />
          ))
        }
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
