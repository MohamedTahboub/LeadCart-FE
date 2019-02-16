import React from 'react';

export const TabsNavigator = ({ tabs, history, props }) => {
  const goToTabe = (tabName) => {
    history.push(tabName);
  };
  const classes = (thisTabe) => ({
    className: history.location.pathname === thisTabe
      ? 'nav-link active-nav-link'
      : 'nav-link'
  });
  return (
    <div className='product-details-nav'>
      {tabs.map(({ title, hash, sub }, id) => (
        <span key={id} onClick={() => goToTabe(hash || sub)} {...classes(hash || sub)}>{title}</span>
      ))}
    </div>
  );
};
