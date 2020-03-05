import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import './style.css';
import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import update from 'immutability-helper';
// import ids from 'shortid';
import dropAreaImage from '../../../../assets/images/dropAreaImage.png';
// import sampleProductData from './sampleProductData.js';
import { useContext } from '../../actions';
import { SettingsHandle } from './components/common';

import {
  // BillingDetails,
  // CompleteOrderBtn,
  // OrderSummary,
  // PaymentMethods,
  StaticSections,
  Section,
  DropZone
} from './components';

const {
  // Button,
  FlexBox,
  // Title,
  // EditableField
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
        staticSections = []
        // maxSectionsOrder
      } = {}
    },
    actions
  } = useContext();


  const workspaceClasses = clx({
    'product-workspace': true,
    'relative-element': true,
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
    // const newSections = [...sections];
    const { section, index } = findCard(id);
    // newSections.splice(atIndex, 0, section);

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
  const onSectionDuplicate = (id) => {
    const { section: copySection, index } = findCard(id);
    const newSections = update(sections, {
      $splice: [
        [index, 0],
        [(index + 1), 0, copySection],
      ],
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const onProductSettings = () => {
    const meta = {
      type: 'pageSetting',
      menuTitle: 'Page Settings'
    };
    onSectionSettings(meta);
  };

  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox column className={workspaceClasses}>
        <SettingsHandle onClick={onProductSettings} />
        <DropZone onDrop={onSectionDropped}>
          {!sections.length && (
            <FlexBox center='h-center'>
              <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
            </FlexBox>
          )}
          {
            sections.map((section, index) => (
              <Section
                key={`${section.id}${index}`}
                id={`${section.id}`}
                {...section}
                section={section}
                onSetting={onSectionSettings}
                onSectionOrderChange={onSectionOrderChange}
                active={activeSection.id === section.id}
                activeSection={activeSection}
                moveCard={moveCard}
                onSectionDuplicate={onSectionDuplicate}
                findCard={findCard}
                language={activeLanguage}
              />
            ))
          }
        </DropZone>
        <StaticSections
          language={activeLanguage}
          onSetting={onSectionSettings}
          sections={staticSections}
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
