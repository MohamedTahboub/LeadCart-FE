import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import './style.css';
import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import update from 'immutability-helper';
import sectionsTemplates from 'data/productSectionsTemplates';
import ids from 'shortid';
import dropAreaImage from '../../../../assets/images/dropAreaImage.png';
import { useContext } from '../../actions';
import { SettingsHandle } from './components/common';

import {
  DropZone,
  ProductHead,
  Section,
  StaticSections
} from './components';

const { FlexBox } = common;


const getLanguageLabel = (
  languages = [],
  { language: langId } = {}
) => {
  let language = languages.find((lang) => lang._id === langId);
  if (!language) language = defaultLanguage;

  return { ...formatLanguage(language), type: language.type };
};

const Workspace = ({
  className,
  translations
}) => {
  const {
    state: {
      displayMode,
      modals: { sectionSetting: activeSection = {} } = {},
      product: {
        sections = [],
        staticSections = [],
        pageStyles = {}
      } = {}
    },
    actions
  } = useContext();

  const workspaceClasses = clx(
    'product-workspace',
    'relative-element',
    pageStyles.widthMode,
    className,
    displayMode
  );

  const activeLanguage = getLanguageLabel(translations);


  const onSectionSettings = (section) => {
    actions.toggleSectionSettingModal(section);
  };

  const onSectionOrderChange = (id, newOrder) => {
    const newSections = sections.map((section) => {
      if (section.id === id) return { ...section, order: newOrder };
      return section;
    });

    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const findCard = (id) => {
    const section = sections.filter((c) => `${c.id}` === id)[0];
    return {
      section,
      index: sections.indexOf(section)
    };
  };

  const moveCard = (id, atIndex) => {
    const { section, index } = findCard(id);
    const newSections = update(sections, {
      $splice: [
        [index, 1],
        [atIndex, 0, section]
      ]
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
        [(index + 1), 0, {
          ...copySection,
          id: ids.generate()
        }]
      ]
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const addNewAndMove = ({ id, type, atIndex }) => {
    const section = { ...sectionsTemplates[type] };

    if (!section) return;

    section.id = id;
    const newSections = update(sections, {
      $splice: [
        [(atIndex), 0, section],
        [(atIndex + 1), 0]
      ]
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
    setTimeout(() => {
      document.getElementById('product-builder-window').scroll({ left: 0, behavior: 'smooth', top: document.getElementById(id).offsetTop });
    }, 100);
  };

  const onProductSettings = () => {
    const meta = {
      type: 'pageSetting',
      menuTitle: 'Page Settings'
    };
    onSectionSettings(meta);
  };

  const screenStyles = { backgroundColor: pageStyles.screenBackground };
  const productStyles = {
    backgroundColor: pageStyles.productBackground,
    borderRadius: `${pageStyles.borderRadius}px`
  };
  return (
    <FlexBox
      flex
      column
      center='v-center'
      className='product-workspace-container'
      style={screenStyles}
    >
      <FlexBox id='product-builder-window' column className={workspaceClasses} >
        <ProductHead />
        <FlexBox className='relative-element product-page-content' column style={productStyles}>
          <SettingsHandle onClick={onProductSettings} />
          <DropZone onDrop={onSectionDropped}>
            {
              sections.length ? (
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
                    addNewAndMove={addNewAndMove}
                    index={index}
                  />
                ))
              ) : (
                <FlexBox column center='h-center v-center' className='builder-drop-area'>
                  <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
                  <span className='gray-text'>
                  Drop your sections here
                  </span>
                </FlexBox>
              )
            }
          </DropZone>
          <StaticSections
            language={activeLanguage}
            onSetting={onSectionSettings}
            sections={staticSections}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};


const mapStateToProps = ({ translations }) => ({ translations });

Workspace.propTypes = {};

export default connect(mapStateToProps)(Workspace);
