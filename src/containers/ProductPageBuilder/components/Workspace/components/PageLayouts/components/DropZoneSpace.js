import React from 'react'
import { DropZone, Section } from '../..';
import common from 'components/common';

const {
    FlexBox
} = common;

export default (props) => {

    const {
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
        addNewAndMove,
        parentZone
    } = props;


    const localSections = sections.filter((section) => parentZone ? section.parentZone === parentZone : true);

    const hasOneSection = Array.isArray(localSections) && (!localSections.length || localSections.length === 1);

    console.log("Here Zone",parentZone,localSections,sections);
    return (
        <DropZone onDrop={onSectionDropped} parentZone={parentZone}>
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
}