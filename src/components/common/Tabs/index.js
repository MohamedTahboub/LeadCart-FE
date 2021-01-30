import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import { FlexBox } from '../boxes';
import './style.css';
import { isFunction } from 'libs/checks';


const getActiveContent = (children, active) => {
  const contentElement = (Array.isArray(children)
    ? children.filter(Boolean).find(({ props = {} }) => props.id === active)
    : children);
  return contentElement
    ? (contentElement.props && contentElement.props.children)
    : null;
};

const getTabsTitles = (children, activeTab) => (
  Array.isArray(children)
    ? children.filter(Boolean).map(({ props = {} }) => ({ ...props, active: props.id === activeTab }))
    : [(children ? children.props : null)]
);

export const Tabs = ({
  children,
  className,
  tabsContentClassName,
  tabTitleClassName,
  vertical,
  titleColor,
  active,
  onChange,
  blockTabsNavigation
}) => {
  const [activeTab, setActiveTab] = useState(active);

  const tabContent = getActiveContent(children, activeTab);

  const tabsTitles = getTabsTitles(children, activeTab);


  useEffect(() => {
    setActiveTab(active);
  }, [active]);

  const onTabChange = (tabId) => () => {
    const canNavigate = !blockTabsNavigation;
    if (isFunction(onChange) && canNavigate) return onChange(tabId, active);
    canNavigate && setActiveTab(tabId);
  };

  return (
    <FlexBox column={!vertical} className={clx('tabs-container', { [className]: className, vertical })}>
      <FlexBox className='tabs-header' column={vertical}>
        {tabsTitles.map((tab) => (
          <Tab
            {...tab}
            key={tab.id}
            className={clx(tab.className, tabTitleClassName)}
            onClick={onTabChange(tab.id)}
            titleColor={titleColor}
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
  titleColor = '#808292',
  borderColor,
  onClick
}) => {

  const style = {
    '--title-color': titleColor,
    '--active-border-color': (!borderColor && titleColor) ? titleColor : 'rgba(33, 123, 232, 0.767)'
  };

  return (
    <div
      id-data={id}
      style={style}
      className={`tab-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
