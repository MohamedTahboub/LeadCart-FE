import React, { useState } from 'react';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import OneContent from './components';
import './style.css';

const { ResizableInput } = common;

const ContentReveal = (props) => {
  const { title, list, section } = props;
  const { styles } = section;
  const { bulletColor } = styles;
  const { actions } = useContext();
  const [open, setOpen] = useState(false);

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

  const onContentChange = ({ target: { value, name } }) => {
    const newList = list.map((ele) => {
      if (name.split('.')[1] === `${ele.id}`) {
        if (name.split('.')[0] === 'title') {
          return {
            ...ele,
            title: value
          };
        } else {
          return {
            ...ele,
            content: value
          };
        }
      }
      return ele;
    });

    onChange(newList);
  };

  const onDelete = (id) => {
    const newList = list.filter((ele) => ele.id !== (id));
    onChange(newList);

    if (!newList.length)
      actions.onSectionDelete(section.id);
  };


  return (
    <section className='contentReveal'>
      <ResizableInput value={title} className='contentReveal-title' />

      <div>
        {list.map((ele, id) => (
          <OneContent
            onChange={onContentChange}
            toggle={toggle}
            open={open}
            onDelete={onDelete}
            key={id}
            color={bulletColor}
            styles={styles}
            {...ele}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentReveal;
