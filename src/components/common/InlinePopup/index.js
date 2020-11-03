import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import useEventListener from '@use-it/event-listener';
import { nodeHasChildElement } from 'libs';
import ids from 'shortid';

import './style.css';

export default ({ title, button, popUpContent, className, ...props }) => {
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState('id!');

  const onToggleShow = () => {
    setShow((show) => !show);
  };
  useEffect(() => {
    const id = ids.generate();
    if (!currentId || currentId !== id)
      setCurrentId(id);

  }, []);

  const buttonContent = typeof button === 'function' ? button({ show }) : button;

  return (
    <div className={clx('inline-popup-container', className)}>
      <span className='title'>{title}</span>
      <span onClick={onToggleShow} className='inline-popup-toggle-btn'>
        {buttonContent}
      </span>
      {show && <Popup id={currentId} onClose={onToggleShow}>{popUpContent}</Popup>}
    </div>
  );
};

const Popup = ({ id, children, onClose }) => {

  const onKeyDown = (e) => {
    const parentElement = document.getElementById(id);
    console.log('ELEMENT', e.target, id, parentElement);
    if (!parentElement) return;
    const isIgnored = nodeHasChildElement(parentElement, e.target);

    console.log({ isIgnored });
    if (!isIgnored)
      onClose();
  };

  useEventListener('click', onKeyDown);

  return <div id={id} className='inline-popup'>{children}</div>;
};
