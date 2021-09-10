import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import useEventListener from '@use-it/event-listener';
import { nodeHasChildElement } from 'libs';
import ids from 'shortid';
import { GoSettings } from 'react-icons/go';
import { BiHide } from 'react-icons/bi';

import './style.css';

const SettingToggleIcons = ({ show, Icon }) => {
  const OpenIcon = Icon ? Icon : GoSettings;

  return !show ? (
    <OpenIcon color='#25345d' />
  ) : (
    <BiHide color='#25345d' />
  );
};


export default ({ title, button, popUpContent, position = 'center', icon, defaultCloseBtn = true, className, popupClass, ...props }) => {
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState('id!');

  const onToggleShow = (e) => {
    setTimeout(() => {
      setShow(!show);
    }, 100);
  };
  useEffect(() => {
    const id = ids.generate();
    if (!currentId || currentId !== id)
      setCurrentId(id);
      // eslint-disable-next-line
  }, []);

  // let buttonContent = typeof button === 'function' ? button({  }) : button;


  return (
    <div className={clx('inline-popup-container', className)}>
      {title && <span className='title'>{title}</span>}
      <span onClick={onToggleShow} className='inline-popup-toggle-btn'>
        {SettingToggleIcons({ show, Icon: icon })}
      </span>
      {show && <Popup id={currentId} onClose={onToggleShow} position={position} popupClass={popupClass}>{popUpContent}</Popup>}
    </div>
  );
};

const Popup = ({ id, children, onClose, position, popupClass }) => {

  const onKeyDown = (e) => {
    const parentElement = document.getElementById(id);
    if (!parentElement) return;
    const isIgnored = nodeHasChildElement(parentElement, e.target);

    if (!isIgnored)
      onClose();
  };

  useEventListener('click', onKeyDown);

  return <div id={id} className={clx(`inline-popup ${popupClass}`, { [`position-${position}`]: position })}>{children}</div>;
};
