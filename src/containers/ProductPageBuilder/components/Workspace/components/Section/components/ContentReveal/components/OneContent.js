import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';

import common from 'components/common';

const { ResizableInput } = common;

const OneContent = ({ ele, id, toggle, onChange, open, onDelete }) => {
  return (
    <div className={clx(
      'contentReveal__list-item', 'margin-v-10',
      { 'content-active': open === ele.title }
    )}
    >

      <span className='contentReveal__list-item__delete' >
        <i
          role='presentation'
          onClick={() => {
            onDelete(id);
          }}
          className='fas fa-trash-alt'
        />
      </span>

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
        <ResizableInput value={ele.title} onChange={onChange} name={`title.${id}`} />
      </span>

      <Expand open={open === ele.title}>
        <ResizableInput className='contentReveal__list-item__content' value={ele.content} onChange={onChange} name={`content.${id}`} />
      </Expand>
    </div>
  );
};

export default OneContent;
