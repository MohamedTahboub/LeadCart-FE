import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

const LayoutContent = ({
  className,
}) => {
  const classNames = clx({
    'layout-section': true,
    [className]: className,
  });

  return (
    <div className={classNames}>
      <div className='item' />
      <div className='item' />
    </div>
  );
};

LayoutContent.propTypes = {

};

export default LayoutContent;
