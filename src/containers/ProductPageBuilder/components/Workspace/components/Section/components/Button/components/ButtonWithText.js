import React from 'react';
import common from 'components/common';
import QuillEditor from 'components/QuillEditor';
import clx from 'classnames';

const { FlexBox } = common;

const ButtonWithText = ({ layout, containerClasses, buttonComponent, editor, onEditorChange, section }) => {

  return (
    <FlexBox className='fluid py-5 button-with-text' reverse={layout === 'withTextLeft'}>
      <FlexBox className={clx(containerClasses, 'col-6', 'align-center')}>
        {buttonComponent}
      </FlexBox>
      <FlexBox className='col-6 button-with-text-text-container'>
        <QuillEditor
          className='fluid'
          value={editor}
          onEdit={onEditorChange}
          headingMode
          isMentionsSupported={false}
          bounds={`[id='${section.id}']`}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ButtonWithText;
