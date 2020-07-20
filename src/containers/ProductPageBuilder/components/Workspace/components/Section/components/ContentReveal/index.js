import React, { useState } from 'react';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import OneContent from './components';
import './style.css';

const { ResizableInput } = common;

const ContentReveal = (props) => {
  const { title, list, section } = props;
  const { actions } = useContext();
  const [open, setOpen] = useState(false);

  const toggle = (title) => {
    if (open === title)
      setOpen(false);
    else
      setOpen(title);
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
    const newList = list.map((ele, id) => {
      if (name.split('.')[1] === `${id}`) {
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
    const newList = list.filter((ele, i) => i !== (id));
    onChange(newList);

    if (!newList.length)
      actions.onSectionDelete(section.id);
  };


  return (
    <section className='contentReveal'>
      <ResizableInput value={title} className='contentReveal__title' />

      <div className='contentReveal__list-container'>
        {list.map((ele, id) => (
          <OneContent
            ele={ele}
            id={id}
            onChange={onContentChange}
            toggle={toggle}
            open={open}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentReveal;
