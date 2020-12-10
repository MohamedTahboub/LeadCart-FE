import React, { useState } from 'react';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import Content from './components';
import './style.css';

const { ResizableInput } = common;

const FAQs = ({ title, list, section }) => {
  const { styles } = section;
  const { actions } = useContext();
  const [open, setOpen] = useState(false);


  const {
    backgroundColor,
    titleColor = '#000',
    borderColor,
    borderStyle = 'solid',
    borderWidth = 0,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,

    itemBackgroundColor,
    itemTitleColor,
    itemContentTextColor,
    itemContentBackgroundColor,
    itemBorderColor,
    itemBorderWidth = 0,
    itemBorderStyle = 'solid',
    itemBorderTopLeftRadius = 0,
    itemBorderTopRightRadius = 0,
    itemBorderBottomLeftRadius = 0,
    itemBorderBottomRightRadius = 0,
    hasShadow,
    boxShadowBlur,
    boxShadowOffsetX,
    boxShadowOffsetY,
    shadowColor,


    customOpenIcon = '',
    customCloseIcon = '',
    isCustom,
    iconsColor
  } = styles;


  const containerStyle = {
    backgroundColor,
    borderWidth,
    borderColor,
    color: titleColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderStyle,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
  };


  const itemStyle = {
    itemBackgroundColor,
    itemTitleColor,
    itemContentTextColor,
    itemContentBackgroundColor,
    itemBorderColor,
    itemBorderWidth,
    customOpenIcon,
    customCloseIcon,
    isCustom,
    iconsColor,
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
  };


  const toggle = (id) => {
    if (open === id)
      setOpen(false);
    else
      setOpen(id);
  };

  const onChange = (newList) => {
    actions.onSectionFieldChange({
      ...section,
      content: {
        ...section.content,
        list: newList
      }
    });
  };

  const onFAQChange = ({ target: { id, value, name } }) => {
    const newList = list.map((ele) => {
      if (id === ele.id) {
        return {
          ...ele,
          [name]: value
        };
      } else {
        return ele;
      }
    });

    onChange(newList);
  };


  const onDelete = (id) => {
    const newList = list.filter((ele) => ele.id !== (id));
    onChange(newList);

    if (!newList.length)
      actions.onSectionDelete(section.id);
  };


  const onFaqTitleChange = ({ target: { value } }) => {
    actions.onSectionFieldChange({
      ...section,
      content: {
        ...section.content,
        title: value
      }
    });
  };


  return (
    <section className='faq' style={{ ...containerStyle }}>
      <ResizableInput value={title} className='faq-title' onChange={onFaqTitleChange} style={{ color: titleColor }} />

      <div>
        {list.map((ele, id) => (
          <Content
            onChange={onFAQChange}
            toggle={toggle}
            open={open}
            onDelete={onDelete}
            key={id}
            styles={styles}
            itemStyle={itemStyle}
            {...ele}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQs;
