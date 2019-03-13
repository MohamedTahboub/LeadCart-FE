import React, { useState } from 'react';
import { openNewWindow } from 'libs';

export const Menu = (props) => (
  <menu className='menu-container'>
    {props.children}
  </menu>
);


export const Link = ({
  to: { history, page } = {}, onTabChange, active, external, className = '', ...props
}) => {
  const goToPage = (page) => {
    if (!history || history.location.pathname === `/${page}`) return;
    history && history.push(page);
  };

  const onClick = () => {
    if (!external)goToPage(page);
    else openNewWindow(page);

    onTabChange(page);
  };
  return (
    <span
      onClick={onClick}
      className={`menu-item ${className} ${active ? 'active-menu-item' : ''}`}
    >
      {props.children}
    </span>
  );
};

