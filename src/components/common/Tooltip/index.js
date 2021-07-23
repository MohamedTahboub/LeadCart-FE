import React from 'react';
import ReactTooltip from 'rc-tooltip';
import clx from 'classnames';

import './style.css';

const Tooltip = ({ text, children, placement, className, delay, ...props }) => {
  const classes = clx('react-tooltip', { className });

  return (
    <ReactTooltip
      className={classes}
      placement={placement}
      overlay={text}
      mouseEnterDelay={delay}
      {...props}
    >
      {children}
    </ReactTooltip>
  );

};
export default Tooltip;
