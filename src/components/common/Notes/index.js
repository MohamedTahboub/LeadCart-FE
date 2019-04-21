import React from 'react';

import './style.css';
export const Note = ({ children, referenceLink, image }) => (
  <div className='note-body'>
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
    <div className='note-content'>
      {children}
    </div>
    {image && <img src={image} alt='note figure' className='note-image' />}
  </div>
);
