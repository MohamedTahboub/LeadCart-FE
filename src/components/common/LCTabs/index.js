import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

const Tab = ({ onClick, tabKey: key, tab, active }) => {
  return (
    <div onClick={() => onClick(key)} className={classNames('lc-tabs-tab', { active })}>
      {tab}
    </div>
  );
};

Tab.propTypes = {
  onClick: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired
};

const LCTabs = ({ activeKey, defaultActiveKey, children, onChange, fitPaneContent, horizontal, className }) => {
  const [_activeTabKey, _setActiveTab] = useState(defaultActiveKey);
  const activeTabKey = activeKey || _activeTabKey;
  const setActiveTab = (key) => {
    if (key !== activeTabKey) _setActiveTab(key);
  };

  const childrenArray = React.Children.map(children, (child) => React.cloneElement(child, { tabKey: child.key }));
  let targetChild = childrenArray.find((child) => child.props.tabKey === activeTabKey);
  if (!targetChild) {
    targetChild = childrenArray[0];
    setActiveTab(targetChild.props.tabKey);
  }

  const _onChange = (key) => {
    setActiveTab(key);
    if (onChange) onChange(key);
  };

  return (
    <div className={classNames('lc-tabs', { horizontal }, className)}>
      <div className={classNames('lc-tabs-sidebar', { fit: fitPaneContent })}>
        {
          childrenArray.map(({ props }) => <Tab tab={props.tab} tabKey={props.tabKey} active={activeTabKey === props.tabKey} onClick={_onChange}/>)
        }
      </div>
      <div className='lc-tabs-content'>
        {targetChild}
      </div>
    </div>
  );
};

LCTabs.propTypes = {
  activeKey: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string
};

LCTabs.defaultProps = {
  onChange: () => {},
  activeKey: null,
  defaultActiveKey: '',
  className: ''
};

LCTabs.TabPane = ({ children }) => {
  return (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default LCTabs;
