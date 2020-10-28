import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import ids from 'shortid';

import { formatLanguage } from 'libs';
import defaultLanguage from 'data/defaultLanguage.json';
import sectionsTemplates from 'data/productSectionsTemplates';
import dropAreaImage from '../../../../assets/images/dropAreaImage.png';
import { useContext } from '../../actions';
import { SettingsHandle } from './components/common';
import { PageLayouts, ProductHead } from './components';
import './style.css';

const { FlexBox } = common;

const getLanguageLabel = (
  languages = [],
  langId
) => {
  let language = languages.find((lang) => lang._id === langId);
  if (!language) language = defaultLanguage;

  return { ...formatLanguage(language), type: language.type };
};

const Workspace = ({
  className,
  translations: userLanguages
}) => {
  const {
    state: {
      displayMode,
      modals: { sectionSetting: activeSection = {} } = {},
      funnel: { language } = {},
      product: {
        sections = [],
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

  const activeLanguage = getLanguageLabel(userLanguages, language);


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

  const moveCard = (id, atIndex, parentZone) => {
    const { section, index } = findCard(id);
    const newSections = update(sections, {
      $splice: [
        [index, 1],
        [atIndex, 0, { ...section, parentZone }]
      ]
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const onSectionDropped = (section = {}) => {
    const { section: { type } = {}, parentZone } = section;
    console.log({ parentZone });

    if (section.new) actions.addNewSection({ type, parentZone });
  };

  const onSectionDuplicate = (id, parentZone) => {
    const { section: copySection, index } = findCard(id);
    const newSections = update(sections, {
      $splice: [
        [index, 0],
        [(index + 1), 0, {
          ...copySection,
          parentZone,
          id: ids.generate()
        }]
      ]
    });
    actions.onProductFieldChange({
      name: 'sections',
      value: newSections
    });
  };

  const addNewAndMove = ({ id, type, atIndex, parentZone }) => {
    const sectionTemplate = sectionsTemplates[type];
    if (!sectionTemplate) return;

    const section = { ...sectionTemplate, parentZone, id };

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
  };

  const onProductSettings = () => {
    const meta = {
      type: 'pageSetting',
      menuTitle: 'Page Settings'
    };
    onSectionSettings(meta);
  };

  const {
    productPage: {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    } = {}
  } = pageStyles;
  const screenStyles = { backgroundColor: pageStyles.screenBackground };
  const productStyles = {
    backgroundColor: pageStyles.productBackground,
    borderRadius: `${pageStyles.borderRadius}px`,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
  };

  const layoutProps = {
    onSectionDropped,
    sections,
    dropAreaImage,
    onSectionSettings,
    onSectionOrderChange,
    activeSection,
    moveCard,
    onSectionDuplicate,
    findCard,
    activeLanguage,
    addNewAndMove
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
        <ProductHead show={pageStyles.showHead} />
        <FlexBox className='relative-element product-page-content' column style={productStyles}>
          <SettingsHandle onClick={onProductSettings} />
          <PageLayouts layout={pageStyles.layout} {...layoutProps} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};


const mapStateToProps = ({ translations }) => ({ translations });

Workspace.propTypes = {};

export default connect(mapStateToProps)(Workspace);
