import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlexBox } from '../boxes';

import './style.css';


const getActiveContent = (children, active) => (Array.isArray(children)
  ? children.find(({ props = {} }) => props.id === active)
  : children);

const getTabsTitles = (children, activeTab) => (
  Array.isArray(children)
    ? children.map(({ props = {} }) => ({ ...props, active: props.id === activeTab }))
    : (children ? children.props : null)
);

export const Tabs = ({ children, ...props }) => {
  const [activeTab, setActiveTab] = useState(props.active);

  const tabContent = getActiveContent(children, activeTab);

  const tabsTitles = getTabsTitles(children, activeTab);


  useEffect(() => {
    setActiveTab(props.active);
  }, [props.active]);

  const onTabChange = (tabId) => () => {
    setActiveTab(tabId);
  };
  return (
    <FlexBox column className='tabs-container'>
      <FlexBox className='tabs-header'>
        {tabsTitles.map((tab) => (
          <Tab
            {...tab}
            key={tab.id}
            onClick={onTabChange(tab.id)}
          />
        ))}
      </FlexBox>
      <FlexBox column className='tabs-content'>
        {tabContent.props.children}
      </FlexBox>
    </FlexBox>
  );
};

Tabs.propTypes = {

};

export const Tab = ({
  id,
  title,
  active,
  onClick
}) => (
  <div
    id-data={id}
    className={`tab-item ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    {title}
  </div>
);

