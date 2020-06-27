import React, { useEffect, useState } from 'react';
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
import Split from 'react-split';
import FlexibleBox from 'components/FlexibleBox';

const NestedSection = ({
  className,
  onReorder,
  findCard,
  onChange,
  addNewNestedSectionAt,
  section = {},
  onSectionDelete,
  parentSectionId,
  deleteNestedSectionWithId,
  shallow,
  ...rest
}) => {
  const { state: { dndEnabled = true } } = useContext();
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
    canDrop: () => !shallow,
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

  const opacity = ((isOver || isDragging) && !shallow) ? 0.3 : 1;
  const classNames = clx({
    'nested-section': true,
    [className]: className
  });

  return (

    <div
      ref={(ref) => drop(dragConnect(ref))}
      className={clx('layout-section', classNames)}
      style={{ opacity, position: 'relative' }}
      {...rest}
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
        parentSectionId={parentSectionId}
        {...section.content}
      />
    </div>
  );
};

const LayoutContent = ({
  className,
  content: {} = {},
  section = {},
  onDrop,
  shallow
}) => {
  const { actions } = useContext();
  let {
    styles,
    structure: { columns = 2 } = {},
    content: { sections: nestedSections = [] }
  } = section;
  const [sectionsMounted, setSectionsMounted] = useState(true);
  useEffect(() => {
    setSectionsMounted(false);
    setTimeout(() => setSectionsMounted(true), 0);
  }, [nestedSections]);

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
    const section = nestedSections.filter((c) => `${c.id}` === id)[0];
    return {
      section,
      index: nestedSections.indexOf(section)
    };
  };

  const onNestedSectionReorder = (id, atIndex) => {
    const { section: nestedSection, index } = findCard(id);
    const newNestedSections = update(nestedSections, {
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
    if (nestedSections.length > 4) return;
    const newNestedSections = update(nestedSections, {
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
    const newNestedSections = update(nestedSections, {
      $splice: [
        [0, 0],
        [nestedSections.findIndex(({ id: secId }) => id === secId), 1]
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
  if (nestedSections.length === 1) {
    onDrop({ parentSectionId: section.id, section: nestedSections[0] });
    actions.onSectionDelete(section.id);
  }
  const onNestedSectionChange = (changedSection) => {
    const newSections = nestedSections.map((section) => {
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
  const onSizeChange = (size) => {
  };
  return (
    <FlexibleBox
      size={{ height: styles.height }}
      onResize={onSizeChange}
      showOnParentHover
      className='overflow-hidden'
    >
      <div className={classNames} style={sectionStyle}>
        {
          sectionsMounted && (
            <Split
              minSize={100}
              gutterSize={8}
              cursor='col-resize'
              style={{ display: 'flex', width: '100%' }}
            >
              {
                nestedSections.map((childSection) => (
                  <NestedSection
                    shallow={shallow}
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
                  />
                ))
              }
            </Split>
          )
        }
      </div>
    </FlexibleBox>
  );
};

LayoutContent.propTypes = {};

export default LayoutContent;
