import React, { useState } from 'react';
import Split from 'react-split';
import { isFunction } from 'libs/checks';
import clx from 'classnames';

const SplitAreaItem = ({ onClick, active, ...props }) => {
  const classNames = clx('split-area-item', { active });

  return <div className={classNames} onClick={onClick} {...props} />;
};


export default ({ onChange, splits }) => {
  const [active, setActive] = useState(1);

  const onDragChange = (sizes) => {
    if (isFunction(onChange)) onChange(sizes, active);
  };

  const updateActive = (active) => () => {
    setActive(active);
  };

  const isTwoSplits = splits === 2;

  if (!isTwoSplits) {
    return isTwoSplits ? (
      <Split
        sizes={[50, 50]}
        minSize={50}
        expandToMin={false}
        gutterSize={10}
        direction='horizontal'
        cursor='col-resize'
        className='split-area-container'
        onDragEnd={onDragChange}
      >
        <SplitAreaItem active={active === 1} onClick={updateActive(1)} />
        <SplitAreaItem active={active === 2} onClick={updateActive(2)} />
      </Split>
    ) : (
      <SplitAreaItem active />
    );
  }
};
