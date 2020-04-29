import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import Section from '../index';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import * as dropTypes from '../../dropTypes';
import { useContext } from '../../../../../actions';
import SectionContent from './SectionContent';

const NestedSection = ({
  className,
  onReorder,
  findCard,
  onChange,
  addNewNestedSectionAt,
  section = {},
  ...props
}) => {
  const [{ isDragging }, dragConnect] = useDrag({
    item: {
      type: dropTypes.NESTED_SECTION,
      section,
      id: section.id
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),

    // if (!didDrop) moveCard(droppedId, originalIndex);

  });

  const [{ isOver }, drop] = useDrop({
    accept: dropTypes.NESTED_SECTION,
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: ({ new: isNew, id, section: droppedSection }) => {
      // const { id: droppedId, originalIndex } = monitor.getItem();
      // const didDrop = monitor.didDrop();
      // if (didDrop)


      if (isNew) {
        // add new sections
        const { index: atIndex } = findCard(section.id);
        addNewNestedSectionAt(droppedSection, atIndex);
      } else {
        const { index: atIndex } = findCard(section.id);
        onReorder(id, atIndex);
      }
    }
    // canDrop: () => false,
    // hover: ({ id: draggedId }, monitor) => {
    //   const item = monitor.getItem();
    //   if (item.type === 'card' && item.id) {
    //     const { index: overIndex } = findCard(item.id);
    //     return moveCard(draggedId, overIndex);
    //   }

    //   if (item.type === 'card' && !item.id) {

    //   }
    
    // if (draggedId !== id) {
    //   const { index: overIndex } = findCard(id);
    //   moveCard(draggedId, overIndex);
    // }
    // },
  });

  const opacity = (isOver || isDragging) ? 0.3 : 1;
  const classNames = clx({
    'nested-section': true,
    [className]: className,
  });

  return (
    <div
      ref={(ref) => drop(dragConnect(ref))}
      className={classNames}
      style={{ opacity }}
    >
      <SectionContent
        type={section.type}
        section={section}
        onChange={onChange}
        {...section.content}
      />
    </div>
  );
};

const nestedSectionTemplate = {

};
const LayoutContent = ({
  className,
  content: {

  } = {},
  section = {}
}) => {
  const { actions } = useContext();

  let {
    styles,
    structure: { columns = 2 } = {},
    content: {
      sections: NestedSections = [],
    }
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
    [className]: className,
  });


  const findCard = (id) => {
    const section = NestedSections.filter((c) => `${c.id}` === id)[0];
    return {
      section,
      index: NestedSections.indexOf(section),
    };
  };

  const onNestedSectionReorder = (id, atIndex) => {
    const { section: nestedSection, index } = findCard(id);
    const newNestedSections = update(NestedSections, {
      $splice: [
        [index, 1],
        [atIndex, 0, nestedSection],
      ],
    });
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };

  const addNewNestedSectionAt = (section, atIndex) => {
    const newNestedSections = update(NestedSections, {
      $splice: [
        [0, 0],
        [atIndex, 0, section],
      ],
    });
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.sections',
        value: newNestedSections
      }
    });
  };
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
      {NestedSections.map((section, id) => (
        <NestedSection
          key={section.id}
          onReorder={onNestedSectionReorder}
          addNewNestedSectionAt={addNewNestedSectionAt}
          onChange={onNestedSectionChange}
          className='item'
          findCard={findCard}
          section={section}
        />))}
    </div>
  );
};

LayoutContent.propTypes = {

};

export default LayoutContent;
