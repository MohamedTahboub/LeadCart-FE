import React, { Fragment, useState } from 'react';
import ids from 'shortid';
import PropTypes from 'prop-types';
import './style.css';

export const TabsNavigator = ({ tabs, history }) => {
  const goToTabe = (tabName) => {
    history.push(tabName);
  };
  const classNames = (thisTab) => ({
    className: history.location.pathname === thisTab
      ? 'tab-link active-tab-link'
      : 'tab-link'
  });
  return (
    <div className='tabs-titles-container'>
      {tabs.map(({ title, hash, sub }, id) => (
        <span
          key={id}
          onClick={() => goToTabe(hash || sub)}
          role='presentation'
          {...classNames(hash || sub)}
        >
          {title}
        </span>
      ))}
    </div>
  );
};
TabsNavigator.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object,
};

export const SubTabs = ({ tabs = {}, className = '', container: Container, containerClassName = '', defaultTab }) => {
  const [activeTabName, setActiveTabName] = useState(defaultTab);

  const goToTab = (tabName) => {
    setActiveTabName(tabName);
  };
  return (
    <Fragment>
      <div className={`tabs-titles-container ${className}`}>
        {Object.keys(tabs).map((tabName) => (
          <span
            key={ids.generate()}
            onClick={() => goToTab(tabName)}
            role='presentation'
            className={`tab-link ${activeTabName === tabName ? 'active-tab-link' : ''}`}
          >
            {tabName}
          </span>
        ))}
      </div>
      {Container ? (
        <Container className={containerClassName}>
          {tabs[activeTabName]}
        </Container>) : tabs[activeTabName]
      }
    </Fragment>
  );
};
SubTabs.propTypes = {
  tabs: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
  defaultTab: PropTypes.string.isRequired
};
