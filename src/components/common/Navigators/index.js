import React, { Fragment, useEffect, useState } from 'react';
import ids from 'shortid';
import PropTypes from 'prop-types';

import './style.css';
import { FlexBox } from '../boxes';

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
  history: PropTypes.object
};

export const SubTabs = ({
  tabs = {},
  activeTab,
  headSuffix,
  className = '',
  container: Container,
  containerClassName = '',
  defaultTab,
  ...props
}) => {
  const [activeTabName, setActiveTabName] = useState(defaultTab);

  const goToTab = (tabName) => {
    setActiveTabName(tabName);
    props.onTabChange && props.onTabChange(tabName);
  };

  useEffect(() => {
    if (activeTab && activeTabName !== activeTab)
      setActiveTabName(activeTab);
    //eslint-disable-next-line
  }, [activeTab]);

  return (
    <Fragment>
      <FlexBox className={`tabs-titles-container ${className}`}>
        {Object.keys(tabs).map((tabName) => (
          <FlexBox
            key={ids.generate()}
            onClick={() => goToTab(tabName)}
            role='presentation'
            className={`tab-link ${activeTabName === tabName ? 'active-tab-link' : ''}`}
          >
            {tabName}
          </FlexBox>
        ))}
        {headSuffix}
      </FlexBox>
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
SubTabs.defaultProps = { headSuffix: null };
