import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';

import { ProgressBar } from './components';

const { ResizableInput } = common;


const ProgressBarSection = ({
  value = 70,
  colors = {},
  theme = '',
  text = 'Complete',
  ...props
}) => {
  const barProps = {
    striped: theme.includes('striped'),
    animated: theme.includes('animated'),
    rectangle: theme.includes('rectangle'),
    colors,
    value
  };

  return (
    <ProgressBar {...barProps}>
      <ResizableInput
        value={text}
        autocomplete='off'
        style={{ backgroundColor: 'transparent' }}
        {...props}
      />
    </ProgressBar>
  );
};

ProgressBarSection.propTypes = {};

export default ProgressBarSection;
