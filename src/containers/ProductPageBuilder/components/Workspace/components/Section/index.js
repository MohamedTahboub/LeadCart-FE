import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import common from 'components/common';


import './style.css';
import {
  SectionContent
} from './components';


const Section = ({
  className,
  hidden,
  type,
  content,
  style,
}) => {
  if (hidden) return null;


  const classes = clx({
    'product-section': true,
    [className]: className
  });

  return (
    <div className={classes} style={style}>
      <SectionContent type={type} {...content} />

    </div>
  );
};

Section.propTypes = {

};

export default Section;
