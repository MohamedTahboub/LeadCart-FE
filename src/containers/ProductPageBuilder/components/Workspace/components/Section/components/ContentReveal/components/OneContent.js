import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

import common from 'components/common';

const { ResizableInput, ResizableTextarea } = common;

const OneContent = ({ title, content, id, toggle, onChange, open, onDelete }) => {
  return (
    <div className={clx(
      'contentReveal-listItem', 'margin-v-10',
      { 'content-active': open === title }
    )}
    >

      <span className='contentReveal-listItem-delete' >
        <i
          role='presentation'
          onClick={() => {
            onDelete(id);
          }}
          className='fas fa-trash-alt'
        />
      </span>

      {open !== title ?
        <FaPlusCircle className='contentReveal-listItem-icon'
          onClick={() => {
            toggle(title);
          }}
        />
        :
        <FaMinusCircle className='contentReveal-listItem-icon' onClick={() => {
          toggle(title);
        }}
        />
      }

      <span className='contentReveal-listItem-title'>
        <ResizableInput value={title} onChange={onChange} name={`title.${id}`} />
      </span>

      <Expand open={open === title}>
        <ResizableTextarea className='contentReveal-listItem-content' value={content} onChange={onChange} name={`content.${id}`} />
      </Expand>
    </div>
  );
};

export default OneContent;
