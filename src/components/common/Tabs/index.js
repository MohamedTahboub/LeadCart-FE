import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import { FlexBox } from '../boxes';
import './style.css';


const getActiveContent = (children, active) => {
  const contentElement = (Array.isArray(children)
    ? children.find(({ props = {} }) => props.id === active)
    : children);
  return contentElement
    ? (contentElement.props && contentElement.props.children)
    : null;
};

const getTabsTitles = (children, activeTab) => (
  Array.isArray(children)
    ? children.map(({ props = {} }) => ({ ...props, active: props.id === activeTab }))
    : [(children ? children.props : null)]
);

export const Tabs = ({
  children,
  className,
  tabsContentClassName,
  vertical,
  active,
  onChange
}) => {
  const [activeTab, setActiveTab] = useState(active);

  const tabContent = getActiveContent(children, activeTab);

  const tabsTitles = getTabsTitles(children, activeTab);


  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const onTabChange = (tabId) => () => {
    setActiveTab(tabId);
    if (onChange) onChange(tabId);
  };

  return (
    <FlexBox column={!vertical} className={clx('tabs-container', { [className]: className, vertical })}>
      <FlexBox className='tabs-header' column={vertical}>
        {tabsTitles.map((tab) => (
          <Tab
            {...tab}
            key={tab.id}
            onClick={onTabChange(tab.id)}
          />
        ))}
      </FlexBox>
      <FlexBox column fullWidth={vertical} className={`tabs-content ${tabsContentClassName}`}>
        {tabContent}
      </FlexBox>
    </FlexBox>
  );
};

Tabs.propTypes = {};

Tabs.defaultProps = {
  className: '',
  tabsContentClassName: '',
  vertical: false
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
