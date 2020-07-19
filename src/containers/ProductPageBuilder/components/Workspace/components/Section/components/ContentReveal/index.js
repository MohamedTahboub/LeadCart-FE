import React, { useState } from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';


import common from 'components/common';
import { useContext } from '../../../../../../actions';
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

  const onChange = ({ target: { value, name } }) => {
    const newList = list.map((ele, index) => {
      if (name.split('.')[1] === `${index}`) {
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

    actions.onSectionFieldChange({
      ...section,
      content: {
        ...section.content,
        list: newList
      }
    });
  };


  return (
    <section className='contentReveal'>
      <ResizableInput value={title} className='contentReveal__title' />

      <div className='contentReveal__list-container'>
        {list.map((ele, index) => (
          <div className={clx(
            'contentReveal__list-item', 'margin-v-10',
            { 'content-active': open === ele.title }
          )}
          >

            {open !== ele.title ?
              <span className='contentReveal__list-item__icon'
                onClick={() => {
                  toggle(ele.title);
                }}
              >+</span>
              :
              <span className='contentReveal__list-item__icon'
                onClick={() => {
                  toggle(ele.title);
                }}
              >-</span>
            }

            <span className='contentReveal__list-item__title'>
              <ResizableInput value={ele.title} onChange={onChange} name={`title.${index}`} />
            </span>

            <Expand open={open === ele.title}>
              <ResizableInput className='contentReveal__list-item__content' value={ele.content} onChange={onChange} name={`content.${index}`} />
            </Expand>
          </div>
        ))}

      </div>

    </section>
  );
};

export default ContentReveal;
