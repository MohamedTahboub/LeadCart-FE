import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import './style.css';

import {
  EdgyProgressBar,
  ProgressBar,
  AnimatedProgressBar
} from './components';

const {
  ResizableInput,
  FlexBox,
  LayoutSwitch
} = common;


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
        {...props}
      />
    </ProgressBar>
  );
};

ProgressBarSection.propTypes = {

};

export default ProgressBarSection;
