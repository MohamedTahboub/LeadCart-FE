import React from 'react';
import clx from 'classnames';

import common from 'components/common';

const { FlexBox } = common;

const ProgressBar = ({
  value,
  className = '',
  animated,
  striped,
  rectangle,
  colors = {},
  children
}) => {
  const progressBarValueClasses = clx({
    'progress-value': true,
    animated,
    striped
  });

  const classNames = clx({
    [className]: className,
    'rectangle-bar': rectangle
  });

  return (
    <div
      className={`progress-bar ${classNames}`}
      style={{ borderColor: colors.borderColor }}
    >
      <div
        className={progressBarValueClasses}
        style={{
          width: `${value}%`,
          backgroundColor: colors.barColor
        }}

      >
        <FlexBox center='v-center' style={{ color: colors.textColor }}>
          {children}
        </FlexBox>
      </div>
    </div>
  );
};

export default ProgressBar;
