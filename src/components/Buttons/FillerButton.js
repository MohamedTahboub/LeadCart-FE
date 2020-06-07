import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FillerButton = ({ className, children, ...props }) => (
  <Button {...props} className={classNames(className, 'filler-button')}>
    {children}
  </Button>
);

FillerButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.oneOf([null])])
};

FillerButton.defaultProps = {
  className: '',
  children: null
};

export default FillerButton;
