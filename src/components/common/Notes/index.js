import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import clx from 'classnames';

import './style.css';
export const Note = ({
  showOnce,
  children,
  referenceLink,
  image,
  className,
  onCloseNote,
  style
}) => {

  const [open, setOpen] = useState(showOnce);

  const onClose = () => {
    if (onCloseNote && typeof (onCloseNote) === 'function')
      onCloseNote();

    setOpen(false);
  };
  if (!open) return null;

  const classNames = clx('note-body', className);
  return (
    <div className={classNames} style={style}>
      {referenceLink && (
        <a
          href={referenceLink}
          target='_blank'
          rel='noreferrer noopener'
          className='note-reference-link'
        >
          <i className='fas fa-info-circle' />
        </a>)
      }
      <IoIosCloseCircleOutline onClick={onClose} className='note-close-icon' />
      <div className='note-content'>
        {children}
      </div>
      {image && <img src={image} alt='note figure' className='note-image' />}
    </div>
  );
};
