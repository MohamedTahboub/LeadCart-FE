import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import useEventListener from '@use-it/event-listener';
import { nodeHasChildElement } from 'libs';
import ids from 'shortid';
import { GoSettings } from 'react-icons/go';
import { BiHide } from 'react-icons/bi';

import './style.css';

const SettingToggleIcons = ({ show }) => {
  return !show ? (
    <GoSettings color='#25345d' />
  ) : (
    <BiHide color='#25345d' />
  );
};


export default ({ title, button, popUpContent, defaultCloseBtn = true, className, ...props }) => {
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

  // let buttonContent = typeof button === 'function' ? button({  }) : button;


  return (
    <div className={clx('inline-popup-container', className)}>
      <span className='title'>{title}</span>
      <span onClick={onToggleShow} className='inline-popup-toggle-btn'>
        {SettingToggleIcons({ show })}
      </span>
      {show && <Popup id={currentId} onClose={onToggleShow}>{popUpContent}</Popup>}
    </div>
  );
};

const Popup = ({ id, children, onClose }) => {

  const onKeyDown = (e) => {
    const parentElement = document.getElementById(id);
    if (!parentElement) return;
    const isIgnored = nodeHasChildElement(parentElement, e.target);

    if (!isIgnored)
      onClose();
  };

  useEventListener('click', onKeyDown);

  return <div id={id} className='inline-popup'>{children}</div>;
};
