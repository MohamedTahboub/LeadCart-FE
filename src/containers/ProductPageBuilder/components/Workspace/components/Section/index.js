import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import common from 'components/common';


import './style.css';
import {
  SectionContent,
  SettingsHandles
} from './components';


const Section = ({
  id,
  className,
  hidden,
  type,
  content,
  style,
  order,
  maxOrder,
  active,
  onSetting,
  onSectionOrderChange,
  ...props
}) => {
  if (hidden) return null;


  const classes = clx({
    'product-section': true,
    active,
    [className]: className
  });


  return (
    <div className={classes} style={style}>
      <SettingsHandles
        onOrderChange={onSectionOrderChange}
        onSettings={onSetting}
        order={order}
        id={id}
        maxOrder={maxOrder}
      />
      <SectionContent type={type} {...content} />
    </div>
  );
};

Section.propTypes = {

};

export default Section;
