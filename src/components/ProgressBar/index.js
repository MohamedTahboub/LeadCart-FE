import React from 'react';

import common from 'components/common';
import { ProgressBar } from './components';
import './style.css';

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

export default ProgressBarSection;
