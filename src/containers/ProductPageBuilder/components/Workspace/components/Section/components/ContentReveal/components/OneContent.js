import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';

import common from 'components/common';
import { getIcon } from './getIcon';

const { ResizableInput, ResizableTextarea } = common;

const OneContent = ({ title, content, id, toggle, onChange, open, onDelete, color, styles }) => {
  const { customOpenIcon = '', customCloseIcon = '', customBullet, toggleIcon } = styles;
  const { OpenIcon, CloseIcon } = getIcon(toggleIcon);

  return (
    <div className={clx(
      'contentReveal-listItem', 'margin-v-10',
      { 'content-active': open === id }
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

      {
        customBullet ?
          (open !== id ?
            <div className='contentReveal-customIcon'>
              <img
                src={customOpenIcon}
                onClick={() => {
                  toggle(id);
                }}
                alt='Open Icon'
              />
            </div>
            :
            <div className='contentReveal-customIcon'>
              <img
                src={customCloseIcon}
                onClick={() => {
                  toggle(id);
                }}
                alt='Close Icon'
              />
            </div>

          )
          :
          (
            open !== id ?
              <OpenIcon
                style={{ color: `${color}` }}
                className='contentReveal-listItem-icon'
                onClick={() => {
                  toggle(id);
                }}
              />
              :
              <CloseIcon
                style={{ color: `${color}` }}
                className='contentReveal-listItem-icon' onClick={() => {
                  toggle(id);
                }}
              />
          )
      }

      <span className='contentReveal-listItem-title'>
        <ResizableInput value={title} onChange={onChange} name={`title.${id}`} />
      </span>

      <Expand open={open === id}>
        <ResizableTextarea className='contentReveal-listItem-content' value={content} onChange={onChange} name={`content.${id}`} />
      </Expand>
    </div>
  );
};

export default OneContent;
