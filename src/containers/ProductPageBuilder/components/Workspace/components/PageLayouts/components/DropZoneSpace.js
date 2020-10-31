import React from 'react';
import { DropZone, Section } from '../..';
import common from 'components/common';

const { FlexBox } = common;

export default (props) => {

  const {
    onSectionDropped,
    sections,
    dropAreaImage,
    onSectionSettings,
    onSectionOrderChange,
    activeSection,
    moveCard,
    moveCrossColumns,
    onSectionDuplicate,
    findCard,
    activeLanguage,
    addNewAndMove,
    parentZone,
    style
  } = props;


  const localSections = sections.filter((section) => section.parentZone && section.parentZone === parentZone);

  const hasOneSection = Array.isArray(localSections) && (!localSections.length);

  return (
    <DropZone onDrop={onSectionDropped} parentZone={parentZone} style={style} moveCard={moveCard}>
      {hasOneSection && (
        <FlexBox column center='h-center v-center' flex className='builder-drop-area'>
          <img src={dropAreaImage} alt='Drop Area' className='drop-area-image' />
          <span className='gray-text'>
            Drop your sections here
          </span>
        </FlexBox>
      )}
      {
        localSections.map((section, index) => (
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
            moveCrossColumns={moveCrossColumns}
            onSectionDuplicate={onSectionDuplicate}
            findCard={findCard}
            language={activeLanguage}
            addNewAndMove={addNewAndMove}
            parentZone={parentZone}
            index={index}
          />
        ))
      }
    </DropZone>
  );
};
