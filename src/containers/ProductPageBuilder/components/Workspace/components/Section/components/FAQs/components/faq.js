import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';
import { FaTrashAlt } from 'react-icons/fa';

import common from 'components/common';
import ContentIcons from './faqIcon';

const { ResizableInput, ResizableTextarea, FlexBox } = common;

const FAQ = ({ title, content, id, toggle, onChange, open, onDelete, itemStyle }) => {
  const {
    itemBackgroundColor,
    itemTitleColor,
    itemContentTextColor,
    itemContentBackgroundColor,
    itemBorderColor,
    itemBorderWidth,
    itemBorderStyle,
    itemBorderTopLeftRadius,
    itemBorderTopRightRadius,
    itemBorderBottomLeftRadius,
    itemBorderBottomRightRadius,
    hasShadow,
    boxShadowBlur,
    boxShadowOffsetX,
    boxShadowOffsetY,
    shadowColor

  } = itemStyle;


  const containerStyle = {
    backgroundColor: itemBackgroundColor,
    borderColor: itemBorderColor,
    borderWidth: itemBorderWidth,
    borderStyle: itemBorderStyle,
    borderTopLeftRadius: itemBorderTopLeftRadius,
    borderTopRightRadius: itemBorderTopRightRadius,
    borderBottomLeftRadius: itemBorderBottomLeftRadius,
    borderBottomRightRadius: itemBorderBottomRightRadius,
    boxShadow: hasShadow ? `${boxShadowOffsetX || 0}px ${boxShadowOffsetY || 0}px ${boxShadowBlur || 0}px ${shadowColor || '#FFF'}` : ''
  };

  const titleStyle = { color: itemTitleColor };

  const contentStyle = {
    color: itemContentTextColor,
    backgroundColor: (itemContentBackgroundColor || 'transparent')
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
            {...itemStyle}
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
