import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';
import { FaTrashAlt } from 'react-icons/fa';

import common from 'components/common';
import ContentIcons from './faqIcon';

const { ResizableInput, ResizableTextarea, FlexBox } = common;

const FAQ = ({ title, content, id, toggle, onChange, open, onDelete, itemStyles }) => {
  const {
    backgroundColor,
    titleColor,
    contentTextColor,
    contentBackgroundColor = 'transparent',
    borderColor,
    borderWidth,
    borderStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    hasShadow,
    boxShadowBlur,
    boxShadowOffsetX,
    boxShadowOffsetY,
    shadowColor
  } = itemStyles;


  const containerStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    boxShadow: hasShadow ? `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 0}px ${boxShadowBlur || 0}px ${shadowColor || '#FFF'}` : ''
  };

  const titleStyle = { color: titleColor };

  const contentStyle = {
    color: contentTextColor,
    backgroundColor: contentBackgroundColor
  };


  return (
    <div className={clx('faq-listItem', 'margin-v-10', { 'faq-active': open === id })} style={containerStyle} >
      <FlexBox center='v-center'>
        <FaTrashAlt
          className='faq-listItem-delete'
          onClick={() => {onDelete(id);}}
        />

        <FlexBox onClick={() => {toggle(id);}} className='v-center' flex>
          <ContentIcons
            id={id}
            toggle={toggle}
            open={open}
            size={16}
            {...itemStyles}
          />

          <ResizableInput
            value={title}
            onChange={onChange}
            name={'title'}
            id={id}
            style={titleStyle}
            className='faq-listItem-title flex-1'
          />
        </FlexBox>
      </FlexBox>


      <Expand open={open === id} >
        <ResizableTextarea
          className='faq-listItem-content p-1'
          value={content}
          onChange={onChange}
          name={'content'}
          id={id}
          style={contentStyle}
        />
      </Expand>
    </div>
  );
};

export default FAQ;
