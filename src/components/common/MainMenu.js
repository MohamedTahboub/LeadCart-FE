import React from 'react';


export const Menu = (props) => (
  <menu className='menu-container'>
    {props.children}
  </menu>
);
export const Link = ({ to, external, ...props }) => {
  const { classes = [] } = props;
  const { history, page } = to || {};

  const goToPage = (page) => {
    if (!history || history.location.pathname === `/${page}`) return;
    history && history.push(page);
  };
  const action = (url) => (external ? window.open(url, '_blank') : goToPage(url));

  return (
    <span onClick={action.bind(this, page)} className={`menu-item ${classes.join(' ')}`}>
      {props.children}
    </span>
  );
};

