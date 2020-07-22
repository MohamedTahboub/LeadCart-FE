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


  return (
    <section className='faq'>
      <ResizableInput value={title} className='faq-title' />

      <div>
        {list.map((ele, id) => (
          <Content
            onChange={onFAQChange}
            toggle={toggle}
            open={open}
            onDelete={onDelete}
            key={id}
            styles={styles}
            {...ele}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQs;
