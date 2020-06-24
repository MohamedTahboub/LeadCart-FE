import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import Section from '../index';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import * as dropTypes from '../../dropTypes';
import { useContext } from '../../../../../actions';
import SectionContent from './SectionContent';
import ids from 'shortid';
import { SettingsHandles } from '../components';
import sectionsTemplates from 'data/productSectionsTemplates';

const NestedSection = ({
  className,
  onReorder,
  findCard,
  onChange,
  addNewNestedSectionAt,
  section = {},
  onSectionDelete,
  parentSectionId,
  deleteNestedSectionWithId
}) => {
  const [{ isDragging }, dragConnect] = useDrag({
    item: {
      type: dropTypes.NESTED_SECTION,
      section,
      id: section.id,
      parentSectionId
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [{ isOver }, drop] = useDrop({
    accept: [dropTypes.NESTED_SECTION, dropTypes.SECTION],
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: ({ new: isNew, id, section: droppedSection, parentSectionId: dropParentId }) => {
      if (['spacer', 'layout', 'bumpOffer', 'code'].includes(droppedSection.type)) return;
      const newSection = sectionsTemplates[droppedSection.type];
      if (dropParentId)
        if (dropParentId !== parentSectionId) return;
      if (isNew) {
        const { index: atIndex } = findCard(section.id);
        addNewNestedSectionAt(newSection, atIndex);
      } else if (!id) {
        const { index: atIndex } = findCard(section.id);
        onSectionDelete(droppedSection.id);
        addNewNestedSectionAt(droppedSection, atIndex);
      } else {
        const { index: atIndex } = findCard(section.id);
        onReorder(id, atIndex);
      }
      return { isHandled: true };
    }
  });

  const opacity = (isOver || isDragging) ? 0.3 : 1;
  const classNames = clx({
    'nested-section': true,
    [className]: className
  });

  return (
    <div
      ref={(ref) => drop(dragConnect(ref))}
      className={clx('layout-section', classNames)}
      style={{ opacity, position: 'relative' }}
    >
      <SettingsHandles
        handleDelete={deleteNestedSectionWithId}
        section={section}
        id={section.id}
      />
      <SectionContent
        type={section.type}
        section={section}
        onChange={onChange}
        {...section.content}
      />
    </div>
  );
};

const LayoutContent = ({
  className,
  content: {} = {},
  section = {},
  onDrop
}) => {
  const { actions } = useContext();
  let {
    styles,
    structure: { columns = 2 } = {},
    content: { sections: NestedSections = [] }
  } = section;

  if (!styles) styles = {};
  const sectionStyle = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`,
    height: `${styles.height}px`,
    width: `${styles.width}px`
  };


  const classNames = clx({
    'layout-section': true,
    [className]: className
  });


  const findCard = (id) => {
    const section = NestedSections.filter((c) => `${c.id}` === id)[0];
    return {
      section,
      index: NestedSections.indexOf(section)
    };
  };

  const onNestedSectionReorder = (id, atIndex) => {
    const { section: nestedSection, index } = findCard(id);
    const newNestedSections = update(NestedSections, {
      $splice: [
        [index, 1],
        [atIndex, 0, nestedSection]
      ]
    });
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };

  const addNewNestedSectionAt = (_section, atIndex) => {
    if (NestedSections.length > 4) return;
    const newNestedSections = update(NestedSections, {
      $splice: [
        [0, 0],
        [atIndex, 0, { ..._section, id: ids.generate() }]
      ]
    });
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };
  const deleteNestedSectionWithId = (id) => {
    const newNestedSections = update(NestedSections, {
      $splice: [
        [0, 0],
        [NestedSections.findIndex(({ id: secId }) => id === secId), 1]
      ]
    });
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };
  if (NestedSections.length === 1) {
    onDrop({ parentSectionId: section.id, section: NestedSections[0] });
    actions.onSectionDelete(section.id);
  }
  const onNestedSectionChange = (changedSection) => {
    const newSections = NestedSections.map((section) => {
      if (section.id === changedSection.id) return changedSection;
      return section;
    });

    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newSections
      }
    });
  };
  return (
    <div className={classNames} style={sectionStyle}>
      {
        NestedSections.map((childSection) => (
          <NestedSection
            key={childSection.id}
            onReorder={onNestedSectionReorder}
            addNewNestedSectionAt={addNewNestedSectionAt}
            onChange={onNestedSectionChange}
            onSectionDelete={actions.onSectionDelete}
            deleteNestedSectionWithId={deleteNestedSectionWithId}
            className='item'
            findCard={findCard}
            section={childSection}
            parentSectionId={section.id}
          />))}
    </div>
  );
};

LayoutContent.propTypes = {};

export default LayoutContent;
