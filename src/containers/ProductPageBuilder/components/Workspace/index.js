import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import './style.css';
import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import update from 'immutability-helper';
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
  ...props
}) => {
  const {
    state: {
      displayMode,
      modals: {
        sectionSetting: activeSection = {}
      } = {},
      product: {
        sections = [],
        // maxSectionsOrder
      } = {}
    },
    actions
  } = useContext();


  const workspaceClasses = clx({
    'product-workspace': true,
    [className]: className,
    [displayMode]: displayMode,

  });

  const activeLanguage = getLanguageLabel(translations);


  const onSectionSettings = (section) => {
    actions.toggleSectionSettingModal(section);
  };

  const onSectionOrderChange = (id, newOrder) => {
    const newSections = sections.map((section) => {
      // console.log('section.id === id', section.id === id);
      if (section.id === id) return { ...section, order: newOrder };
      return section;
    });
    // .sort((a, b) => (a.order > b.order ? 1 : -1));

    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const findCard = (id) => {
    const section = sections.filter((c) => `${c.id}` === id)[0];
    return {
      section,
      index: sections.indexOf(section),
    };
  };

  const moveCard = (id, atIndex) => {
    const { section, index } = findCard(id);
    const newSections = update(sections, {
      $splice: [
        [index, 1],
        [atIndex, 0, section],
      ],
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const onSectionDropped = (section = {}) => {
    const { section: { type } = {} } = section;
    if (section.new) actions.addNewSection(type);
  };

  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox column className={workspaceClasses}>
        <DropZone onDrop={onSectionDropped}>
          {!sections.length && (
            <FlexBox center='h-center'>
              <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
            </FlexBox>
          )}
          {
            sections.map((section, index) => (
              <Section
                key={`${section.id}_${section.order}`}
                id={`${section.id}`}
                {...section}
                section={section}
                onSetting={onSectionSettings}
                onSectionOrderChange={onSectionOrderChange}
                // maxOrder={maxSectionsOrder}
                active={activeSection.id === section.id}
                moveCard={moveCard}
                findCard={findCard}
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
